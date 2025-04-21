import type { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';

const messages = [
  '🎊 Đếm ngược từng ngày nhé! Chỉ còn [days] ngày nữa là đến Tết rồi! 🎉',
  '🌺 Tết đang đến gần! Chúng ta chỉ còn [days] ngày nữa để chuẩn bị cho một năm mới an khang! 🎋',
  '🧧 Năm mới sắp gõ cửa, bạn đã sẵn sàng chưa? Còn đúng [days] ngày nữa thôi! ✨',
  '🏮 Không khí Tết đang rộn ràng khắp nơi! Còn [days] ngày nữa để cùng nhau đón Xuân về! 🌸',
  '👨‍👩‍👧‍👦 Chỉ còn [days] ngày nữa, cả gia đình lại quây quần đón Tết! Bạn đã chuẩn bị xong chưa? 🎍',
  '🎆 Tết Nguyên Đán chỉ còn [days] ngày nữa! Hãy sẵn sàng cho năm mới đầy hy vọng! 🌟',
  '⏳ Chờ đợi chẳng còn bao lâu! Chỉ còn [days] ngày nữa là chúng ta sẽ bước vào năm mới! 🎇',
  '🌅 Một năm mới đang chờ đón chúng ta! Tết chỉ còn cách [days] ngày! 🎐',
  '⌛ Thời gian trôi thật nhanh! Chỉ còn [days] ngày nữa là đến Tết rồi, bạn đã sắm sửa gì chưa? 🛍️',
  '🎈 Còn [days] ngày nữa thôi là đến Tết! Cùng nhau đếm ngược để chào đón một năm mới tốt lành nhé! 🎊',
  '😱 Ối giời ơi! Còn có [days] ngày nữa là Tết, tiền đâu mà lì xì đây?! 💸',
  '🥘 Chỉ còn [days] ngày nữa thôi là được ăn bánh chưng ngập mỡ rồi, diet gì mà diet! 🍽️',
  '🧧 Đếm từng ngày như đếm tiền! [days] ngày nữa là được nhận lì xì rồi các cháu ơi! 💰',
  '📅 Còn [days] ngày nữa là được nghỉ Tết, sếp ơi em xin về quê sớm được không? 🙏',
  '💔 Chỉ còn [days] ngày nữa thôi! Năm nay không có người yêu, Tết này lại ế! 😢',
  '📢 Báo cáo! Còn [days] ngày nữa là được ăn Tết. Mẹ ơi con sắp về rồi đừng gả con đi! 🏃‍♀️',
  '🍺 Hết Tết lại đến Tết, còn [days] ngày nữa là lại được ăn nhậu xả láng! 🍗',
  '📱 Còn [days] ngày nữa là Tết, năm nay không có tiền mua iPhone mới rồi các bác ạ! 💸',
  '🚂 Đếm ngược [days] ngày nữa là được về quê ăn Tết! Mẹ ơi con vẫn ế! 😭',
  '💝 Chỉ còn [days] ngày nữa thôi! Năm nay kinh tế khó khăn, lì xì 1k cũng là lì xì! 🤑',
];

export const lunarNewYearDates: Record<number, string> = {
  2024: '2024-02-10',
  2025: '2025-01-29',
  2026: '2026-02-17',
  2027: '2027-02-06',
  2028: '2028-01-26',
  2029: '2029-02-13',
  2030: '2030-02-03',
  2031: '2031-01-23',
  2032: '2032-02-11',
  2033: '2033-01-31',
  2034: '2034-02-19',
  2035: '2035-02-08',
  2036: '2036-01-28',
  2037: '2037-02-15',
  2038: '2038-02-04',
  2039: '2039-01-24',
  2040: '2040-02-12',
  2041: '2041-02-01',
  2042: '2042-01-22',
  2043: '2043-02-10',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const today = moment().utcOffset(7);

  let lunarNewYear = null;
  for (const [, date] of Object.entries(lunarNewYearDates)) {
    const lunarDate = moment(date).utcOffset(7);
    if (lunarDate.isAfter(today)) {
      lunarNewYear = lunarDate;
      break;
    }
  }

  if (!lunarNewYear) {
    return res
      .status(400)
      .json('No Lunar New Year data available for this year');
  }

  const daysUntilLunarNewYear = lunarNewYear.diff(today, 'days');

  const randomMessage = messages[
    Math.floor(Math.random() * messages.length)
  ].replace('[days]', daysUntilLunarNewYear.toString());

  return res.status(200).json(randomMessage);
}
