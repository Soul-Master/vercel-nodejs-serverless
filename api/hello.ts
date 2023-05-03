import type { VercelRequest, VercelResponse } from '@vercel/node';
import process from 'node:process';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name = 'World' } = req.query;
  return res.json({
    request: {
      ...req,
    },
    env: {
      ...process.env
    }
  })
}
