import type { NextApiRequest, NextApiResponse } from 'next';
import { foods } from './hnag';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const randomFood = foods[Math.floor(Math.random() * foods.length)];
  return res.status(200).json(randomFood.name);
}
