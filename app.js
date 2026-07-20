// ============================================
// 🍽️ 今天吃什么？v2 — UI 主逻辑
// ============================================

let currentUser = null; // { username, aiAccess, isAdmin }
let selectedMood = null;
let selectedState = null;
let selectedMeal = null;

// ======== DOM ========
const $ = id => document.getElementById(id);

const moodOpt  = $('moodOptions');
const stateOpt = $('stateOptions');
const mealOpt  = $('mealOptions');
const recommendBtn = $('recommendBtn');
const btnText = $('btnText');
const resultArea = $('resultArea');
const resultEmoji = $('resultEmoji');
const resultTitle = $('resultTitle');
const resultDesc = $('resultDesc');
const resultTags = $('resultTags');
const resultBadges = $('resultBadges');
const reshuffleBtn = $('reshuffleBtn');
const aiBtn = $('aiBtn');
const customInput = $('customInput');
const applyReqBtn = $('applyRequestBtn');
const activeReqs = $('activeRequests');

// 用户
const userArea = $('userArea');
const userLoggedIn = $('userLoggedIn');
const userGreeting = $('userGreeting');
const loginBtn = $('loginBtn');
const registerBtn = $('registerBtn');
const surveyBtn = $('surveyBtn');
const adminBtn = $('adminBtn');
const logoutBtn = $('logoutBtn');

// 弹窗
const authModal = $('authModal');
const authTitle = $('authTitle');
const authForm = $('authForm');
const authUsername = $('authUsername');
const authPassword = $('authPassword');
const authError = $('authError');
const authSubmit = $('authSubmit');
const authTabs = document.querySelectorAll('.auth-tab');
const surveyModal = $('surveyModal');
const surveyCategories = $('surveyCategories');
const surveyCustomList = $('surveyCustomList');
const surveyCustomInput = $('surveyCustomInput');
const surveyCustomAddBtn = $('surveyCustomAddBtn');
const surveySaveBtn = $('surveySaveBtn');
const adminModal = $('adminModal');
const adminUserList = $('adminUserList');

// ======== 初始化选择器 ========
function renderOptions(container, items, onClick) {
  container.innerHTML = '';
  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.dataset.value = item.value;
    btn.textContent = item.label;
    btn.addEventListener('click', () => onClick(item.value, btn));
    container.appendChild(btn);
  });
}

renderOptions(moodOpt, MOODS, (val, btn) => {
  moodOpt.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedMood = val;
  updateBtn();
});
renderOptions(stateOpt, STATES, (val, btn) => {
  stateOpt.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedState = val;
  updateBtn();
});
renderOptions(mealOpt, MEALS, (val, btn) => {
  mealOpt.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedMeal = val;
  updateBtn();
});

function updateBtn() {
  if (selectedMood && selectedState && selectedMeal) {
    recommendBtn.disabled = false;
    btnText.textContent = '✨ 今天吃什么？';
  } else {
    recommendBtn.disabled = true;
    const missing = [];
    if (!selectedMood) missing.push('心情');
    if (!selectedState) missing.push('状态');
    if (!selectedMeal) missing.push('餐别');
    btnText.textContent = `👆 请选择${missing.join('、')}`;
  }
}

// ======== 自定义要求 ========
let activeCustomReqs = [];

applyReqBtn.addEventListener('click', () => {
  const val = customInput.value.trim();
  if (!val) return;
  if (activeCustomReqs.length >= 5) { alert('最多添加 5 条要求'); return; }
  if (activeCustomReqs.includes(val)) { alert('已添加过该要求'); return; }
  activeCustomReqs.push(val);
  customInput.value = '';
  renderActiveReqs();
});

function renderActiveReqs() {
  activeReqs.innerHTML = '';
  activeCustomReqs.forEach((req, i) => {
    const tag = document.createElement('span');
    tag.className = 'req-tag';
    tag.innerHTML = `${req} <button class="req-del" data-i="${i}">&times;</button>`;
    tag.querySelector('.req-del').addEventListener('click', () => {
      activeCustomReqs.splice(i, 1);
      renderActiveReqs();
    });
    activeReqs.appendChild(tag);
  });
}

// ======== 推荐 ========
recommendBtn.addEventListener('click', doRecommend);
reshuffleBtn.addEventListener('click', doRecommend);

async function doRecommend() {
  if (!selectedMood || !selectedState || !selectedMeal) return;

  const username = currentUser?.username;

  // 先存自定义要求到偏好
  if (username && activeCustomReqs.length > 0) {
    const pref = await apiGetPreference(username);
    if (pref.ok) {
      pref.preferences.customReqs = activeCustomReqs;
      await apiSavePreference(username, pref.preferences);
    }
  }

  const res = await apiRecommend(selectedMood, selectedState, selectedMeal, username);
  if (!res.ok) { alert(res.error); return; }
  showResult(res.dish);
}

