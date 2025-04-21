import type { NextApiRequest, NextApiResponse } from 'next';
import { differenceInDays } from 'date-fns';

const christmasMessages = [
  '🎄 Giáng Sinh chỉ còn cách [days] ngày! Chúc mừng, mày có được quà hay người yêu không? 🎁',
  '🎅 Còn [days] ngày nữa đến Giáng Sinh! Mày đã chuẩn bị sẵn quà cho crush chưa, hay lại định mua cây thông tự chế? 🌲',
  '⭐ Chỉ còn [days] ngày nữa thôi! Hãy chuẩn bị tinh thần, nếu không có người yêu thì đành phải ôm gối ôm thôi! 🛋️',
  '✨ Giáng Sinh sắp đến! Còn [days] ngày nữa, mày đã có ai để cùng đi dạo dưới ánh đèn chưa? 💫',
  '🌟 Đếm ngược đến Giáng Sinh nào! Còn [days] ngày nữa, nhớ đừng để bố mẹ hỏi tại sao chưa có người yêu nhé! 😅',
  '🎁 Giáng Sinh chỉ còn [days] ngày! Đừng quên mua sắm quà cho người yêu, hoặc ít nhất là cho bản thân! 🛍️',
  '💝 Còn [days] ngày nữa là đến Giáng Sinh! Mày đã nghĩ ra cách tỏ tình hay chưa, hay vẫn đang bí từ? 💭',
  '🎄 Giáng Sinh đang tới! Còn [days] ngày nữa để lên kế hoạch hẹn hò, hay lại chuẩn bị cho một đêm cô đơn? 🌙',
  '🌲 Chỉ còn [days] ngày nữa thôi! Nếu mày không có người yêu, thì ít nhất hãy nuôi cây thông cho đỡ buồn! 🪴',
  '🍪 Giáng Sinh đang gõ cửa! Còn [days] ngày nữa, hãy tìm một ai đó để cùng nhau thưởng thức những món ngon nhé! 🍷',
  '🎅 Còn [days] ngày nữa là Noel! Năm nay lại ế rồi, thôi ở nhà coi Netflix cũng vui! 📺',
  '😈 Chỉ còn [days] ngày nữa thôi! Không có gấu thì làm gì? Tất nhiên là đi phá đám couple rồi! 🤭',
  '📢 Báo cáo! [days] ngày nữa là Giáng Sinh, tình hình ế vẫn hoàn ế! 🥲',
  '💸 Còn [days] ngày nữa! Không có người yêu thì có sao? Ế sạch tiền thì mới đáng lo! 💰',
  '🎄 Giáng Sinh còn [days] ngày! Năm nay kinh tế khó khăn, tặng nhau một cái like cũng là quà! 👍',
  '⏰ Đếm ngược [days] ngày! Không có gấu thì ôm mèo, không có mèo thì ôm... gối! 🛏️',
  '🌟 Chỉ còn [days] ngày! Giáng sinh này vẫn F.A, nhưng không sao, còn cơm mẹ nấu! 🍚',
  '🎊 Còn [days] ngày tới Noel! Không có người yêu thì có gì đáng buồn? Buồn là vì hết tiền thôi! 💸',
  '🎉 Giáng Sinh đến sau [days] ngày! Năm nay tiền đâu mà đi chơi, ở nhà ngắm đèn đường cũng được! 💡',
  '✨ Chỉ còn [days] ngày! Không cần người yêu, chỉ cần wifi mạnh và ví dày là đủ! 💪',
];

