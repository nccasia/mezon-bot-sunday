import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import moment from 'moment';
// import { aiTalk } from './sunday';
const AdminKey = process.env.ADMIN_SECRET_KEY;

const commandHandlers = {
  help: async (command: string, key: string) => {
    if (key !== AdminKey) {
      return 'Không có quyền truy cập';
    }
    return `Hướng dẫn sử dụng:
- add <command> <value>: Thêm lệnh mới
- delete <command> <id>: Xóa lệnh theo id
- update <command> <value>: Cập nhật nội dung lệnh
- lock <id> <secretKey>: Khóa lệnh bằng mật khẩu
- unlock <id> <secretKey>: Mở khóa lệnh bằng mật khẩu
- getinfo <command> <key>: Xem thông tin chi tiết của lệnh (cần quyền admin)
- getid <command>: Lấy id của lệnh
- openSalaryDate <> <key>: Mở ngày nhận lương (cần quyền admin)
- getSalaryDateId <> <key>: Xem danh sách ngày nhận lương (cần quyền admin)
- updateSalaryDate <id-date> <key>: Cập nhật ngày nhận lương (cần quyền admin)
- deleteSalaryDate <id> <key>: Xóa ngày nhận lương (cần quyền admin)
- receiveSalary <id> <key>: Xác nhận đã nhận lương (cần quyền admin)
- manualCreateSalaryDate <applyMonth-dateE-dateA> <key>: Tạo ngày nhận lương (cần quyền admin)
- manualUpdateSalaryDate <id-dateE-dateA> <key>: Cập nhật ngày nhận lương (cần quyền admin)
- cleanSalaryDate <> <key>: Xóa tất cả ngày nhận lương (cần quyền admin)`;
  },
  example: async (command: string, key: string) => {
    if (key !== AdminKey) {
      return 'Không có quyền truy cập';
    }
    return `Ví dụ:
- add hello world
- update hello world xin chào
- lock 1 'Key'
- unlock 1 'Key'
- getinfo hello world 'Key'
- getid hello world
- openSalaryDate 2025/01/01 'Key'
- getSalaryDateId 'Key'
- updateSalaryDate 1 2025/01/01 'Key'
- receiveSalary 1 'Key'
- manualCreateSalaryDate 2025/01/01 2025/01/01 'Key'
- manualUpdateSalaryDate 1 2025/01/01 2025/01/01 'Key'
- cleanSalaryDate 'Key'
`;
  },

  add: async (command: string, value: string) => {
    const existingCommand = await prisma.customCommand.findFirst({
      where: { command },
    });

    if (existingCommand) {
      return await commandHandlers.update(command, value);
    }

    const newCommand = await prisma.customCommand.create({
      data: { command, response: value },
    });
    return `Thêm lệnh thành công. Id: ${newCommand.id}`;
  },

  delete: async (command: string, id: string) => {
    const commandToDelete = await prisma.customCommand.findFirst({
      where: {
        id: Number(id),
        command,
      },
    });

    if (!commandToDelete) {
      return 'Không tìm thấy lệnh để xóa';
    }

    await prisma.customCommand.delete({
      where: { id: Number(id) },
    });
    return 'Xóa lệnh thành công';
  },

  update: async (command: string, value: string) => {
    const commandToUpdate = await prisma.customCommand.findFirst({
      where: { command },
    });

    if (!commandToUpdate) {
      return 'Không tìm thấy lệnh để cập nhật';
    }

    if (commandToUpdate.secretKey) {
      return 'Lệnh này đã bị khóa';
    }
    await prisma.customCommand.update({
      where: { id: commandToUpdate.id },
      data: { response: value },
    });

    return 'Cập nhật lệnh thành công';
  },

  lock: async (id: string, secretKey: string) => {
    const commandToLock = await prisma.customCommand.findFirst({
      where: { id: Number(id) },
    });

    if (!commandToLock) {
      return 'Không tìm thấy lệnh để khóa';
    }

    if (commandToLock.secretKey) {
      return 'Bạn không thể khóa lệnh này';
    }

    await prisma.customCommand.update({
      where: { id: Number(id) },
      data: { secretKey },
    });
    return 'Khóa lệnh thành công';
  },

  unlock: async (id: string, secretKey: string) => {
    const commandToUnlock = await prisma.customCommand.findFirst({
      where: { id: Number(id) },
    });

    if (!commandToUnlock) {
      return 'Không tìm thấy lệnh để mở khóa';
    }

    if (!commandToUnlock.secretKey) {
      return 'Lệnh này không bị khóa';
    }

    if (commandToUnlock.secretKey !== secretKey) {
      return 'Bạn không thể mở khóa lệnh này';
    }

    await prisma.customCommand.update({
      where: { id: Number(id) },
      data: { secretKey: null },
    });
    return 'Mở khóa lệnh thành công';
  },

  getinfo: async (command: string, key: string) => {
    if (key !== AdminKey) {
      return 'Không có quyền truy cập';
    }
    const commandInfo = await prisma.customCommand.findFirst({
      where: { command },
    });

    if (!commandInfo) {
      return 'Không tìm thấy thông tin lệnh';
    }

    return JSON.stringify(commandInfo, null, 2);
  },

  getid: async (command: string) => {
    const commandInfo = await prisma.customCommand.findFirst({
      where: { command },
    });
    if (!commandInfo) {
      return 'Không tìm thấy thông tin lệnh';
    }
    return `Id của command ${command} là ${commandInfo.id}`;
  },

  openSalaryDate: async (command: string, key: string) => {
    if (key !== AdminKey) {
      return 'Không có quyền truy cập';
    }
    if (!command.startsWith('openSalaryDate')) {
      return 'Lệnh không đúng';
    }
    const [, dateE] = command.split('-');
    if (!dateE) {
      return 'Thiếu ngày nhận lương';
    }

    const salary = await prisma.salary.findFirst({
      where: {
        applyMonth: moment().format('YYYY-MM-01'),
      },
    });
    if (salary) {
      await prisma.salary.update({
        where: { id: salary.id },
        data: { dateE: moment(dateE, 'YYYY/MM/DD').toDate().toISOString() },
      });
    } else {
      await prisma.salary.create({
        data: {
          applyMonth: moment().format('YYYY-MM-01'),
          dateE: moment(dateE, 'YYYY/MM/DD').toDate().toISOString(),
        },
      });
    }

    await prisma.salary.create({
      data: {
        applyMonth: moment().format('YYYY-MM-01'),
        dateE: moment(dateE, 'YYYY/MM/DD').toDate().toISOString(),
      },
    });

    return 'Done';
  },
  getSalaryDateId: async (command: string, key: string) => {
    if (key !== AdminKey) {
      return 'Không có quyền truy cập';
    }

    const salary = await prisma.salary.findMany();
    return JSON.stringify(salary, null, 2);
  },
  updateSalaryDate: async (command: string, key: string) => {
    if (key !== AdminKey) {
      return 'Không có quyền truy cập';
    }
    const [id, dateE] = command.split('-');
    if (!id || !dateE) {
      return 'Thiếu id hoặc ngày nhận lương';
    }
    await prisma.salary.update({
      where: { id: Number(id) },
      data: { dateE: moment(dateE, 'YYYY/MM/DD').toDate().toISOString() },
    });
    return 'Done';
  },
  deleteSalaryDate: async (id: string, key: string) => {
    if (key !== AdminKey) {
      return 'Không có quyền truy cập';
    }

    await prisma.salary.delete({ where: { id: Number(id) } });
    return 'Done';
  },
  receiveSalary: async (id: string, key: string) => {
    if (key !== AdminKey) {
      return 'Không có quyền truy cập';
    }
    await prisma.salary.update({
      where: { id: Number(id) },
      data: { dateA: moment().toDate().toISOString() },
    });
    return 'Done';
  },
  manualCreateSalaryDate: async (command: string, key: string) => {
    if (key !== AdminKey) {
      return 'Không có quyền truy cập';
    }

    const [applyMonth, dateE, dateA] = command.split('-');
    if (!applyMonth || !dateE || !dateA) {
      return 'Thiếu thông tin';
    }
    await prisma.salary.create({
      data: {
        applyMonth,
        dateE: moment(dateE, 'YYYY/MM/DD').toDate().toISOString(),
        dateA: moment(dateA, 'YYYY/MM/DD').toDate().toISOString(),
      },
    });
    return 'Done';
  },
  manualUpdateSalaryDate: async (command: string, key: string) => {
    if (key !== AdminKey) {
      return 'Không có quyền truy cập';
    }

    const [id, dateE, dateA] = command.split('-');
    if (!id || !dateE) {
      return 'Thiếu thông tin';
    }
    await prisma.salary.update({
      where: { id: Number(id) },
      data: {
        dateE: moment(dateE, 'YYYY/MM/DD').toDate().toISOString(),
        dateA: dateA
          ? moment(dateA, 'YYYY/MM/DD').toDate().toISOString()
          : null,
      },
    });
    return 'Done';
  },
  cleanSalaryDate: async (command: string, key: string) => {
    if (key !== AdminKey) {
      return 'Không có quyền truy cập';
    }
    await prisma.salary.deleteMany();
    return 'Done';
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { crud, command, value } = req.body;

  if (!crud || !command || !value) {
    return res.status(200).json('Không tìm thấy lệnh này');
  }
  if (!(crud in commandHandlers)) {
    return res.status(200).json('Không tìm thấy lệnh này');
  }
  return res
    .status(200)
    .json(
      await commandHandlers[crud as keyof typeof commandHandlers](
        command,
        value
      )
    );
}