function showResult(dish) {
  resultEmoji.textContent = dish.emoji;
  resultTitle.textContent = dish.title;
  resultDesc.textContent = dish.desc;

  resultTags.innerHTML = '';
  dish.tags.forEach(t => {
    const span = document.createElement('span');
    span.textContent = t;
    resultTags.appendChild(span);
  });

  resultBadges.innerHTML = '';
  if (dish.calories) {
    const c = document.createElement('span');
    c.className = 'badge badge-cal';
    c.textContent = `🔥 ${dish.calories}`;
    resultBadges.appendChild(c);
  }
  if (dish.category) {
    const b = document.createElement('span');
    b.className = 'badge';
    b.textContent = `📂 ${dish.category}`;
    resultBadges.appendChild(b);
  }
  if (dish.attrs) {
    const flavorMap = { '味:清淡':'🥬','味:麻辣':'🌶️','味:酸甜':'🍋','味:浓郁':'🧀','味:甜蜜':'🍯' };
    dish.attrs.forEach(a => {
      if (a.startsWith('味:')) {
        const icon = flavorMap[a] || '🍴';
        const span = document.createElement('span');
        span.className = 'badge badge-flavor';
        span.textContent = `${icon} ${a.replace('味:', '')}`;
        resultBadges.appendChild(span);
      }
    });
    dish.attrs.forEach(a => {
      if (a.startsWith('热:')) {
        const span = document.createElement('span');
        span.className = 'badge badge-heat';
        span.textContent = a.replace('热:', '') === '高' ? '🔥 高热量' : a.replace('热:', '') === '低' ? '🥗 低热量' : '⚖️ 适中';
        resultBadges.appendChild(span);
      }
    });
  }

  resultArea.classList.remove('hidden');
  resultArea.style.animation = 'none';
  requestAnimationFrame(() => resultArea.style.animation = 'fadeInUp 0.4s ease');

  // AI 按钮
  if (currentUser?.aiAccess) {
    aiBtn.classList.remove('hidden');
    aiBtn.onclick = doAiRecommend;
  } else {
    aiBtn.classList.add('hidden');
  }
}

async function doAiRecommend() {
  aiBtn.disabled = true;
  aiBtn.textContent = '🤖 AI 思考中...';
  const res = await apiAiRecommend(selectedMood, selectedState, selectedMeal, currentUser?.username);
  aiBtn.disabled = false;
  aiBtn.textContent = '🤖 AI 智能推荐';
  if (res.ok === false && res.error) {
    alert(res.error);
    return;
  }
  if (res.dish) showResult(res.dish);
}

// ======== 用户系统 ========
let authMode = 'login';

authTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    authTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    authMode = tab.dataset.tab;
    authTitle.textContent = authMode === 'login' ? '登录' : '注册';
    authSubmit.textContent = authMode === 'login' ? '登录' : '注册';
    authError.classList.add('hidden');
  });
});

loginBtn.addEventListener('click', () => { openAuth('login'); });
registerBtn.addEventListener('click', () => { openAuth('register'); });

function openAuth(mode) {
  authMode = mode;
  authTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === mode));
  authTitle.textContent = mode === 'login' ? '登录' : '注册';
  authSubmit.textContent = mode === 'login' ? '登录' : '注册';
  authUsername.value = '';
  authPassword.value = '';
  authError.classList.add('hidden');
  authModal.classList.remove('hidden');
}

// 关闭弹窗
document.querySelectorAll('.modal-overlay').forEach(el => {
  el.addEventListener('click', e => {
    if (e.target === el) el.classList.add('hidden');
  });
});
document.querySelectorAll('.modal-close').forEach(el => {
  el.addEventListener('click', () => el.closest('.modal-overlay').classList.add('hidden'));
});

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = authUsername.value.trim();
  const password = authPassword.value.trim();
  if (!username || !password) return;

  let res;
  if (authMode === 'login') {
    res = await apiLogin(username, password);
  } else {
    res = await apiRegister(username, password);
  }

  if (!res.ok) {
    authError.textContent = res.error;
    authError.classList.remove('hidden');
    return;
  }

  authModal.classList.add('hidden');
  currentUser = { ...res.user };
  updateUserUI();

  // 首次登录弹出问卷
  if (authMode === 'register') {
    setTimeout(() => openSurvey(), 300);
  }
});

