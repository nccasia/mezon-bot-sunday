import type { NextApiRequest, NextApiResponse } from 'next';

const messages: string[] = [
  '🐺 Em là dân làng mà! Tin em đi, em còn không biết cắn người là gì!',
  '🌙 Thề với trời đất, em là dân thường 100% không pha tạp!',
  '🎭 Em mà là sói thì trời đánh em chết! Em là dân làng chân chính!',
  '🌟 Các bạn nhìn mặt em hiền lành thế này mà bảo em là sói sao?',
  '🎪 Em là tiên tri mà! Không tin thì thôi nhưng đừng treo em!',
  '🔮 Em là bảo vệ đấy! Đêm qua em còn bảo vệ người kia mà!',
  '🎯 Em là cupid, em chỉ biết làm công việc mai mối thôi!',
  '🎲 Em là thợ săn, nếu em là sói thì em đã cắn hết cả làng rồi!',
  '🎭 Em là phù thủy, thuốc cứu người em còn chưa dùng đây này!',
  '🌙 Em mà là sói thì em ăn thịt người từ lâu rồi, làm gì còn đợi đến giờ!',
  '🐑 Em là cừu non ngây thơ, làm sao có thể là sói được!',
  '🎪 Các bạn đừng treo em, em là dân làng thật mà! Thề luôn!',
  '🌟 Em là người tốt mà! Sói nó còn phải gọi em bằng cụ ấy!',
  '🎭 Em là dân làng, không tin cứ treo em đi rồi biết!',
  '🔮 Em mà là sói thì em đã không ngồi đây biện minh với các bạn rồi!',
  '🎪 Em thề với cả làng, em mà là sói thì em ế cả đời!',
  '🌙 Em là dân làng đó! Em còn đang F.A làm gì có bạn sói nào chơi với em!',
  '🎭 Trông em có giống sói không? Em còn không dám ăn thịt bò tái!',
  '🐺 Em mà là sói á? Em còn sợ chó hàng xóm nhà em ấy!',
  '🎲 Em thề với tình yêu của em dành cho crush, em không phải sói!',
  '🌟 Em là dân làng! Mà nếu em là sói thì chắc là sói... đẹp trai nhất làng!',
  '🎪 Em không phải sói đâu! Em chỉ là một con người đang cố gắng sống tốt thôi... mà khoan, sói cũng đang cố sống tốt nhỉ?',
  '🔮 Em là dân làng! Mà nếu em là sói thì cũng là sói... nghèo nhất làng, không có tiền mua thịt!',
  '🎭 Em thề với đống bill chưa trả của em, em không phải sói!',
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return res.status(200).json(randomMessage);
}
