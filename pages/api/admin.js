import { getToken, getRegistry, getRegistry as getReg, updateRegistry, ghGetGist, ghUpdateUserGist } from '../../lib/gist';

export default async function handler(req, res) {
  const token = getToken();
  try {
    const action = req.query.action || req.body.action;

    // GET: registry
    if (req.method === 'GET' && action === 'registry') {
      const registry = await getReg(token);
      return res.status(200).json({ ok: true, registry: registry.content });
    }

    // GET: user-detail
    if (req.method === 'GET' && action === 'user-detail') {
      const uname = req.query.username;
      if (!uname) return res.status(400).json({ ok: false, error: '缺少 username' });

      const registry = await getReg(token);
      const entry = registry.content[uname];
      if (!entry) return res.status(400).json({ ok: false, error: '用户不存在' });

      const userGist = await ghGetGist(entry.gistId, token);
      const u = userGist.content;
      return res.status(200).json({
        ok: true,
        user: {
          username: u.username,
          aiAccess: u.aiAccess,
          createdAt: u.createdAt,
          preferences: u.preferences || { dislikes: [], customReqs: [] },
        },
      });
    }

    // POST: toggle-ai
    if (req.method === 'POST' && action === 'toggle-ai') {
      const { username } = req.body;
      if (!username) return res.status(400).json({ ok: false, error: '缺少 username' });

      const registry = await getReg(token);
      const entry = registry.content[username];
      if (!entry) return res.status(400).json({ ok: false, error: '用户不存在' });

      const userGist = await ghGetGist(entry.gistId, token);
      const newVal = !userGist.content.aiAccess;
      userGist.content.aiAccess = newVal;
      await ghUpdateUserGist(entry.gistId, userGist.content, token);

      registry.content[username].aiAccess = newVal;
      await updateRegistry(registry.content, token);

      return res.status(200).json({ ok: true, aiAccess: newVal });
    }

    // PUT: update-preference
    if (req.method === 'PUT' && action === 'update-preference') {
      const { username, preferences } = req.body;
      if (!username) return res.status(400).json({ ok: false, error: '缺少 username' });

      const registry = await getReg(token);
      const entry = registry.content[username];
      if (!entry) return res.status(400).json({ ok: false, error: '用户不存在' });

      const userGist = await ghGetGist(entry.gistId, token);
      userGist.content.preferences = preferences;
      await ghUpdateUserGist(entry.gistId, userGist.content, token);

      return res.status(200).json({ ok: true });
    }

    return res.status(404).json({ ok: false, error: 'Unknown action' });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}
