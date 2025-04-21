import type { NextApiRequest, NextApiResponse } from 'next';

const messages: string[] = [
  '🐺 Tao thề thằng đó là sói! Nhìn cái mặt nó là biết, lúc nào cũng đói!',
  '🎭 Treo nó đi! Nó là sói đấy! Tin tao đi, tao nhìn người chuẩn lắm!',
  '🔮 Nó là sói đấy! Tao còn thấy nó luyện tập tiếng hú ban đêm!',
  '🎯 Sói nó đấy! Nhìn cái kiểu nó ăn cơm là biết, toàn để thừa cơm chỉ ăn thịt!',
  '🎪 Tao bắt quả tang nó đang google "Làm sao để giả vờ không phải là sói"!',
  '🌙 Nó là sói! Tao thấy nó còn join group "Hội Những Con Sói Thèm Ăn"!',
  '🎭 Nó là sói đấy! Tối qua tao còn thấy nó "ăn thịt" người yêu nó!',
  '🌙 Chắc chắn nó là sói rồi! Tối qua còn thấy nó "xơi tái" crush nó trong rừng!',
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return res.status(200).json(randomMessage);
}
