import { useState, useEffect } from 'react';
import { api } from '../lib/api-frontend';
import { MOODS, STATES, MEALS, CATEGORIES, RECIPES } from '../lib/data';

export default function Home() {
  const [user, setUser] = useState(null);
  const [mood, setMood] = useState(null);
  const [state, setState] = useState(null);
  const [meal, setMeal] = useState(null);
  const [customReqs, setCustomReqs] = useState([]);
  const [customInput, setCustomInput] = useState('');
  const [result, setResult] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authUser, setAuthUser] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [authErr, setAuthErr] = useState('');
  const [showSurvey, setShowSurvey] = useState(false);
  const [dislikes, setDislikes] = useState([]);
  const [surveyInput, setSurveyInput] = useState('');
  const [surveyReqs, setSurveyReqs] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminUsers, setAdminUsers] = useState({});
  const [detailUser, setDetailUser] = useState(null);

  // Auto-restore session
  useEffect(() => {
    const s = localStorage.getItem('eo_session');
    if (s) {
      try {
        const { u, p } = JSON.parse(s);
        api.login(u, p).then(r => { if (r.ok) setUser(r.user); });
      } catch {}
    }
  }, []);

  const doLogin = async (e) => {
    e.preventDefault();
    let r = authMode === 'login' ? await api.login(authUser, authPass) : await api.register(authUser, authPass);
    if (!r.ok) { setAuthErr(r.error); return; }
    localStorage.setItem('eo_session', JSON.stringify({ u: authUser, p: authPass }));
    setUser(r.user);
    setShowAuth(false);
    if (authMode === 'register') setTimeout(() => openSurvey(), 300);
  };

  const openSurvey = async () => {
    if (!user) return;
    const r = await api.getPreference(user.username);
    setDislikes(r.ok ? r.preferences.dislikes : []);
    setSurveyReqs(r.ok ? r.preferences.customReqs : []);
    setShowSurvey(true);
  };

  const saveSurvey = async () => {
    await api.savePreference(user.username, { dislikes, customReqs: surveyReqs });
    setCustomReqs([...surveyReqs]);
    setShowSurvey(false);
    alert('✅ 偏好已保存！推荐时会自动过滤。');
  };

  const openAdmin = async () => {
    const r = await api.getRegistry();
    if (r.ok) setAdminUsers(r.registry);
    setShowAdmin(true);
  };

  const openDetail = async (username) => {
    const r = await api.getUserDetail(username);
    if (r.ok) setDetailUser({ ...r.user, editDislikes: [...r.user.preferences.dislikes], editReqs: [...r.user.preferences.customReqs] });
  };

  const saveDetail = async () => {
    if (!detailUser) return;
    await api.updatePreference(detailUser.username, { dislikes: detailUser.editDislikes, customReqs: detailUser.editReqs });
    alert('✅ 已保存');
    setDetailUser(null);
    openAdmin();
  };

  const doRecommend = async () => {
    if (!mood || !state || !meal) return;
    const rm = MOODS.find(m => m.value === mood)?.mapTo || mood;
    const rs = STATES.find(s => s.value === state)?.mapTo || state;
    let dish = RECIPES[rm]?.[rs]?.[meal];
    if (!dish) return;

    if (user && customReqs.length > 0) {
      await api.savePreference(user.username, { dislikes: (await api.getPreference(user.username)).preferences.dislikes, customReqs });
    }

    let res = null;
    if (user) {
      try {
        const r = await api.getPreference(user.username);
        if (r.ok) {
          const prefs = r.preferences;
          if (prefs.dislikes?.includes(dish.category)) {
            const alts = findAllByMeal(meal).filter(d => !prefs.dislikes.includes(d.category));
            if (alts.length > 0) dish = alts[0];
          }
        }
      } catch {}
    }
    setResult(dish);
  };

  const userLogout = () => { setUser(null); localStorage.removeItem('eo_session'); setResult(null); };

  return (
    <div className="container">
      {/* ====== Header ====== */}
      <header className="topbar">
        <h1 className="logo">🍽️ 今天吃什么？</h1>
        {!user ? (
          <div className="user-area">
            <button className="btn-ghost" onClick={() => { setShowAuth(true); setAuthMode('login'); }}>登录</button>
            <button className="btn-primary-sm" onClick={() => { setShowAuth(true); setAuthMode('register'); }}>注册</button>
          </div>
        ) : (
          <div className="user-area logged-in">
            <span className="user-greeting">👋 {user.username}</span>
            <button className="btn-ghost" onClick={openSurvey}>📋 偏好</button>
            {user.isAdmin && <button className="btn-ghost" onClick={openAdmin}>⚙️ 管理</button>}
            <button className="btn-ghost" onClick={userLogout}>退出</button>
          </div>
        )}
      </header>

      {/* ====== Selectors ====== */}
      <main>
        <section className="selectors">
          <SelectorCard label="😊 心情" items={MOODS} selected={mood} onSelect={setMood} />
          <SelectorCard label="⏰ 状态" items={STATES} selected={state} onSelect={setState} />
          <SelectorCard label="🍳 餐别" items={MEALS} selected={meal} onSelect={setMeal} />
        </section>

        {/* Custom Request */}
        <section className="custom-request">
          <label htmlFor="customInput">✏️ 有什么要求？（选填）</label>
          <div className="request-row">
            <input id="customInput" value={customInput} onChange={e => setCustomInput(e.target.value)} placeholder="例如：嗓子疼不能吃辣的..." maxLength={100} />
            <button className="btn-secondary" onClick={() => { if (customInput && customReqs.length < 5) { setCustomReqs([...customReqs, customInput]); setCustomInput(''); } }}>应用</button>
          </div>
          <div className="active-requests">
            {customReqs.map((r, i) => <span key={i} className="req-tag">{r} <button className="req-del" onClick={() => setCustomReqs(customReqs.filter((_, j) => j !== i))}>×</button></span>)}
          </div>
        </section>

        {/* Recommend Button */}
        <button className={'btn-primary' + (!mood || !state || !meal ? '' : '')} disabled={!mood || !state || !meal} onClick={doRecommend}>
          {mood && state && meal ? '✨ 今天吃什么？' : '👆 请选择心情、状态和餐别'}
        </button>

        {/* Result */}
        {result && (
          <section className="result-area" style={{ animation: 'none' }} ref={el => el && (el.style.animation = 'fadeInUp 0.4s ease')}>
            <div className="result-card">
              <div className="result-emoji">{result.emoji}</div>
              <h2>{result.title}</h2>
              <p id="resultDesc">{result.desc}</p>
              <div className="result-tags">{result.tags.map((t, i) => <span key={i}>{t}</span>)}</div>
              <div className="result-badges">
                {result.calories && <span className="badge badge-cal">🔥 {result.calories}</span>}
                {result.category && <span className="badge">📂 {result.category}</span>}
                {result.attrs?.filter(a => a.startsWith('味:')).map((a, i) => <span key={i} className="badge badge-flavor">{['', '🥬', '🌶️', '🍋', '🧀', '🍯'][parseInt(a.charAt(3))] || '🍴'} {a.slice(2)}</span>)}
              </div>
            </div>
            <div className="result-actions">
              <button className="btn-secondary" onClick={doRecommend}>🔄 换一个</button>
              {user?.aiAccess && <button className="btn-ai" onClick={() => alert('🤖 AI 功能未配置')}>🤖 AI 推荐</button>}
            </div>
          </section>
        )}
      </main>

      <footer><p>✨ 吃好每一餐</p></footer>

      {/* ====== Auth Modal ====== */}
      {showAuth && (
        <Modal onClose={() => setShowAuth(false)}>
          <h2>{authMode === 'login' ? '登录' : '注册'}</h2>
          <div className="auth-tabs">
            <button className={'auth-tab' + (authMode === 'login' ? ' active' : '')} onClick={() => setAuthMode('login')}>登录</button>
            <button className={'auth-tab' + (authMode === 'register' ? ' active' : '')} onClick={() => setAuthMode('register')}>注册</button>
          </div>
          <form onSubmit={doLogin}>
            <div className="field"><label>用户名</label><input value={authUser} onChange={e => setAuthUser(e.target.value)} maxLength={20} required /></div>
            <div className="field"><label>密码</label><input type="password" value={authPass} onChange={e => setAuthPass(e.target.value)} maxLength={30} required /></div>
            {authErr && <p className="form-error">{authErr}</p>}
            <button type="submit" className="btn-primary">{authMode === 'login' ? '登录' : '注册'}</button>
          </form>
        </Modal>
      )}

      {/* ====== Survey Modal ====== */}
      {showSurvey && (
        <Modal onClose={() => setShowSurvey(false)} wide>
          <h2>📋 偏好设置</h2>
          <p className="modal-sub">勾选你不吃的类别，以后会自动过滤</p>
          <div className="survey-categories">
            {CATEGORIES.map(cat => (
              <label key={cat} className={'survey-item' + (dislikes.includes(cat) ? ' checked' : '')}>
                <input type="checkbox" checked={dislikes.includes(cat)} onChange={e => setDislikes(e.target.checked ? [...dislikes, cat] : dislikes.filter(d => d !== cat))} />
                {' ' + cat}
              </label>
            ))}
          </div>
          <h3 style={{ marginTop: 20 }}>✏️ 自定义要求</h3>
          <div className="survey-custom-list">{surveyReqs.map((r, i) => <span key={i} className="req-tag">{r} <button className="req-del" onClick={() => setSurveyReqs(surveyReqs.filter((_, j) => j !== i))}>×</button></span>)}</div>
          <div className="survey-custom-add">
            <input value={surveyInput} onChange={e => setSurveyInput(e.target.value)} placeholder="例如：在减肥、胃不好..." maxLength={50} />
            <button className="btn-secondary" onClick={() => { if (surveyInput) { setSurveyReqs([...surveyReqs, surveyInput]); setSurveyInput(''); } }}>添加</button>
          </div>
          <button className="btn-primary" style={{ marginTop: 20 }} onClick={saveSurvey}>✅ 保存偏好</button>
        </Modal>
      )}

      {/* ====== Admin Modal ====== */}
      {showAdmin && (
        <Modal onClose={() => setShowAdmin(false)} wide>
          <h2>⚙️ 管理后台</h2>
          <p className="modal-sub">点击用户查看详情</p>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>用户名</th><th>AI 权限</th></tr></thead>
              <tbody>
                {Object.entries(adminUsers).map(([uname, info]) => (
                  <tr key={uname} style={{ cursor: 'pointer' }} onClick={() => openDetail(uname)}>
                    <td>{uname}</td>
                    <td>
                      <label className="toggle" onClick={e => e.stopPropagation()}>
                        <input type="checkbox" checked={info.aiAccess} onChange={async () => { const r = await api.toggleAi(uname); if (r.ok) setAdminUsers(prev => ({ ...prev, [uname]: { ...prev[uname], aiAccess: r.aiAccess } })); }} />
                        <span className="toggle-slider"></span>
                      </label>
                      <span className="toggle-label">{info.aiAccess ? '✅ 已开通' : '❌ 未开通'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}

      {/* ====== User Detail Modal ====== */}
      {detailUser && (
        <Modal onClose={() => setDetailUser(null)} wide>
          <h2>👤 {detailUser.username}</h2>
          <p className="modal-sub">注册于 {new Date(detailUser.createdAt).toLocaleString()}</p>
          <h3 style={{ marginTop: 16 }}>📋 不吃的类别</h3>
          <div className="survey-categories">
            {CATEGORIES.map(cat => (
              <label key={cat} className="survey-item">
                <input type="checkbox" checked={detailUser.editDislikes.includes(cat)} onChange={e => setDetailUser({ ...detailUser, editDislikes: e.target.checked ? [...detailUser.editDislikes, cat] : detailUser.editDislikes.filter(d => d !== cat) })} />
                {' ' + cat}
              </label>
            ))}
          </div>
          <h3 style={{ marginTop: 16 }}>✏️ 自定义要求</h3>
          <div className="survey-custom-list">{detailUser.editReqs.map((r, i) => <span key={i} className="req-tag">{r} <button className="req-del" onClick={() => setDetailUser({ ...detailUser, editReqs: detailUser.editReqs.filter((_, j) => j !== i) })}>×</button></span>)}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            <button className="btn-primary" style={{ flex: 1 }} onClick={saveDetail}>💾 保存修改</button>
            <button className="btn-secondary" onClick={() => setDetailUser(null)}>关闭</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ========== Sub Components ==========
function SelectorCard({ label, items, selected, onSelect }) {
  return (
    <div className="selector-card">
      <label>{label}</label>
      <div className="options">
        {items.map(item => (
          <button key={item.value} className={'opt-btn' + (selected === item.value ? ' selected' : '')} onClick={() => onSelect(item.value)}>{item.label}</button>
        ))}
      </div>
    </div>
  );
}

function Modal({ children, onClose, wide }) {
  return (
    <div className="modal-overlay" onClick={e => { if (e.target.className === 'modal-overlay') onClose(); }}>
      <div className={'modal' + (wide ? ' modal-lg' : '')}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

function findAllByMeal(meal) {
  const results = [];
  for (const sm of Object.keys(RECIPES)) {
    for (const ss of Object.keys(RECIPES[sm])) {
      if (RECIPES[sm]?.[ss]?.[meal]) results.push(RECIPES[sm][ss][meal]);
    }
  }
  return results;
}
