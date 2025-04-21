import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { random } from '@/utils/utils';

const messages: string[] = [
  '🌞 Chỉ còn {days} ngày nữa là lương sẽ về, sẵn sàng đón năng lượng mới nhé!',
  '🎉 Chờ đợi đã xong! Lương chỉ còn {days} ngày nữa thôi, chuẩn bị lên kế hoạch chi tiêu nào!',
  '🌷 Đếm ngược nào, {days} ngày nữa là đến ngày lương rồi, chuẩn bị cho mọi dự định nhé!',
  '🎊 Thời gian chờ đợi không lâu nữa, chỉ còn {days} ngày là có lương, tha hồ tận hưởng!',
  '🌻 Lương chỉ còn {days} ngày nữa là đến, chuẩn bị cho tháng mới rực rỡ thôi!',
  '🌞 Thời gian đếm ngược bắt đầu! Chỉ còn {days} ngày nữa là lương về.',
  '🌴 Hãy vui lên, lương chỉ còn {days} ngày nữa là về rồi, tha hồ tận hưởng cuộc sống!',
  '🍂 Ngày chờ đợi đã gần kề, chỉ còn {days} ngày nữa là đến ngày nhận lương!',
  '🎈 Tin vui đây! Chỉ còn {days} ngày nữa là đến ngày lương, bạn đã sẵn sàng chưa?',
  '🎃 Đếm ngược thôi! Chỉ còn {days} ngày là lương về rồi, chuẩn bị chi tiêu hợp lý nhé!',
  '💸 Còn {days} ngày nữa là có tiền trả nợ rồi! Chủ nợ ơi, em sắp có tiền rồi!',
  '🤑 {days} ngày nữa thôi là được ăn mì gói cao cấp rồi các bạn ơi!',
  '🎰 Chỉ còn {days} ngày nữa là có tiền all-in Crypto rồi! To the moon! 🚀',
  '🎮 {days} ngày nữa là có lương rồi! Còn đủ tiền nạp game không các bạn?',
  '🍜 Báo cáo sếp, còn {days} ngày nữa mới có lương, cho em ứng 500k ăn mì tôm!',
  '🏃 Chạy deadline cật lực vì còn {days} ngày nữa mới có lương! Sếp ơi em đói quá!',
  '💰 {days} ngày nữa là có tiền trả góp iPhone 15 rồi! Ăn mì gói cả tháng không sao!',
  '🎵 Còn {days} ngày nữa thôi! Lương về là anh đưa em đi trốn... nợ!',
  '🌙 {days} ngày nữa là lương về! Nhưng mà về thẳng ví chủ nợ mất rồi!',
  '🎪 Còn {days} ngày nữa! Lương chưa về mà bill về đầy nhà!',
];

const messageReceivedSalarys = [
  '🎉 Tôi vừa nhận lương! Tôi dùng để trả nợ hết rồi, còn bạn thì sao?',
  '💸 Tôi đã có lương! Tôi all-in vào trả nợ, còn bạn thì sao?',
  '🎮 Tôi có lương rồi! Tôi nạp hết vào game, còn bạn thì sao?',
  '🛍️ Tôi nhận lương xong! Tôi mua sắm Shopee ngập mặt, còn bạn thì sao?',
  '🏃 Tôi lãnh lương rồi! Tôi giấu vợ/chồng để tiêu, còn bạn thì sao?',
  '🎰 Tôi có lương! Tôi all-in Crypto luôn, còn bạn thì sao?',
  '💳 Tôi nhận lương! Tôi trả góp iPhone mới, còn bạn thì sao?',
  '🍜 Tôi có lương rồi! Tôi ăn nhà hàng xịn, còn bạn thì sao?',
  '📱 Tôi lãnh lương! Tôi đổi điện thoại mới, còn bạn vẫn xài máy cũ?',
  '🎵 Tôi nhận lương! Tôi đi du lịch hết, còn bạn vẫn đang work from home?',
  '🌙 Tôi có lương! Tôi để dành hết, còn bạn tiêu sạch rồi à?',
  '🎪 Tôi nhận lương! Tôi trả hết hoá đơn, còn bạn vẫn đang nợ bill?',
  '🖥️ Tôi có lương rồi! Tôi đi mua Mac Mini M4 mới ra, còn bạn thì sao?',
];

const messageNoSalary = [
  '😭 Lương chưa về, đang phải ăn mì gói của tháng trước để dành',
  '🏃 Không có lương, phải chạy deadline cật lực kiếm thêm giờ',
  '🍜 Báo cáo: Hôm nay vẫn chưa có lương, đang ăn cơm với muối',
  '💳 Lương chưa về nhưng bill thẻ tín dụng thì về đều đặn quá',
  '🌙 Lương ơi là lương, sao mày không về với tao?',
  '💰 Không có lương, đang phải bán thận trả nợ',
  '🖥️ Không có lương nhưng vẫn mơ về MacBook M4 Max',
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const today = moment().startOf('day');
  
  // Lấy thông tin lương tháng này
  let currentSalary = await prisma.salary.findFirst({
    where: {
      applyMonth: today.format('YYYY-MM-01'),
    },
  });

  if (!currentSalary) {
    currentSalary = await prisma.salary.create({
      data: {
        applyMonth: today.format('YYYY-MM-01'),
        dateE: today.clone().add(1, 'months').date(5).toDate().toISOString(),
      },
    });
  }


  // Lấy thông tin lương tháng trước
  const lastSalary = await prisma.salary.findFirst({
    where: {
      applyMonth: today.clone().subtract(1, 'months').format('YYYY-MM-01'),
    },
  });

  // Nếu đã có ngày nhận lương thực tế của tháng trước và hôm nay >= ngày nhận lương thực tế
  if (lastSalary?.dateA && moment(lastSalary.dateA).startOf('day').isSameOrBefore(today)) {
    return res.status(200).json(random(messageReceivedSalarys));
  }

  // Nếu tháng trước có ngày dự kiến và chưa có ngày thực tế
  if (lastSalary?.dateE && !lastSalary.dateA) {
    const expectedDate = moment(lastSalary.dateE).startOf('day');
    if (expectedDate.isAfter(today)) {
      const daysUntilSalary = expectedDate.diff(today, 'days');
      return res.status(200).json(
        random(messages).replace('{days}', (daysUntilSalary + 1).toString())
      );
    }
  }

  // Kiểm tra ngày dự kiến của tháng này
  if (currentSalary.dateE) {
    const expectedDate = moment(currentSalary.dateE).startOf('day');
    if (expectedDate.isAfter(today)) {
      const daysUntilSalary = expectedDate.diff(today, 'days');
      return res.status(200).json(
        random(messages).replace('{days}', (daysUntilSalary + 1).toString())
      );
    }
  }

  // Nếu không có thông tin hoặc đã quá ngày dự kiến
  return res.status(200).json(random(messageNoSalary));
}
