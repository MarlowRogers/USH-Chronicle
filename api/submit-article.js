const REPO = 'MarlowRogers/USH-Chronicle';
const API  = `https://api.github.com/repos/${REPO}/contents/new_articles.json`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { article, password } = req.body;

  if (!password || password !== process.env.SUBMIT_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const headers = {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  const getRes = await fetch(API, { headers });
  if (!getRes.ok) return res.status(500).json({ error: 'Could not read new_articles.json' });

  const fileData = await getRes.json();
  const current  = JSON.parse(
    Buffer.from(fileData.content.replace(/\n/g, ''), 'base64').toString('utf8')
  );

  current.unshift(article);

  const putRes = await fetch(API, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: `Add article: ${article.headline.slice(0, 60)}`,
      content: Buffer.from(JSON.stringify(current, null, 2) + '\n').toString('base64'),
      sha: fileData.sha,
    }),
  });

  if (!putRes.ok) {
    const err = await putRes.json();
    return res.status(500).json({ error: err.message || 'GitHub API error' });
  }

  return res.status(200).json({ ok: true });
}
