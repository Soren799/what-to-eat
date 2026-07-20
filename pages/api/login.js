import { getToken, getRegistry, ghGetGist } from '../../lib/gist';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ ok: false, error: '请填写用户名和密码' });

    const token = getToken();
    const registry = await getRegistry(token);
    const entry = registry.content[username];
    if (!entry) return res.status(400).json({ ok: false, error: '用户不存在' });

    const userGist = await ghGetGist(entry.gistId, token);
    const userData = userGist.content;

    if (userData.passwordHash !== Buffer.from(password).toString('base64'))
      return res.status(400).json({ ok: false, error: '密码错误' });

    return res.status(200).json({
      ok: true,
      user: { username, aiAccess: userData.aiAccess, isAdmin: userData.isAdmin || false },
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}
