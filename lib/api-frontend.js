// 前端 API 调用
async function post(url, data) {
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  return r.json();
}
async function put(url, data) {
  const r = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  return r.json();
}
async function get(url) { const r = await fetch(url); return r.json(); }

export const api = {
  register: (u, p) => post('/api/register', { username: u, password: p }),
  login: (u, p) => post('/api/login', { username: u, password: p }),
  getPreference: (u) => get('/api/preference?username=' + u),
  savePreference: (u, prefs) => put('/api/preference', { username: u, preferences: prefs }),
  getRegistry: () => get('/api/admin?action=registry'),
  toggleAi: (u) => post('/api/admin?action=toggle-ai', { username: u }),
  getUserDetail: (u) => get('/api/admin?action=user-detail&username=' + u),
  updatePreference: (u, prefs) => put('/api/admin?action=update-preference', { username: u, preferences: prefs }),
};
