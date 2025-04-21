import type { NextApiRequest, NextApiResponse } from 'next';

const message = [
  '🎯 Chắc chắn là {item} rồi! Không cần nghĩ nhiều!',
  '🎲 {item} đi, sai tao chịu trách nhiệm!',
  '🎪 Thần may mắn phán {item} là chuẩn nhất!',
  '🎭 {item}! Tin tao đi, tao là thần số học mà!',
  '🎨 Chọn {item} đi rồi đổ tại tao!',
  '🎰 {item}! Số này nó về với số kia!',
  '🌟 {item} là số phận đã an bài rồi!',
  '🎪 Tao bói {item} là chuẩn không cần chỉnh!',
  '🎯 {item}! Tao là bot nhưng tao biết mày cần gì!',
  '🎲 {item} là định mệnh rồi, đừng chống cự nữa!',
  '🎭 Chọn {item} đi, tao bảo đảm không hối hận!',
  '🎨 {item}! Tao là bot tiên tri mà!',
  '🎪 {item} là số phận an bài, đừng cưỡng lại nữa!',
  '🌟 Tao phán {item} là chuẩn rồi, tin tao đi!',
  '🎯 {item}! Tao là bot nhưng tao biết nhiều lắm!',
  '🎲 Chọn {item} đi rồi tính tiếp!',
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { itemString } = req.body;
  console.log(itemString);

  if (!itemString) {
    return res.status(400).json({ message: 'Item string is required' });
  }

  const items = itemString.split(/[,;|]/).map((item: string) => item.trim());
  const randomItem = items[Math.floor(Math.random() * items.length)];
  const randomMessage = message[Math.floor(Math.random() * message.length)];
  res.status(200).json(randomMessage.replace('{item}', randomItem));
}
