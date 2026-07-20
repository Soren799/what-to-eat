import { getToken, getRegistry, updateRegistry, ghCreateGist } from '../../lib/gist';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ ok: false, error: '请填写用户名和密码' });

    const token = getToken();
    const registry = await getRegistry(token);
    if (registry.content[username]) return res.status(400).json({ ok: false, error: '用户名已存在' });

    const isFirst = Object.keys(registry.content).length === 0;
    const hash = Buffer.from(password).toString('base64');

    const userData = {
      username,
      passwordHash: hash,
      aiAccess: isFirst,
      isAdmin: isFirst,
      createdAt: new Date().toISOString(),
      preferences: { dislikes: [], customReqs: [] },
    };

    const gistId = await ghCreateGist('data.json', userData, token);
    registry.content[username] = { gistId, aiAccess: isFirst };
    await updateRegistry(registry.content, token);

    return res.status(200).json({ ok: true, user: { username, aiAccess: isFirst, isAdmin: isFirst } });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}
