import type { VercelRequest, VercelResponse } from '@vercel/node';
import process from 'node:process';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name = 'World' } = req.query;
  
  return res.json({
    request: JSON.parse(JSON.stringify(req, getCircularReplacer())),
    version: {
      ...process.version
    }
  });
}

function getCircularReplacer() {
  const seen = new WeakSet();
  
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}
