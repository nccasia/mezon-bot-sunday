import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const now = new Date();
  // vietnamese timezone is UTC+7
  const today = new Date(now.getTime() + 7 * 60 * 60 * 1000);

  // Calculate the next Gregorian New Year (January 1st)
  const nextYear =
    today.getMonth() === 0 && today.getDate() === 1
      ? today.getFullYear()
      : today.getFullYear() + 1;

  const newYear = new Date(`${nextYear}-01-01T00:00:00Z`);

  // Kiểm tra nếu là mùng 1 tháng 1
  if (today.getMonth() === 0 && today.getDate() === 1) {
    const newYearWish = `
    🎉 Chào năm mới ${today.getFullYear()}! 🎉

    🌟 Năm mới đã đến, mang theo những hy vọng, niềm tin và cơ hội mới. Hãy cùng nhau mở ra một chương mới tràn đầy năng lượng tích cực! 🕊️

    ✨ Chúc mọi người một năm mới:
    - **Sức khỏe dồi dào** để tận hưởng từng khoảnh khắc đáng nhớ.
    - **Hạnh phúc tràn đầy** bên những người thân yêu.
    - **Thành công vang dội** trong công việc và học tập.
    - **May mắn ngập tràn** trên mọi nẻo đường.

    🕰️ Hãy để lại những điều không vui của năm cũ và bước vào năm mới với tinh thần lạc quan và quyết tâm. Chúng ta sẽ biến những giấc mơ thành hiện thực, cùng nhau tiến bước và chinh phục những đỉnh cao mới!

    🥂 Cùng nâng ly chúc mừng một năm ${today.getFullYear()} đầy hứa hẹn. Cảm ơn tất cả mọi người vì đã đồng hành trong hành trình này. 💖

    🚀 Năm mới, cơ hội mới, hành trình mới! Hãy làm cho năm nay trở thành một năm đáng nhớ nhất! ✨
    `;

    return res.status(200).json(newYearWish);
  }

  const timeDifference = newYear.getTime() - today.getTime();

  if (timeDifference < 0) {
    return res.status(400).json('Error calculating time until New Year');
  }

  const daysUntilNewYear = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursUntilNewYear = Math.floor(
    (timeDifference / (1000 * 60 * 60)) % 24
  );
  const minutesUntilNewYear = Math.floor((timeDifference / (1000 * 60)) % 60);
  const secondsUntilNewYear = Math.floor((timeDifference / 1000) % 60);

  let message = '';

  if (daysUntilNewYear > 0) {
    const messages = [
      '🎊 Đếm ngược từng ngày nhé! Chỉ còn [days] ngày nữa là đến Tết rồi! 🎉',
      '🌟 Một năm mới đầy hứa hẹn đang đến gần! Còn [days] ngày nữa thôi! 🎆',
      '🕰️ Hãy sẵn sàng! Chỉ còn [days] ngày nữa là bước sang năm mới! 🎊',
      '💼 Chúng ta đang chờ đón một khởi đầu mới, chỉ còn [days] ngày nữa thôi! ✨',
      '🍾 Cùng nâng ly chúc mừng! Chỉ còn [days] ngày nữa là Tết Dương Lịch! 🥂',
      '📅 Đánh dấu lịch ngay! Tết Dương Lịch chỉ còn [days] ngày nữa! 🗓️',
      '🎆 Chỉ còn [days] ngày nữa, những pháo hoa sẽ lại rực sáng trên bầu trời! 🌌',
      '🏖️ Còn [days] ngày nữa là được nghỉ Tết rồi, bạn đã lên kế hoạch chưa? 🌞',
      '🚀 Hành trình đến năm mới chỉ còn [days] ngày nữa! Chuẩn bị xuất phát nào! 🚀',
      '🥳 Đếm ngược nào! Chỉ còn [days] ngày nữa là đến thời khắc giao thừa! 🎉',
      '👨‍👩‍👧‍👦 Còn [days] ngày nữa là lúc sum vầy bên gia đình, đừng quên nhé! 💝',
      '🎉 Một năm mới tràn đầy niềm vui và hy vọng chỉ cách chúng ta [days] ngày thôi! 🌈',
      '🌏 Cả thế giới đang chờ đón năm mới, còn [days] ngày nữa thôi! 🌍',
      '🛍️ Shopping ngay đi! Chỉ còn [days] ngày nữa để sắm sửa cho năm mới! 🎁',
      '🥂 Tạm biệt năm cũ! Chỉ còn [days] ngày nữa là đến lúc đón năm mới! 🎇',
      '⏰ Đồng hồ đang đếm ngược, chỉ còn [days] ngày nữa để hoàn thành mục tiêu năm nay! 🕰️',
      '🏡 Tết Dương Lịch chỉ còn [days] ngày, bạn đã dọn dẹp nhà cửa chưa? 🧹',
      '🎵 Nhạc Tết đã vang khắp nơi, chỉ còn [days] ngày nữa thôi! 🎶',
      '💪 Năm mới đang đến, chỉ còn [days] ngày để bắt đầu mạnh mẽ hơn! 🏋️‍♂️',
      '🎊 Chúng ta sẽ chào đón năm mới chỉ trong [days] ngày nữa! Sẵn sàng chưa? 🎉',
    ];

    message = messages[Math.floor(Math.random() * messages.length)].replace(
      '[days]',
      daysUntilNewYear.toString()
    );
  } else {
    message = `🎉 Chỉ còn ${hoursUntilNewYear} giờ ${minutesUntilNewYear} phút ${secondsUntilNewYear} giây nữa là đến giao thừa! 🕰️`;
  }

  return res.status(200).json(message);
}
