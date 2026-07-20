// ============================================
// 🍽️ API 层 — 模拟后端 (localStorage)
// 第二阶段换成真实 GitHub Gist API 时只改这里
// ============================================


const DB = {
  _get(key, def) {
    try { return JSON.parse(localStorage.getItem('eo_' + key)) ?? def; }
    catch { return def; }
  },
  _set(key, val) { localStorage.setItem('eo_' + key, JSON.stringify(val)); },

  getUsers() { return this._get('users', {}); },
  setUsers(u) { this._set('users', u); },

  getUser(name) { return this.getUsers()[name] ?? null; },
  saveUser(name, data) {
    const users = this.getUsers();
    users[name] = data;
    this.setUsers(users);
  },

  getRegistry() { return this._get('registry', {}); },
  setRegistry(r) { this._set('registry', r); },
};

// ---- 模拟异步延迟 ----
const delay = (ms = 200) => new Promise(r => setTimeout(r, ms));

// ======== Auth API ========
async function apiRegister(username, password) {
  await delay();
  const users = DB.getUsers();
  if (users[username]) return { ok: false, error: '用户名已存在' };
  const isFirst = Object.keys(users).length === 0;
  const hash = btoa(password); // 模拟哈希，真实用 bcrypt
  const user = {
    username, passwordHash: hash,
    aiAccess: isFirst,
    isAdmin: isFirst,
    createdAt: new Date().toISOString(),
    preferences: { dislikes: [], customReqs: [] },
  };
  DB.saveUser(username, user);
  // registry
  const reg = DB.getRegistry();
  reg[username] = { aiAccess: user.aiAccess };
  DB.setRegistry(reg);
  return { ok: true, user: { username, aiAccess: user.aiAccess, isAdmin: isFirst } };
}

async function apiLogin(username, password) {
  await delay();
  const user = DB.getUser(username);
  if (!user) return { ok: false, error: '用户不存在' };
  if (user.passwordHash !== btoa(password)) return { ok: false, error: '密码错误' };
  return {
    ok: true,
    user: { username, aiAccess: user.aiAccess, isAdmin: user.isAdmin ?? false },
  };
}

// ======== Preference API ========
async function apiGetPreference(username) {
  await delay();
  const user = DB.getUser(username);
  if (!user) return { ok: false, error: '用户不存在' };
  return { ok: true, preferences: user.preferences };
}

async function apiSavePreference(username, preferences) {
  await delay();
  const user = DB.getUser(username);
  if (!user) return { ok: false, error: '用户不存在' };
  user.preferences = preferences;
  DB.saveUser(username, user);
  return { ok: true };
}

// ======== Admin API ========
async function apiGetRegistry() {
  await delay();
  return { ok: true, registry: DB.getRegistry() };
}

async function apiToggleAiAccess(username) {
  await delay();
  const user = DB.getUser(username);
  if (!user) return { ok: false, error: '用户不存在' };
  user.aiAccess = !user.aiAccess;
  DB.saveUser(username, user);
  const reg = DB.getRegistry();
  reg[username] = { aiAccess: user.aiAccess };
  DB.setRegistry(reg);
  return { ok: true, aiAccess: user.aiAccess };
}

async function apiGetUserDetail(username) {
  await delay();
  const user = DB.getUser(username);
  if (!user) return { ok: false, error: '用户不存在' };
  return {
    ok: true,
    user: {
      username: user.username,
      aiAccess: user.aiAccess,
      createdAt: user.createdAt,
      preferences: user.preferences || { dislikes: [], customReqs: [] },
    },
  };
}

async function apiAdminUpdatePreference(username, preferences) {
  await delay();
  const user = DB.getUser(username);
  if (!user) return { ok: false, error: '用户不存在' };
  user.preferences = preferences;
  DB.saveUser(username, user);
  return { ok: true };
}

// ======== Recommend API ========
// 映射新增的心情/状态到基础数据
function resolveMood(val) {
  const m = MOODS.find(x => x.value === val);
  return m?.mapTo ?? val;
}
function resolveState(val) {
  const s = STATES.find(x => x.value === val);
  return s?.mapTo ?? val;
}

