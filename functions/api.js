// ============================================
// 🍽️ 后端 API — EdgeOne Pages Functions
// 数据存在 GitHub Gist
// ============================================

const REGISTRY_GIST = '8165c64a606470ea609f56aaf010ac5c';
const GIST_FILE = 'data.json';

function getToken(env) {
  return env.GITHUB_TOKEN;
}

function ghHeaders(token) {
  return {
    'Authorization': 'token ' + token,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'edgeone-pages',
  };
}

async function ghGet(url, token) {
  const res = await fetch(url, { headers: ghHeaders(token) });
  return res.json();
}

async function ghGistGet(gistId, token) {
  const data = await ghGet('https://api.github.com/gists/' + gistId, token);
  if (!data.files) throw new Error('Gist not found');
  const file = data.files[Object.keys(data.files)[0]];
  return { content: JSON.parse(file.content), updatedAt: file.updated_at };
}

async function ghGistUpdate(gistId, content, token) {
  const body = JSON.stringify({
    files: { 'registry.json': { content: JSON.stringify(content) } }
  });
  const res = await fetch('https://api.github.com/gists/' + gistId, {
    method: 'PATCH',
    headers: Object.assign(ghHeaders(token), { 'Content-Type': 'application/json' }),
    body,
  });
  const data = await res.json();
  if (data.message) throw new Error(data.message);
  return data;
}

async function ghUserGistUpdate(gistId, content, token) {
  const body = JSON.stringify({
    files: { 'data.json': { content: JSON.stringify(content) } }
  });
  const res = await fetch('https://api.github.com/gists/' + gistId, {
    method: 'PATCH',
    headers: Object.assign(ghHeaders(token), { 'Content-Type': 'application/json' }),
    body,
  });
  const data = await res.json();
  if (data.message) throw new Error(data.message);
  return data;
}

async function createUserGist(username, userData, token) {
  const body = JSON.stringify({
    description: 'User: ' + username,
    public: false,
    files: { 'data.json': { content: JSON.stringify(userData) } }
  });
  const res = await fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: Object.assign(ghHeaders(token), { 'Content-Type': 'application/json' }),
    body,
  });
  const data = await res.json();
  if (data.message) throw new Error(data.message);
  return data.id;
}

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

function errorResponse(msg, status) {
  return jsonResponse({ ok: false, error: msg }, status || 400);
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const action = url.searchParams.get('action');
  const method = request.method;

  let token;
  try { token = getToken(env); } catch (e) { return errorResponse('Server config error: missing GITHUB_TOKEN', 500); }

  try {
    // ======== 注册 ========
    if (action === 'register' && method === 'POST') {
      const { username, password } = await request.json();
      if (!username || !password) return errorResponse('请填写用户名和密码');

      const registry = await ghGistGet(REGISTRY_GIST, token);
      if (registry.content[username]) return errorResponse('用户名已存在');

      const isFirst = Object.keys(registry.content).length === 0;
      const hash = btoa(password); // 模拟哈希

      const userData = {
        username,
        passwordHash: hash,
        aiAccess: isFirst,
        isAdmin: isFirst,
        createdAt: new Date().toISOString(),
        preferences: { dislikes: [], customReqs: [] },
      };

      const gistId = await createUserGist(username, userData, token);

      registry.content[username] = { gistId, aiAccess: isFirst };
      await ghGistUpdate(REGISTRY_GIST, registry.content, token);

      return jsonResponse({
        ok: true,
        user: { username, aiAccess: isFirst, isAdmin: isFirst },
      });
    }

    // ======== 登录 ========
    if (action === 'login' && method === 'POST') {
      const { username, password } = await request.json();
      if (!username || !password) return errorResponse('请填写用户名和密码');

      const registry = await ghGistGet(REGISTRY_GIST, token);
      const entry = registry.content[username];
      if (!entry) return errorResponse('用户不存在');

      const userGist = await ghGistGet(entry.gistId, token);
      const userData = userGist.content;

      if (userData.passwordHash !== btoa(password)) return errorResponse('密码错误');

      return jsonResponse({
        ok: true,
        user: { username, aiAccess: userData.aiAccess, isAdmin: userData.isAdmin || false },
      });
    }

    // ======== 读偏好 ========
    if (action === 'preference' && method === 'GET') {
      const username = url.searchParams.get('username');
      if (!username) return errorResponse('缺少 username');

      const registry = await ghGistGet(REGISTRY_GIST, token);
      const entry = registry.content[username];
      if (!entry) return errorResponse('用户不存在');

      const userGist = await ghGistGet(entry.gistId, token);
      return jsonResponse({ ok: true, preferences: userGist.content.preferences });
    }

    // ======== 保存偏好 ========
    if (action === 'preference' && method === 'PUT') {
      const body = await request.json();
      const { username, preferences } = body;
      if (!username) return errorResponse('缺少 username');

      const registry = await ghGistGet(REGISTRY_GIST, token);
      const entry = registry.content[username];
      if (!entry) return errorResponse('用户不存在');

      const userGist = await ghGistGet(entry.gistId, token);
      userGist.content.preferences = preferences;
      await ghUserGistUpdate(entry.gistId, userGist.content, token);

      return jsonResponse({ ok: true });
    }

    // ======== 管理员：获取注册表 ========
    if (action === 'admin/registry' && method === 'GET') {
      const registry = await ghGistGet(REGISTRY_GIST, token);
      return jsonResponse({ ok: true, registry: registry.content });
    }

    // ======== 管理员：开关 AI 权限 ========
    if (action === 'admin/toggle-ai' && method === 'POST') {
      const { username } = await request.json();
      if (!username) return errorResponse('缺少 username');

      const registry = await ghGistGet(REGISTRY_GIST, token);
      const entry = registry.content[username];
      if (!entry) return errorResponse('用户不存在');

      const userGist = await ghGistGet(entry.gistId, token);
      const newVal = !userGist.content.aiAccess;
      userGist.content.aiAccess = newVal;
      await ghUserGistUpdate(entry.gistId, userGist.content, token);

      registry.content[username].aiAccess = newVal;
      await ghGistUpdate(REGISTRY_GIST, registry.content, token);

      return jsonResponse({ ok: true, aiAccess: newVal });
    }

    // ======== 管理员：获取用户详情 ========
    if (action === 'admin/user-detail' && method === 'GET') {
      const username = url.searchParams.get('username');
      if (!username) return errorResponse('缺少 username');

      const registry = await ghGistGet(REGISTRY_GIST, token);
      const entry = registry.content[username];
      if (!entry) return errorResponse('用户不存在');

      const userGist = await ghGistGet(entry.gistId, token);
      const u = userGist.content;
      return jsonResponse({
        ok: true,
        user: {
          username: u.username,
          aiAccess: u.aiAccess,
          createdAt: u.createdAt,
          preferences: u.preferences || { dislikes: [], customReqs: [] },
        },
      });
    }

    // ======== 管理员：更新用户偏好 ========
    if (action === 'admin/update-preference' && method === 'PUT') {
      const body = await request.json();
      const { username, preferences } = body;
      if (!username) return errorResponse('缺少 username');

      const registry = await ghGistGet(REGISTRY_GIST, token);
      const entry = registry.content[username];
      if (!entry) return errorResponse('用户不存在');

      const userGist = await ghGistGet(entry.gistId, token);
      userGist.content.preferences = preferences;
      await ghUserGistUpdate(entry.gistId, userGist.content, token);

      return jsonResponse({ ok: true });
    }

    return errorResponse('Not found: ' + action + ' ' + method, 404);
  } catch (e) {
    return errorResponse('Server error: ' + e.message, 500);
  }
}
