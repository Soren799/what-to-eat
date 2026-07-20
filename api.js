// ============================================
// 🍽️ API 层 — 调后端 Functions
// ============================================

const API_BASE = '/api';

async function apiPost(action, data) {
  const res = await fetch(API_BASE + '?action=' + action, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function apiPut(action, data) {
  const res = await fetch(API_BASE + '?action=' + action, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function apiGet(action, params) {
  const qs = params ? '&' + new URLSearchParams(params).toString() : '';
  const res = await fetch(API_BASE + '?action=' + action + qs);
  return res.json();
}

// ======== Auth ========
async function apiRegister(username, password) {
  return apiPost('register', { username, password });
}

async function apiLogin(username, password) {
  return apiPost('login', { username, password });
}

// ======== Preference ========
async function apiGetPreference(username) {
  return apiGet('preference', { username });
}

async function apiSavePreference(username, preferences) {
  return apiPut('preference', { username, preferences });
}

// ======== Admin ========
async function apiGetRegistry() {
  return apiGet('admin/registry');
}

async function apiToggleAiAccess(username) {
  return apiPost('admin/toggle-ai', { username });
}

async function apiGetUserDetail(username) {
  return apiGet('admin/user-detail', { username });
}

async function apiAdminUpdatePreference(username, preferences) {
  return apiPut('admin/update-preference', { username, preferences });
}

// ======== AI 推荐（占位）=======
async function apiAiRecommend(mood, state, meal, username) {
  await new Promise(r => setTimeout(r, 500));
  return { ok: false, error: '🤖 AI 功能尚未配置，请联系管理员开通', aiReady: false };
}
