// GitHub Gist 存储工具
const REGISTRY_GIST = '8165c64a606470ea609f56aaf010ac5c';

export function getToken() {
  return process.env.GITHUB_TOKEN;
}

function ghHeaders(token) {
  return {
    Authorization: 'token ' + token,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'what-to-eat',
  };
}

export async function ghGet(url, token) {
  const res = await fetch(url, { headers: ghHeaders(token) });
  return res.json();
}

export async function ghGetGist(gistId, token) {
  const data = await ghGet('https://api.github.com/gists/' + gistId, token);
  if (!data.files) throw new Error('Gist not found');
  const file = data.files[Object.keys(data.files)[0]];
  return { content: JSON.parse(file.content), updatedAt: file.updated_at };
}

export async function ghUpdateUserGist(gistId, content, token) {
  const body = JSON.stringify({
    files: { 'data.json': { content: JSON.stringify(content) } },
  });
  const res = await fetch('https://api.github.com/gists/' + gistId, {
    method: 'PATCH',
    headers: { ...ghHeaders(token), 'Content-Type': 'application/json' },
    body,
  });
  return res.json();
}

export async function ghCreateGist(filename, content, token) {
  const body = JSON.stringify({
    description: 'User data',
    public: false,
    files: { [filename]: { content: JSON.stringify(content) } },
  });
  const res = await fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: { ...ghHeaders(token), 'Content-Type': 'application/json' },
    body,
  });
  const data = await res.json();
  if (data.message) throw new Error(data.message);
  return data.id;
}

export async function getRegistry(token) {
  return await ghGetGist(REGISTRY_GIST, token);
}

export async function updateRegistry(content, token) {
  return await ghUpdateUserGist(REGISTRY_GIST, content, token);
}

export { REGISTRY_GIST };
