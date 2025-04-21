import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { aiTalk } from './sunday';
import moment from 'moment';
import { countDown } from '@/utils/utils';
import { timer, START_COMMAND } from '@/utils/timeHelper';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { command } = req.body;

  if (!command) {
    return res.status(200).json('Không tìm thấy lệnh này');
  }

  const commandInfo = await prisma.customCommand.findFirst({
    where: { command },
  });

  if (!commandInfo) {
    return res.status(200).json('Không tìm thấy lệnh này');
  }

  if (commandInfo.response.startsWith('p-')) {
    const text = commandInfo.response
      .slice(2)
      .replace(/{{now_([+-])(\d{2})(\d{2})}}/g, (_, sign, hours, minutes) => {
        const offset = `${sign}${hours}${minutes}`;
        return moment().utcOffset(offset).format('DD/MM/YYYY HH:mm:ss');
      })
      .replace('{{now_utc}}', moment.utc().format('DD/MM/YYYY HH:mm:ss'));
    return res.status(200).json(await aiTalk(text));
  }
  console.log(commandInfo.response);
  if (commandInfo.response.startsWith('countdown-time-')) {
    console.log(commandInfo.response);
    const response = countDown(
      commandInfo.response.replace('countdown-time-', '')
    );
    return res.status(200).json(response);
  }
  if (commandInfo.response.startsWith(START_COMMAND)) {
    const response = timer(
      commandInfo.response.replace(START_COMMAND, '')
    );
    return res.status(200).json(response);
  }

  return res.status(200).json(commandInfo.response);
}
