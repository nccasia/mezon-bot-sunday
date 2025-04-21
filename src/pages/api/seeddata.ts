import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await prisma.message.deleteMany();

  await prisma.message.createMany({
    data: [
      {
        content:
          '🌞 Chỉ còn {days} ngày nữa là lương sẽ về, sẵn sàng đón năng lượng mới nhé!',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🎉 Chờ đợi đã xong! Lương chỉ còn {days} ngày nữa thôi, chuẩn bị lên kế hoạch chi tiêu nào!',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🌷 Đếm ngược nào, {days} ngày nữa là đến ngày lương rồi, chuẩn bị cho mọi dự định nhé!',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🎊 Thời gian chờ đợi không lâu nữa, chỉ còn {days} ngày là có lương, tha hồ tận hưởng!',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🌻 Lương chỉ còn {days} ngày nữa là đến, chuẩn bị cho tháng mới rực rỡ thôi!',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🌞 Thời gian đếm ngược bắt đầu! Chỉ còn {days} ngày nữa là lương về.',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🌴 Hãy vui lên, lương chỉ còn {days} ngày nữa là về rồi, tha hồ tận hưởng cuộc sống!',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🍂 Ngày chờ đợi đã gần kề, chỉ còn {days} ngày nữa là đến ngày nhận lương!',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🎈 Tin vui đây! Chỉ còn {days} ngày nữa là đến ngày lương, bạn đã sẵn sàng chưa?',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🎃 Đếm ngược thôi! Chỉ còn {days} ngày là lương về rồi, chuẩn bị chi tiêu hợp lý nhé!',
        type: 'demngaynhanluong',
      },
      {
        content:
          '💸 Còn {days} ngày nữa là có tiền trả nợ rồi! Chủ nợ ơi, em sắp có tiền rồi!',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🤑 {days} ngày nữa thôi là được ăn mì gói cao cấp rồi các bạn ơi!',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🎰 Chỉ còn {days} ngày nữa là có tiền all-in Crypto rồi! To the moon! 🚀',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🎮 {days} ngày nữa là có lương rồi! Còn đủ tiền nạp game không các bạn?',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🍜 Báo cáo sếp, còn {days} ngày nữa mới có lương, cho em ứng 500k ăn mì tôm!',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🏃 Chạy deadline cật lực vì còn {days} ngày nữa mới có lương! Sếp ơi em đói quá!',
        type: 'demngaynhanluong',
      },
      {
        content:
          '💰 {days} ngày nữa là có tiền trả góp iPhone 15 rồi! Ăn mì gói cả tháng không sao!',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🎵 Còn {days} ngày nữa thôi! Lương về là anh đưa em đi trốn... nợ!',
        type: 'demngaynhanluong',
      },
      {
        content:
          '🌙 {days} ngày nữa là lương về! Nhưng mà về thẳng ví chủ nợ mất rồi!',
        type: 'demngaynhanluong',
      },
      {
        content: '🎪 Còn {days} ngày nữa! Lương chưa về mà bill về đầy nhà!',
        type: 'demngaynhanluong',
      },
    ],
  });

  await prisma.message.createMany({
    data: [
      {
        content:
          '🎄 Giáng Sinh chỉ còn cách [days] ngày! Chúc mừng, mày có được quà hay người yêu không? 🎁',
        type: 'demngaynoel',
      },
      {
        content:
          '🎅 Còn [days] ngày nữa đến Giáng Sinh! Mày đã chuẩn bị sẵn quà cho crush chưa, hay lại định mua cây thông tự chế? 🌲',
        type: 'demngaynoel',
      },
      {
        content:
          '⭐ Chỉ còn [days] ngày nữa thôi! Hãy chuẩn bị tinh thần, nếu không có người yêu thì đành phải ôm gối ôm thôi! 🛋️',
        type: 'demngaynoel',
      },
      {
        content:
          '✨ Giáng Sinh sắp đến! Còn [days] ngày nữa, mày đã có ai để cùng đi dạo dưới ánh đèn chưa? 💫',
        type: 'demngaynoel',
      },
      {
        content:
          '🌟 Đếm ngược đến Giáng Sinh nào! Còn [days] ngày nữa, nhớ đừng để bố mẹ hỏi tại sao chưa có người yêu nhé! 😅',
        type: 'demngaynoel',
      },
      {
        content:
          '🎁 Giáng Sinh chỉ còn [days] ngày! Đừng quên mua sắm quà cho người yêu, hoặc ít nhất là cho bản thân! 🛍️',
        type: 'demngaynoel',
      },
      {
        content:
          '💝 Còn [days] ngày nữa là đến Giáng Sinh! Mày đã nghĩ ra cách tỏ tình hay chưa, hay vẫn đang bí từ? 💭',
        type: 'demngaynoel',
      },
      {
        content:
          '🎄 Giáng Sinh đang tới! Còn [days] ngày nữa để lên kế hoạch hẹn hò, hay lại chuẩn bị cho một đêm cô đơn? 🌙',
        type: 'demngaynoel',
      },
      {
        content:
          '🌲 Chỉ còn [days] ngày nữa thôi! Nếu mày không có người yêu, thì ít nhất hãy nuôi cây thông cho đỡ buồn! 🪴',
        type: 'demngaynoel',
      },
      {
        content:
          '🍪 Giáng Sinh đang gõ cửa! Còn [days] ngày nữa, hãy tìm một ai đó để cùng nhau thưởng thức những món ngon nhé! 🍷',
        type: 'demngaynoel',
      },
      {
        content:
          '🎅 Còn [days] ngày nữa là Noel! Năm nay lại ế rồi, thôi ở nhà coi Netflix cũng vui! 📺',
        type: 'demngaynoel',
      },
      {
        content:
          '😈 Chỉ còn [days] ngày nữa thôi! Không có gấu thì làm gì? Tất nhiên là đi phá đám couple rồi! 🤭',
        type: 'demngaynoel',
      },
      {
        content:
          '📢 Báo cáo! [days] ngày nữa là Giáng Sinh, tình hình ế vẫn hoàn ế! 🥲',
        type: 'demngaynoel',
      },
      {
        content:
          '💸 Còn [days] ngày nữa! Không có người yêu thì có sao? Ế sạch tiền thì mới đáng lo! 💰',
        type: 'demngaynoel',
      },
      {
        content:
          '🎄 Giáng Sinh còn [days] ngày! Năm nay kinh tế khó khăn, tặng nhau một cái like cũng là quà! 👍',
        type: 'demngaynoel',
      },
      {
        content:
          '⏰ Đếm ngược [days] ngày! Không có gấu thì ôm mèo, không có mèo thì ôm... gối! 🛏️',
        type: 'demngaynoel',
      },
      {
        content:
          '🌟 Chỉ còn [days] ngày! Giáng sinh này vẫn F.A, nhưng không sao, còn cơm mẹ nấu! 🍚',
        type: 'demngaynoel',
      },
      {
        content:
          '🎊 Còn [days] ngày tới Noel! Không có người yêu thì có gì đáng buồn? Buồn là vì hết tiền thôi! 💸',
        type: 'demngaynoel',
      },
      {
        content:
          '🎉 Giáng Sinh đến sau [days] ngày! Năm nay tiền đâu mà đi chơi, ở nhà ngắm đèn đường cũng được! 💡',
        type: 'demngaynoel',
      },
      {
        content:
          '✨ Chỉ còn [days] ngày! Không cần người yêu, chỉ cần wifi mạnh và ví dày là đủ! 💪',
        type: 'demngaynoel',
      },
    ],
  });

  await prisma.message.createMany({
    data: [
      {
        content:
          '🎊 Đếm ngược từng ngày nhé! Chỉ còn [days] ngày nữa là đến Tết rồi! 🎉',
        type: 'demngaytetam',
      },
      {
        content:
          '🌺 Tết đang đến gần! Chúng ta chỉ còn [days] ngày nữa để chuẩn bị cho một năm mới an khang! 🎋',
        type: 'demngaytetam',
      },
      {
        content:
          '🧧 Năm mới sắp gõ cửa, bạn đã sẵn sàng chưa? Còn đúng [days] ngày nữa thôi! ✨',
        type: 'demngaytetam',
      },
      {
        content:
          '🏮 Không khí Tết đang rộn ràng khắp nơi! Còn [days] ngày nữa để cùng nhau đón Xuân về! 🌸',
        type: 'demngaytetam',
      },
      {
        content:
          '👨‍👩‍👧‍👦 Chỉ còn [days] ngày nữa, cả gia đình lại quây quần đón Tết! Bạn đã chuẩn bị xong chưa? 🎍',
        type: 'demngaytetam',
      },
      {
        content:
          '🎆 Tết Nguyên Đán chỉ còn [days] ngày nữa! Hãy sẵn sàng cho năm mới đầy hy vọng! 🌟',
        type: 'demngaytetam',
      },
      {
        content:
          '⏳ Chờ đợi chẳng còn bao lâu! Chỉ còn [days] ngày nữa là chúng ta sẽ bước vào năm mới! 🎇',
        type: 'demngaytetam',
      },
      {
        content:
          '🌅 Một năm mới đang chờ đón chúng ta! Tết chỉ còn cách [days] ngày! 🎐',
        type: 'demngaytetam',
      },
      {
        content:
          '⌛ Thời gian trôi thật nhanh! Chỉ còn [days] ngày nữa là đến Tết rồi, bạn đã sắm sửa gì chưa? 🛍️',
        type: 'demngaytetam',
      },
      {
        content:
          '🎈 Còn [days] ngày nữa thôi là đến Tết! Cùng nhau đếm ngược để chào đón một năm mới tốt lành nhé! 🎊',
        type: 'demngaytetam',
      },
      {
        content:
          '😱 Ối giời ơi! Còn có [days] ngày nữa là Tết, tiền đâu mà lì xì đây?! 💸',
        type: 'demngaytetam',
      },
      {
        content:
          '🥘 Chỉ còn [days] ngày nữa thôi là được ăn bánh chưng ngập mỡ rồi, diet gì mà diet! 🍽️',
        type: 'demngaytetam',
      },
      {
        content:
          '🧧 Đếm từng ngày như đếm tiền! [days] ngày nữa là được nhận lì xì rồi các cháu ơi! 💰',
        type: 'demngaytetam',
      },
      {
        content:
          '📅 Còn [days] ngày nữa là được nghỉ Tết, sếp ơi em xin về quê sớm được không? 🙏',
        type: 'demngaytetam',
      },
      {
        content:
          '💔 Chỉ còn [days] ngày nữa thôi! Năm nay không có người yêu, Tết này lại ế! 😢',
        type: 'demngaytetam',
      },
      {
        content:
          '📢 Báo cáo! Còn [days] ngày nữa là được ăn Tết. Mẹ ơi con sắp về rồi đừng gả con đi! 🏃‍♀️',
        type: 'demngaytetam',
      },
      {
        content:
          '🍺 Hết Tết lại đến Tết, còn [days] ngày nữa là lại được ăn nhậu xả láng! 🍗',
        type: 'demngaytetam',
      },
      {
        content:
          '📱 Còn [days] ngày nữa là Tết, năm nay không có tiền mua iPhone mới rồi các bác ạ! 💸',
        type: 'demngaytetam',
      },
      {
        content:
          '🚂 Đếm ngược [days] ngày nữa là được về quê ăn Tết! Mẹ ơi con vẫn ế! 😭',
        type: 'demngaytetam',
      },
      {
        content:
          '💝 Chỉ còn [days] ngày nữa thôi! Năm nay kinh tế khó khăn, lì xì 1k cũng là lì xì! 🤑',
        type: 'demngaytetam',
      },
    ],
  });

  await prisma.message.createMany({
    data: [
      {
        content: '🎂 Chúc mừng sinh nhật! Tuổi mới vẫn ế như cũ nhé!',
        type: 'hbd',
      },
      {
        content:
          '🎈 Happy Birthday! Chúc bạn sớm thoát ế, mà thôi chắc không thoát được đâu!',
        type: 'hbd',
      },
      {
        content: '🎉 Sinh nhật vui vẻ! Năm nay lại thêm một tuổi mà vẫn F.A!',
        type: 'hbd',
      },
      {
        content: '🎁 HBD! Chúc bạn sớm có người yêu... trong mơ!',
        type: 'hbd',
      },
      {
        content:
          '💝 HBD! Chúc bạn sớm thoát kiếp FA... mà thôi cứ quen dần đi!',
        type: 'hbd',
      },
      {
        content:
          '🎂 Sinh nhật vui vẻ! Tuổi mới vẫn độc thân, vẫn không có gấu!',
        type: 'hbd',
      },
      {
        content: '🎈 HBD! Chúc bạn tuổi mới vẫn xinh đẹp... trong filter!',
        type: 'hbd',
      },
      {
        content:
          '🎉 Sinh nhật vui vẻ! Tuổi mới vẫn đẹp trai... khi không ai nhìn thấy!',
        type: 'hbd',
      },
      {
        content:
          '🎊 Chúc mừng sinh nhật! Năm nay lại thêm một tuổi... lướt Tinder!',
        type: 'hbd',
      },
      {
        content: '🎁 HBD! Chúc bạn sớm tìm được nửa kia... trong game!',
        type: 'hbd',
      },
      {
        content:
          '🌟 Sinh nhật vui vẻ! Tuổi mới vẫn cô đơn nhưng giàu... trong mơ!',
        type: 'hbd',
      },
      {
        content: '🎂 HBD! Chúc bạn sớm có người yêu... à nhầm, sớm có lương!',
        type: 'hbd',
      },
    ],
  });

  await prisma.message.createMany({
    data: [
      {
        content: '🎲 Con số may mắn của bạn là: ${result}',
        type: 'roll',
      },
      {
        content: '🎯 Kết quả roll của bạn: ${result}',
        type: 'roll',
      },
      {
        content: '🎪 Xúc xắc đã chọn số: ${result}',
        type: 'roll',
      },
      {
        content: '🎨 Số của bạn là: ${result}',
        type: 'roll',
      },
      {
        content: '🎭 May mắn đã chọn số: ${result}',
        type: 'roll',
      },
      {
        content: '🎰 Số ${result} này chắc trúng số đấy, mua vé đi!',
        type: 'roll',
      },
      {
        content: '🎲 ${result}! Số này đẹp đấy, làm tí lô đê!',
        type: 'roll',
      },
      {
        content:
          '🎯 Ối giời ơi! ${result} là số tuổi người yêu tương lai của bạn đấy!',
        type: 'roll',
      },
      {
        content: '🎪 ${result}! Số này mà đánh đề thì giàu to rồi!',
        type: 'roll',
      },
      {
        content: '🎨 Số ${result} này là số người yêu cũ của crush đấy!',
        type: 'roll',
      },
    ],
  });

  await prisma.coin.deleteMany();
  return res.status(200).json('success');
}
