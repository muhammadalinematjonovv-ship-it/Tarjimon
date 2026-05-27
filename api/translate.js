export default async function handler(req, res) {
  const text = req.query.text || (req.body && req.body.text);
  const sl = req.query.sl || (req.body && req.body.sl) || 'uz';
  const tl = req.query.tl || (req.body && req.body.tl) || 'ru';

  if (!text) return res.status(400).json({ error: 'text kerak' });

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
    const r = await fetch(url);
    const data = await r.json();
    const result = data[0].map(i => i[0]).join('');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ result });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