async function apiRecommend(mood, state, meal, username) {
  await delay(100);
  const rm = resolveMood(mood);
  const rs = resolveState(state);
  const dish = RECIPES[rm]?.[rs]?.[meal];
  if (!dish) return { ok: false, error: '没有推荐' };

  let userPrefs = null;
  if (username) {
    const user = DB.getUser(username);
    if (user) userPrefs = user.preferences;
  }

  // 过滤：排除用户不吃的类别
  let filtered = [dish];
  if (userPrefs?.dislikes?.length) {
    const skipCats = userPrefs.dislikes;
    if (skipCats.includes(dish.category)) {
      // 找替代品
      const alternatives = findAllByMoodStateMeal(mood, state, meal);
      filtered = alternatives.filter(d => !skipCats.includes(d.category));
      if (filtered.length === 0) filtered = [dish]; // 全排除了就返回原推荐
    }
  }

  // 自定义规则过滤
  const reqs = userPrefs?.customReqs ?? [];
  const rules = parseCustomRules(reqs);
  if (rules.length > 0) {
    filtered = filtered.filter(d => {
      for (const r of rules) {
        if (r.type === 'exclude' && matchAttr(d, r.attr)) return false;
      }
      return true;
    });
    if (filtered.length === 0) filtered = [dish];
  }

  return { ok: true, dish: filtered[0], filteredOut: filtered.length < 1 };
}

// ======== 工具函数 ========
function findAllByMoodStateMeal(mood, state, meal) {
  const results = [];
  for (const sm of Object.keys(RECIPES)) {
    for (const ss of Object.keys(RECIPES[sm])) {
      if (RECIPES[sm]?.[ss]?.[meal]) {
        results.push(RECIPES[sm][ss][meal]);
      }
    }
  }
  return results;
}

const RULE_MAP = [
  { keywords: ['减肥','减脂','瘦身','低卡'], type:'exclude', attr:'热:高' },
  { keywords: ['嗓子疼','上火','口腔溃疡','喉咙痛'], type:'exclude', attr:'味:麻辣' },
  { keywords: ['清淡','没胃口','生病'], type:'exclude', attr:'味:麻辣', excludeAlso:['味:浓郁','味:甜蜜'] },
  { keywords: ['辣的','想吃辣','麻辣','过瘾'], type:'include', attr:'味:麻辣' },
  { keywords: ['甜的','想吃甜','甜品'], type:'include', attr:'味:甜蜜' },
  { keywords: ['养胃','胃不好','胃痛'], type:'exclude', attr:'味:麻辣', excludeAlso:['味:酸甜','烹:炸'] },
  { keywords: ['素食','不吃肉'], type:'exclude', attr:'烹:烤', excludeAlso:['烹:炒'] },
  { keywords: ['增肌','健身','高蛋白'], type:'include', attr:'热:高' },
  { keywords: ['省钱','便宜','简单'], type:'include', attr:'适:快手' },
  { keywords: ['暖胃','天冷','冬天'], type:'include', attr:'适:暖胃' },
  { keywords: ['不饿','吃不下'], type:'exclude', attr:'热:高' },
];

function parseCustomRules(reqs) {
  const rules = [];
  for (const req of reqs) {
    const lower = req.toLowerCase();
    for (const rule of RULE_MAP) {
      if (rule.keywords.some(k => lower.includes(k))) {
        rules.push({ type: rule.type, attr: rule.attr });
        if (rule.excludeAlso) {
          rule.excludeAlso.forEach(a => rules.push({ type: 'exclude', attr: a }));
        }
      }
    }
  }
  return rules;
}

function matchAttr(dish, attr) {
  return dish.attrs?.includes(attr) ?? false;
}

// ======== AI 推荐接口（占位，等 DeepSeek Key）=======
async function apiAiRecommend(mood, state, meal, username) {
  await delay(500);
  return { ok: false, error: '🤖 AI 功能尚未配置，请联系管理员开通', aiReady: false };
}
