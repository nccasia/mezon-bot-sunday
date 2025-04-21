import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import moment from 'moment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const currentMonth = moment().format('YYYY-MM-01');
    let salaryDate = await prisma.salary.findFirst({
      where: {
        applyMonth: currentMonth,
      },
    });

    if (!salaryDate) {
      const nextMonth = moment().add(1, 'month').format('YYYY-MM-01');
      salaryDate = await prisma.salary.findFirst({
        where: {
          applyMonth: nextMonth,
        },
      });
    }

    if (!salaryDate) {
      return res.status(404).json({ error: 'No upcoming salary date found' });
    }

    return res.status(200).json(salaryDate);
  } catch (error) {
    console.error('Error fetching salary date:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
