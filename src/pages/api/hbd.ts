import type { NextApiRequest, NextApiResponse } from 'next';

const messages: string[] = [
  '🎂 Chúc mừng sinh nhật! Tuổi mới vẫn ế như cũ nhé!',
  '🎈 Happy Birthday! Chúc bạn sớm thoát ế, mà thôi chắc không thoát được đâu!',
  '🎉 Sinh nhật vui vẻ! Năm nay lại thêm một tuổi mà vẫn F.A!',
  '🎁 HBD! Chúc bạn sớm có người yêu... trong mơ!',
  '💝 HBD! Chúc bạn sớm thoát kiếp FA... mà thôi cứ quen dần đi!',
  '🎂 Sinh nhật vui vẻ! Tuổi mới vẫn độc thân, vẫn không có gấu!',
  '🎈 HBD! Chúc bạn tuổi mới vẫn xinh đẹp... trong filter!',
  '🎉 Sinh nhật vui vẻ! Tuổi mới vẫn đẹp trai... khi không ai nhìn thấy!',
  '🎊 Chúc mừng sinh nhật! Năm nay lại thêm một tuổi... lướt Tinder!',
  '🎁 HBD! Chúc bạn sớm tìm được nửa kia... trong game!',
  '🌟 Sinh nhật vui vẻ! Tuổi mới vẫn cô đơn nhưng giàu... trong mơ!',
  '🎂 HBD! Chúc bạn sớm có người yêu... à nhầm, sớm có lương!',
  '🌈 HBD! Chúc bạn tuổi mới thăng tiến... trong rank game!',
  '🎮 Sinh nhật vui vẻ! Chúc bạn sớm max level... trong game yêu đương!',
  '💫 HBD! Chúc bạn tuổi mới có nhiều tiền... để nạp game!',
  '🌟 HBD! Chúc bạn tuổi mới thành công như Elon Musk, giàu có như Bill Gates!',
  '💎 HBD! Chúc bạn tuổi mới kiếm được nhiều tiền như Warren Buffett!',
  '🚀 Chúc mừng sinh nhật! Chúc sự nghiệp của bạn bay cao như tên lửa SpaceX!',
  '💫 HBD! Chúc bạn nổi tiếng như idol Kpop, xinh đẹp như hoa hậu!',
  '🌈 Sinh nhật vui vẻ! Chúc code của bạn không bao giờ có bug... chỉ có feature!',
  '🎨 HBD! Chúc bạn sáng tạo như Leonardo da Vinci, thông minh như Einstein!',
  '🎭 Sinh nhật vui vẻ! Chúc bạn diễn xuất tốt... trong các cuộc họp với sếp!',
  '🎯 Chúc mừng sinh nhật! Chúc bạn sớm thành influencer triệu follow!',
  '🎸 HBD! Chúc bạn hát hay như ca sĩ... trong phòng tắm!',
  '📱 Sinh nhật vui vẻ! Chúc bạn làm app hot trend như Threads, đánh bại Twitter!',
  '💫 HBD! Chúc bạn có nhiều người theo dõi như các KOLs trên Threads!',
  '🚀 Chúc mừng sinh nhật! Chúc bạn thành công như các cư dân trên Threads!',
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return res.status(200).json(randomMessage);
}
