import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

// Admin key should match the one in sdconfig.ts
const AdminKey = 'MySun001';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { adminKey } = req.body;

  if (adminKey !== AdminKey) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const commands = await prisma.customCommand.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    return res.status(200).json(commands);
  } catch (error) {
    console.error('Error fetching commands:', error);
    return res.status(500).json({ error: 'Failed to fetch commands' });
  }
}