import type { VercelRequest, VercelResponse } from '@vercel/node';
import process from 'node:process';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name = 'World' } = req.query;
  
  return res.json({
    request: clone(req),
    runtime: clone(process.version)
  });
}

function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj, getCircularReplacer()));
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