const todayChristmasMessages = [
  '🎄 Đừng buồn vì noel này bạn không có gấu, vì bình thường cũng đã có gấu bao giờ đâu 🎁',
  '🎅 Ông già Noel yêu quý, năm ngoái món quà của ông làm tôi vã mồ hôi. Năm nay tôi muốn được rên rỉ và kêu thét cơ 🌲',
  '⭐ Nửa đêm Giáng Sinh, nếu một ông già mập mặc đồ đỏ nhảy qua cửa sổ, gói bạn lại và cho vào bao tải thì đừng có chống cự nhé. Tôi đã nói với ông Noel rằng tôi muốn có bạn trong Giáng Sinh này 🛋️',
  '✨ Nếu một sáng mai thức dậy, bạn bỗng thấy mình bị nhét vào một cái bao bố thật to và bị lôi đi… thì đừng hoảng sợ nhé. Bởi vì tôi đã xin ông già Noel rằng món quà tôi muốn duy nhất chính là bạn! 💫',
  '🌟 Hôm nay, vì đàn tuần lộc chạy mất nên ông già Noel không thể đi tặng quà. Có 10 con chạy đi nhưng chỉ tìm thấy 9 con, còn 1 con đang đọc tin nhắn này. Noel vui vẻ, hạnh phúc và an lành nhé 😅',
  '🎁 Trong 20 thiên thần, có 19 thiên thần đang ngủ và 1 thiên thần đang đọc tin nhắn này. Bạn có biết bạn là người dễ thương và quan trọng với mình không. Giáng sinh rồi, an lành và vui vẻ nhé 🛍️',
  '🎅 Chúc mừng Giáng Sinh! Hãy truy cập https://santatracker.google.com/ để theo dõi hành trình của ông già Noel và tận hưởng ngày lễ tuyệt vời này! 🎁🎄',
  '🎄 Merry Christmas! Chúc bạn một Giáng sinh an lành và hạnh phúc, nhưng đừng hạnh phúc quá kẻo quên mất mình là ai.',
  '😂 Ngày Noel, có 1 ông già đang ngồi câu cá, 1 chiếc lá trôi trên sông, con công đang tập múa, 1 công chúa ngủ trong rừng, có nhiều thằng khùng đang đọc tin nhắn này. Hahaha.',
  '🎁 Chúc bạn đêm Giáng Sinh thả nhiều thính để cá nhanh đớp còn có người yêu.',
  '🦌 Đàn tuần lộc của ông già Noel chạy mất rồi, có 10 con, 9 con chạy mất, còn 1 con đang đọc tin nhắn này. Merry Christmas bạn iu!',
  '🎅 Noel này, tớ đã giờ ông già tuyết tặng quà cho cậu một anh người yêu đẹp trai như Lee Min Ho, giàu có như Bill Gates nên hãy mở cửa ra vào lúc 12h đêm để nhận quà nhé!',
  '❄️ Noel lạnh giá, tớ biết cậu chưa có người yêu nên hãy ở nhà cho ấm nhé, đừng ra ngoài tớ lo đấy. Còn tớ đi chơi với người yêu đây.',
  '🌟 Có lẽ ngày tháng độc thân của cậu sẽ còn nhiều hơn cả những ánh đèn rực rỡ trong ngày Giáng Sinh đó bạn à. Cố gắng lên, đừng ế nữa nhé!',
  '💥 Mong sao sao quả tạ đừng giáng xuống đầu bạn vào ngày Giáng Sinh. Chúc bạn tôi một mùa Noel cậu mắn và hạnh phúc.',
  '🎉 Tuyển lao động việc nhẹ lương cao, đêm Noel ra ngoài đi chơi, chụp ảnh bàn tay đang nắm, mọi chi phí ăn uống tôi bao hết.',
  '🤣 Có một Ông già Noel đang câu cá, có chiếc lá đang lơ lửng trên sông, có một chú công đang xoay vòng tập múa, có thêm công chúa đang ngủ trong rừng và có một thằng khùng đang đọc lời chúc. Giáng Sinh an lành nhé bạn yêu!',
  '✨ Zing gơ beo, zing gơ beo! Giáng Sinh an lành, Chúa sẽ ban phước cho bạn kiếm được anh/em người yêu để sớm thoát khỏi kiếp FA. Merry Christmas!',
  '🎄 Đừng buồn vì Noel này bạn không có gấu, vì bình thường cũng đã có gấu bao giờ đâu. 🎁',
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const today = new Date();
  const christmas = new Date(today.getFullYear(), 11, 25);

  if (today > christmas) {
    christmas.setFullYear(today.getFullYear() + 1);
  }

  const daysUntilChristmas = differenceInDays(christmas, today);

  // Nếu hôm nay là Noel
  if (daysUntilChristmas == 0) {
    const message =
      todayChristmasMessages[
        Math.floor(Math.random() * christmasMessages.length)
      ];
    return res.status(200).json(message);
  }
  const message = christmasMessages[
    Math.floor(Math.random() * christmasMessages.length)
  ].replace('[days]', daysUntilChristmas.toString());

  return res.status(200).json(message);
}
