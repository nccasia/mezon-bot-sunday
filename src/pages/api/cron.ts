import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await prisma.aIToken.updateMany({
      data: {
        expiresAt: null,
      },
    });
    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Đảm bảo chỉ Vercel cron mới có thể gọi API này
export const config = {
  api: {
    bodyParser: false,
  },
};