function updateUserUI() {
  if (currentUser) {
    userArea.classList.add('hidden');
    userLoggedIn.classList.remove('hidden');
    userGreeting.textContent = `👋 ${currentUser.username}`;
    if (currentUser.isAdmin) {
      adminBtn.classList.remove('hidden');
    } else {
      adminBtn.classList.add('hidden');
    }
  } else {
    userArea.classList.remove('hidden');
    userLoggedIn.classList.add('hidden');
  }
  // AI 按钮状态更新
  if (currentUser?.aiAccess && !resultArea.classList.contains('hidden')) {
    aiBtn.classList.remove('hidden');
  } else {
    aiBtn.classList.add('hidden');
  }
}

logoutBtn.addEventListener('click', () => {
  currentUser = null;
  updateUserUI();
  resultArea.classList.add('hidden');
});

// ======== 问卷 ========
surveyBtn.addEventListener('click', openSurvey);

async function openSurvey() {
  if (!currentUser) { alert('请先登录'); return; }

  // 加载偏好
  const pref = await apiGetPreference(currentUser.username);
  let dislikes = pref.ok ? pref.preferences.dislikes : [];
  let customReqs = pref.ok ? pref.preferences.customReqs : [];
  activeCustomReqs = [...customReqs];

  // 渲染类别勾选
  surveyCategories.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const label = document.createElement('label');
    label.className = 'survey-item';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = dislikes.includes(cat);
    cb.dataset.cat = cat;
    label.appendChild(cb);
    label.appendChild(document.createTextNode(' ' + cat));
    surveyCategories.appendChild(label);
  });

  // 渲染自定义要求
  renderSurveyCustomReqs(customReqs);

  surveyModal.classList.remove('hidden');
}

function renderSurveyCustomReqs(reqs) {
  surveyCustomList.innerHTML = '';
  reqs.forEach((req, i) => {
    const tag = document.createElement('span');
    tag.className = 'req-tag';
    tag.innerHTML = `${req} <button class="req-del" data-si="${i}">&times;</button>`;
    tag.querySelector('.req-del').addEventListener('click', () => {
      reqs.splice(i, 1);
      renderSurveyCustomReqs(reqs);
    });
    surveyCustomList.appendChild(tag);
  });
}

surveyCustomAddBtn.addEventListener('click', () => {
  const val = surveyCustomInput.value.trim();
  if (!val) return;
  const reqs = getSurveyCustomReqs();
  if (reqs.length >= 10) { alert('最多 10 条'); return; }
  reqs.push(val);
  renderSurveyCustomReqs(reqs);
  surveyCustomInput.value = '';
});

function getSurveyCustomReqs() {
  const tags = surveyCustomList.querySelectorAll('.req-tag');
  return Array.from(tags).map(t => t.textContent.replace('×','').trim());
}

surveySaveBtn.addEventListener('click', async () => {
  const checks = surveyCategories.querySelectorAll('input:checked');
  const dislikes = Array.from(checks).map(c => c.dataset.cat);
  const customReqs = getSurveyCustomReqs();
  activeCustomReqs = [...customReqs];
  renderActiveReqs();

  const res = await apiSavePreference(currentUser.username, { dislikes, customReqs });
  if (res.ok) {
    surveyModal.classList.add('hidden');
    alert('✅ 偏好已保存！推荐时会自动过滤。');
  } else {
    alert('保存失败：' + res.error);
  }
});

// ======== 管理后台 ========
adminBtn.addEventListener('click', openAdmin);

async function openAdmin() {
  if (!currentUser?.isAdmin) { alert('无权限'); return; }
  const res = await apiGetRegistry();
  if (!res.ok) { alert(res.error); return; }

  adminUserList.innerHTML = '';
  for (const [username, info] of Object.entries(res.registry)) {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.innerHTML = `
      <td>${username}</td>
      <td>-</td>
      <td>
        <label class="toggle" onclick="event.stopPropagation()">
          <input type="checkbox" ${info.aiAccess ? 'checked' : ''} data-user="${username}">
          <span class="toggle-slider"></span>
        </label>
        <span class="toggle-label">${info.aiAccess ? '✅ 已开通' : '❌ 未开通'}</span>
      </td>
    `;
    tr.addEventListener('click', () => openUserDetail(username));
    const cb = tr.querySelector('input');
    cb.addEventListener('change', async () => {
      const r = await apiToggleAiAccess(username);
      if (r.ok) {
        tr.querySelector('.toggle-label').textContent = r.aiAccess ? '✅ 已开通' : '❌ 未开通';
      }
    });
    adminUserList.appendChild(tr);
  }
  adminModal.classList.remove('hidden');
}

