import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { max = '6' } = req.body;
  const maxNumber = Number(max);

  if (isNaN(maxNumber) || maxNumber < 1) {
    return res.status(400).json({ error: 'Invalid number' });
  }

  const result = Math.floor(Math.random() * maxNumber) + 1;

  const messages = [
    `🎲 Con số may mắn của bạn là: ${result}`,
    `🎯 Kết quả roll của bạn: ${result}`,
    `🎪 Xúc xắc đã chọn số: ${result}`,
    `🎨 Số của bạn là: ${result}`,
    `🎭 May mắn đã chọn số: ${result}`,
    `🎰 Số ${result} này chắc trúng số đấy, mua vé đi!`,
    `🎲 ${result}! Số này đẹp đấy, làm tí lô đê!`,
    `🎯 Ối giời ơi! ${result} là số tuổi người yêu tương lai của bạn đấy!`,
    `🎪 ${result}! Số này mà đánh đề thì giàu to rồi!`,
    `🎨 Số ${result} này là số người yêu cũ của crush đấy!`,
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return res.status(200).json(randomMessage);
}
