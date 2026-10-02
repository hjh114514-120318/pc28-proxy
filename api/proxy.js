export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const target = req.query.url;
  if (!target) return res.status(400).json({ error: 'Missing url' });
  
  try {
    const resp = await fetch(target, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await resp.text();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
