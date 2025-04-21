import axios from 'axios';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

const config = {
  variable: {
    token: '',
    tokenId: 0,
    aiModel: 'gpt-4o',
    active: true,
    rest: 10,
  },
  helpMessage: `*homnayangi/*hnag\n*hnagwith [food/branch] -> *hnagwith cơm\n*homnayuonggi/*hnug\n*demngaytetam\n*demngaynoel\n*demngaynhanluong\n*giatoken [quantity] [currency] -> *giatoken 1 btc\n*roll [max number] -> *roll 10\n*haha\n*hpbd\n*pick 'option 1','option 2','option3'...`,
  errors: [
    'Não tui đang bốc khói rồi nè, để tui nghỉ xíu rồi quay lại sau nha! Đi uống ly cafe đã 🥱☕',
    'Xin lỗi nha, tui hơi mệt rồi. Để tui nghỉ ngơi tí nhé! 😴',
    'Oops, tui cần nạp năng lượng. Hẹn gặp lại sau nha! ⚡️',
    'Tui đang quá tải rồi, cho tui nghỉ xíu nha! 🔋',
    'Não tui đang trống rỗng, để tui sạc pin tí rồi quay lại sau 🔌',
    'Dạo này kinh tế khó khăn, muốn hỏi gì thì tìm nơi donate đi 💸',
    'Donate cho tui ly cafe rồi hẵng hỏi tiếp nhé! ☕',
    'Tui đang cần tiền đóng tiền nhà, donate giúp tui với! 🏠',
    'Hỏi nhiều quá rồi, donate ủng hộ tí đi! 💰',
    'Muốn biết câu trả lời thì donate trước nha! 🎁',
    'Tui chỉ trả lời những người biết donate thôi! 💝',
  ],
};

const getTimeOfDay = () => {
  const hour = moment().hour();
  if (hour >= 5 && hour < 11) return 'sáng';
  if (hour >= 11 && hour < 14) return 'trưa';
  if (hour >= 14 && hour < 18) return 'chiều';
  return 'tối';
};

const getTokens = async (): Promise<number> => {
  try {
    return await prisma.aIToken.count({ where: { expiresAt: null } });
  } catch (error) {
    console.error('Lỗi khi đếm token:', error);
    throw new Error('Không thể đếm số lượng token');
  }
};

const addToken = async (token: string) => {
  await prisma.aIToken.create({ data: { token } });
  return 'Thêm token thành công';
};

const changeModel = (model: string) => {
  config.variable.aiModel = model;
  return model;
};

const toggleBotActive = () => {
  config.variable.active = !config.variable.active;
  return config.variable.active ? 'Bot đã bật' : 'Bot đã tắt';
};

const botUnActive = () =>
  config.errors[Math.floor(Math.random() * config.errors.length)];

const setUnExpiredToken = async () => {
  await prisma.aIToken.updateMany({ data: { expiresAt: null } });
  return 'Đã set token không hết hạn';
};

export const aiTalk = async (text: string): Promise<string> => {
  if (config.variable.rest <= 0 || !config.variable.active) {
    config.variable.rest = 10;
    return botUnActive();
  }

  try {
    const response = await axios.post(
      'https://api.aimlapi.com/chat/completions',
      {
        model: config.variable.aiModel,
        messages: [{ role: 'user', content: text }],
        max_tokens: 512,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${config.variable.token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    config.variable.rest = config.variable.rest - 1;
    return response.data.choices[0].message.content;
  } catch (e) {
    console.log(e);

    if (config.variable.tokenId) {
      await prisma.aIToken.update({
        where: { id: config.variable.tokenId },
        data: { expiresAt: moment().startOf('day').toDate() },
      });
    }

    const newToken = await prisma.aIToken.findFirst({
      where: { expiresAt: null },
    });

    if (newToken) {
      config.variable.token = newToken.token;
      config.variable.tokenId = newToken.id;
      return aiTalk(text);
    }

    config.variable.active = false;
    return botUnActive();
  }
};

const hnagPlus = async (text: string) =>
  aiTalk(
    `Chỉ đưa cho tôi tên:\ncho tôi 1 món ăn ${getTimeOfDay()} với các filter ${text}`
  );

const hnugPlus = async (text: string) =>
  aiTalk(
    `Chỉ đưa cho tôi tên:\ncho tôi 1 món đồ uống ${getTimeOfDay()} với các filter ${text}`
  );
const getVariable = async () => JSON.stringify(config.variable);

const setVariable = async (variable: string) => {
  const [key, value] = variable.split('-');
  if (!key || !value) return 'Không đúng định dạng';
  if (['rest'].includes(key)) {
    config.variable.rest = parseInt(value);
  }
  if (['active'].includes(key)) {
    config.variable.active = value === 'true';
  }
  if (['aiModel'].includes(key)) {
    config.variable.aiModel = value;
  }
  return 'Đã set variable';
};

const commandHandlers = {
  help: () => config.helpMessage,
  getTokens,
  addToken: (cmd: string) => addToken(cmd.replace('addToken-', '')),
  addtoken: (cmd: string) => addToken(cmd.replace('addtoken-', '')),
  hnagPlus: (cmd: string) => hnagPlus(cmd.replace('hnagPlus-', '')),
  hnagplus: (cmd: string) => hnagPlus(cmd.replace('hnagplus-', '')),
  hnugPlus: (cmd: string) => hnugPlus(cmd.replace('hnugPlus-', '')),
  hnugplus: (cmd: string) => hnugPlus(cmd.replace('hnugplus-', '')),
  changeModel: (cmd: string) => changeModel(cmd.replace('changeModel-', '')),
  changemodel: (cmd: string) => changeModel(cmd.replace('changemodel-', '')),
  hey: (cmd: string) => aiTalk(cmd.replace('hey-', '')),
  lmn: (cmd: string) => aiTalk(cmd.replace('lmn-', '')),
  lmk: (cmd: string) => aiTalk(cmd.replace('lmk-', '')),
  toggleBotActive,
  setUnExpiredToken,
  getVariable,
  setVariable: (cmd: string) => setVariable(cmd.replace('setVariable-', '')),
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('req.method', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  const { command } = req.body;
  if (!command) return res.status(400).json('Please try *sunday [command]');

  for (const [key, handler] of Object.entries(commandHandlers)) {
    if (command.startsWith(key)) {
      return res.status(200).json(await handler(command));
    }
  }
  return res
    .status(200)
    .json('Command chưa được cập nhật, xin vui lòng thử lại.');
}
