export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { text, sl, tl } = req.body;
  if (!text || !sl || !tl) return res.status(400).json({ error: 'Parametrlar yetishmayapti' });

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    const result = data[0].map(i => i[0]).join('');
    res.status(200).json({ result });
  } catch (e) {
    res.status(500).json({ error: 'Tarjima xatosi' });
  }
}
