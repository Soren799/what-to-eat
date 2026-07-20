import { getToken, getRegistry, ghGetGist, ghUpdateUserGist } from '../../lib/gist';

export default async function handler(req, res) {
  const token = getToken();
  try {
    const { username, preferences } = req.body;

    // GET
    if (req.method === 'GET') {
      const qs = req.url.split('?')[1] || '';
      const params = new URLSearchParams(qs);
      const uname = params.get('username');
      if (!uname) return res.status(400).json({ ok: false, error: '缺少 username' });

      const registry = await getRegistry(token);
      const entry = registry.content[uname];
      if (!entry) return res.status(400).json({ ok: false, error: '用户不存在' });

      const userGist = await ghGetGist(entry.gistId, token);
      return res.status(200).json({ ok: true, preferences: userGist.content.preferences });
    }

    // PUT
    if (req.method === 'PUT') {
      if (!username) return res.status(400).json({ ok: false, error: '缺少 username' });

      const registry = await getRegistry(token);
      const entry = registry.content[username];
      if (!entry) return res.status(400).json({ ok: false, error: '用户不存在' });

      const userGist = await ghGetGist(entry.gistId, token);
      userGist.content.preferences = preferences;
      await ghUpdateUserGist(entry.gistId, userGist.content, token);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}
