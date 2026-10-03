const YU28_KEY = 'yu28_ec49bdec169f73de';
const YU28_HOSTS = ['yu28.top'];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const target = req.query.url;
  if (!target) return res.status(400).json({ error: 'Missing url' });

  try {
    const targetUrl = new URL(target);
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'application/json, text/plain, */*'
    };

    // 自动给 yu28.top 的请求加上 key
    if (YU28_HOSTS.includes(targetUrl.hostname)) {
      headers['X-Api-Key'] = YU28_KEY;
    }

    const resp = await fetch(target, { headers });
    const data = await resp.text();

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.status(resp.status).send(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
