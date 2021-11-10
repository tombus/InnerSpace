import { Result } from '@/mongoose/models';

async function postResults(req, res) {
  const data = await Result.create(req.body);
  res.status(200).json({ result: data });
}
export default async function (req, res) {
  switch (req.method) {
    case 'POST':
      return await postResults(req, res);
    default:
      res.status(400).json({ error: 'unsupported_method' });
  }
}