// ======== 用户详情弹窗 ========
async function openUserDetail(username) {
  const res = await apiGetUserDetail(username);
  if (!res.ok) { alert(res.error); return; }
  const u = res.user;

  // 创建详情弹窗
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal modal-lg">
      <button class="modal-close">&times;</button>
      <h2>👤 ${u.username}</h2>
      <p class="modal-sub">注册于 ${new Date(u.createdAt).toLocaleString()}</p>

      <h3 style="margin-top:16px">🤖 AI 权限</h3>
      <label class="toggle" style="margin:8px 0">
        <input type="checkbox" id="detailAiAccess" ${u.aiAccess ? 'checked' : ''}>
        <span class="toggle-slider"></span>
      </label>
      <span id="detailAiLabel">${u.aiAccess ? '✅ 已开通' : '❌ 未开通'}</span>

      <h3 style="margin-top:16px">📋 不吃的类别</h3>
      <div class="survey-categories" id="detailCategories"></div>

      <h3 style="margin-top:16px">✏️ 自定义要求</h3>
      <div class="survey-custom-list" id="detailCustomReqs"></div>
      <div class="survey-custom-add" style="margin-top:8px">
        <input type="text" id="detailCustomInput" placeholder="添加要求..." maxlength="50">
        <button class="btn-secondary" id="detailCustomAddBtn">添加</button>
      </div>

      <div style="display:flex;gap:8px;margin-top:20px">
        <button class="btn-primary" id="detailSaveBtn" style="flex:1">💾 保存修改</button>
        <button class="btn-secondary" id="detailCloseBtn">关闭</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // 填充类别勾选
  const catContainer = overlay.querySelector('#detailCategories');
  let dislikes = [...(u.preferences.dislikes || [])];
  CATEGORIES.forEach(cat => {
    const label = document.createElement('label');
    label.className = 'survey-item';
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.checked = dislikes.includes(cat);
    cb.dataset.cat = cat;
    label.appendChild(cb);
    label.appendChild(document.createTextNode(' ' + cat));
    catContainer.appendChild(label);
  });

  // 填充自定义要求
  let customReqs = [...(u.preferences.customReqs || [])];
  const reqContainer = overlay.querySelector('#detailCustomReqs');
  function renderDetailReqs() {
    reqContainer.innerHTML = '';
    customReqs.forEach((req, i) => {
      const tag = document.createElement('span');
      tag.className = 'req-tag';
      tag.innerHTML = `${req} <button class="req-del" data-idx="${i}">&times;</button>`;
      tag.querySelector('.req-del').addEventListener('click', () => {
        customReqs.splice(i, 1);
        renderDetailReqs();
      });
      reqContainer.appendChild(tag);
    });
  }
  renderDetailReqs();

  overlay.querySelector('#detailCustomAddBtn').addEventListener('click', () => {
    const val = overlay.querySelector('#detailCustomInput').value.trim();
    if (!val) return;
    if (customReqs.length >= 10) { alert('最多 10 条'); return; }
    customReqs.push(val);
    overlay.querySelector('#detailCustomInput').value = '';
    renderDetailReqs();
  });

  // AI 权限切换
  const aiCb = overlay.querySelector('#detailAiAccess');
  aiCb.addEventListener('change', async () => {
    const r = await apiToggleAiAccess(username);
    if (r.ok) {
      overlay.querySelector('#detailAiLabel').textContent = r.aiAccess ? '✅ 已开通' : '❌ 未开通';
    }
  });

  // 保存
  overlay.querySelector('#detailSaveBtn').addEventListener('click', async () => {
    const checks = overlay.querySelectorAll('#detailCategories input:checked');
    const newDislikes = Array.from(checks).map(c => c.dataset.cat);
    const r = await apiAdminUpdatePreference(username, {
      dislikes: newDislikes,
      customReqs: customReqs,
    });
    if (r.ok) {
      alert('✅ 已保存');
      overlay.remove();
      openAdmin(); // 刷新管理后台
    } else {
      alert('保存失败：' + r.error);
    }
  });

  overlay.querySelector('#detailCloseBtn').addEventListener('click', () => overlay.remove());
  overlay.querySelector('.modal-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

// ======== 自动登录检查 ========
(async function init() {
  const saved = localStorage.getItem('eo_session');
  if (saved) {
    try {
      const s = JSON.parse(saved);
      const res = await apiLogin(s.username, s.password);
      if (res.ok) {
        currentUser = { ...res.user, password: s.password };
        updateUserUI();
      }
    } catch {}
  }
})();

// 登录成功后保存 session
const origLogin = apiLogin;
apiLogin = async (u, p) => {
  const res = await origLogin(u, p);
  if (res.ok) localStorage.setItem('eo_session', JSON.stringify({ username: u, password: p }));
  return res;
};

// 退出时清除
const origLogout = logoutBtn.addEventListener;
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('eo_session');
});
