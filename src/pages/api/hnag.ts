import type { NextApiRequest, NextApiResponse } from 'next';

export const locations = {
  hanoi: ['Hà Nội', 'ha noi', 'hà nội', 'hanoi', 'hn'],
  hochiminh: ['Hồ Chí Minh', 'ho chi minh', 'hcm', 'hcmc', 'hcm'],
  saigon: ['Sài Gòn', 'sai gon', 'sg', 'saigon', 'sg'],
  danang: ['Đà Nẵng', 'da nang', 'dn', 'danang', 'dn'],
  vinh: ['Vinh', 'vinh'],
  quynhon: ['Quy Nhơn', 'quynhon', 'qn'],
};

export const foods = [
  {
    id: 1,
    name: 'Phở bò',
    tags: [
      'món nước',
      'đói bụng',
      'sợi',
      'nóng',
      'truyền thống',
      ...locations.hanoi,
    ],
    description: 'Phở bò với nước dùng ngọt thanh, thịt bò mềm',
  },
  {
    id: 2,
    name: 'Cơm tấm',
    tags: [
      'món khô',
      'cơm',
      'đói',
      'sườn nướng',
      ...locations.hanoi,
      ...locations.hochiminh,
      ...locations.saigon,
    ],
    description: 'Cơm với sườn nướng, bì, chả trứng',
  },
  {
    id: 3,
    name: 'Bún chả',
    tags: ['món nước', 'bún', 'thịt nướng', 'nước mắm', ...locations.hanoi],
    description: 'Bún với thịt lợn nướng và nước chấm đặc trưng',
  },
  {
    id: 4,
    name: 'Bánh mì',
    tags: [
      'món khô',
      'bánh mì',
      'nhanh',
      'tiện lợi',
      ...locations.hanoi,
      ...locations.danang,
      ...locations.hochiminh,
      ...locations.saigon,
      ...locations.vinh,
      ...locations.quynhon,
    ],
    description: 'Bánh mì giòn với nhiều loại nhân khác nhau',
  },
  {
    id: 5,
    name: 'Gỏi cuốn',
    tags: [
      'món khô',
      'cuốn',
      'tươi',
      'healthy',
      ...locations.hanoi,
      ...locations.hochiminh,
      ...locations.saigon,
    ],
    description: 'Cuốn với tôm, thịt, rau sống và bún',
  },
  {
    id: 6,
    name: 'Bún bò Huế',
    tags: ['món nước', 'cay', 'bò', 'bún', ...locations.quynhon],
    description: 'Bún bò cay nồng đặc trưng của Huế',
  },
  {
    id: 7,
    name: 'Bánh xèo',
    tags: [
      'món khô',
      'bánh',
      'giòn',
      'tôm thịt',
      ...locations.hanoi,
      ...locations.danang,
    ],
    description: 'Bánh xèo giòn với nhân tôm thịt và rau sống',
  },
  {
    id: 8,
    name: 'Cháo lòng',
    tags: ['món nước', 'cháo', 'lòng', 'ấm bụng', ...locations.hanoi],
    description: 'Cháo nóng với các loại lòng heo',
  },
  {
    id: 9,
    name: 'Bún đậu mắm tôm',
    tags: [
      'món khô',
      'bún',
      'đậu',
      'mắm tôm',
      ...locations.hanoi,
      ...locations.hochiminh,
      ...locations.saigon,
    ],
    description: 'Bún với đậu rán và mắm tôm đặc trưng',
  },
  {
    id: 10,
    name: 'Hủ tiếu',
    tags: [
      'món nước',
      'hủ tiếu',
      'thịt',
      'tôm',
      ...locations.hanoi,
      ...locations.hochiminh,
      ...locations.saigon,
    ],
    description: 'Hủ tiếu với nước dùng trong và nhiều loại thịt',
  },
  {
    id: 11,
    name: 'Bún riêu cua',
    tags: [
      'món nước',
      'bún',
      'cua',
      'cà chua',
      ...locations.hanoi,
      ...locations.hochiminh,
      ...locations.saigon,
    ],
    description: 'Bún với nước dùng cua và riêu cua thơm ngon',
  },
  {
    id: 12,
    name: 'Bánh cuốn',
    tags: ['món khô', 'bánh', 'hấp', 'nhẹ nhàng', ...locations.hanoi],
    description: 'Bánh cuốn mỏng với nhân thịt và nấm',
  },
  {
    id: 13,
    name: 'Cơm gà',
    tags: [
      'món khô',
      'cơm',
      'gà',
      'đơn giản',
      ...locations.hanoi,
      ...locations.hochiminh,
      ...locations.saigon,
      ...locations.vinh,
    ],
    description: 'Cơm với gà luộc hoặc gà xé phay',
  },
  {
    id: 14,
    name: 'Mì Quảng',
    tags: ['món nước', 'mì', 'đặc sản', 'Quảng Nam', ...locations.quynhon],
    description: 'Mì với nước dùng đặc, tôm thịt và bánh tráng',
  },
  {
    id: 15,
    name: 'Chả cá Lã Vọng',
    tags: ['món khô', 'cá', 'thì là', 'Hà Nội', ...locations.hanoi],
    description: 'Cá chiên với thì là và hành, ăn kèm bún',
  },
  {
    id: 16,
    name: 'Bò kho',
    tags: ['món nước', 'bò', 'kho', 'bánh mì', ...locations.hanoi],
    description: 'Bò kho đậm đà, ăn với bánh mì hoặc hủ tiếu',
  },
  {
    id: 17,
    name: 'Cơm niêu',
    tags: [
      'món khô',
      'cơm',
      'niêu đất',
      'cháy',
      ...locations.hanoi,
      ...locations.hochiminh,
      ...locations.saigon,
    ],
    description: 'Cơm nấu trong niêu đất, có lớp cơm cháy giòn',
  },
  {
    id: 18,
    name: 'Canh chua',
    tags: ['món nước', 'canh', 'chua', 'cá', ...locations.hanoi],
    description: 'Canh chua với cá, dứa, đậu bắp và rau thơm',
  },
  {
    id: 19,
    name: 'Bánh canh',
    tags: ['món nước', 'bánh canh', 'bột gạo', 'cua', ...locations.hanoi],
    description: 'Bánh canh với nước dùng đặc và nhiều loại nhân',
  },
  {
    id: 20,
    name: 'Gỏi gà',
    tags: ['món khô', 'gỏi', 'gà', 'rau sống', ...locations.hanoi],
    description: 'Gỏi gà trộn với rau sống và nước mắm chua ngọt',
  },
  {
    id: 21,
    name: 'Lẩu thái',
    tags: ['món nước', 'lẩu', 'cay', 'hải sản', ...locations.hanoi],
    description: 'Lẩu chua cay kiểu Thái với hải sản và rau',
  },
  {
    id: 22,
    name: 'Bún cá',
    tags: ['món nước', 'bún', 'cá', 'dọc mùng', ...locations.hanoi],
    description: 'Bún với cá chiên hoặc nướng, dọc mùng và nước dùng chua ngọt',
  },
  {
    id: 23,
    name: 'Cơm rang dưa bò',
    tags: ['món khô', 'cơm rang', 'dưa chua', 'bò', ...locations.hanoi],
    description: 'Cơm rang với dưa chua và thịt bò xào',
  },
  {
    id: 24,
    name: 'Bánh bèo',
    tags: ['món khô', 'bánh', 'tôm khô', 'Huế', ...locations.quynhon],
    description: 'Bánh bèo nhỏ với nhân tôm khô và hành phi',
  },
  {
    id: 25,
    name: 'Cháo gà',
    tags: ['món nước', 'cháo', 'gà', 'ấm bụng', ...locations.hanoi],
    description: 'Cháo nấu với gà, thêm hành phi và gừng',
  },
  {
    id: 26,
    name: 'Nem nướng',
    tags: [
      'món khô',
      'nem',
      'nướng',
      'cuốn',
      ...locations.hanoi,
      ...locations.hochiminh,
      ...locations.saigon,
      ...locations.vinh,
      ...locations.quynhon,
      ...locations.danang,
    ],
    description: 'Nem nướng cuốn với bánh tráng và rau sống',
  },
  {
    id: 27,
    name: 'Bún mắm',
    tags: ['món nước', 'bún', 'mắm', 'miền Tây', ...locations.hanoi],
    description: 'Bún với nước dùng mắm, hải sản và thịt',
  },
  {
    id: 28,
    name: 'Cơm cháy chà bông',
    tags: ['món khô', 'cơm cháy', 'chà bông', 'ăn vặt', ...locations.hanoi],
    description: 'Cơm cháy giòn phủ chà bông và mayonnaise',
  },
  {
    id: 29,
    name: 'Bún ốc',
    tags: ['món nước', 'bún', 'ốc', 'chua cay', ...locations.hanoi],
    description: 'Bún với ốc và nước dùng chua cay',
  },
  {
    id: 30,
    name: 'Cơm lam',
    tags: ['món khô', 'cơm', 'tre', 'Tây Bắc', ...locations.hanoi],
    description: 'Cơm nếp nấu trong ống tre, thường ăn với gà nướng',
  },
  {
    id: 31,
    name: 'Mì xào hải sản',
    tags: ['món khô', 'mì', 'hải sản', 'xào', ...locations.hanoi],
    description: 'Mì xào với các loại hải sản tươi',
  },
  {
    id: 32,
    name: 'Cơm gà Hải Nam',
    tags: ['món khô', 'cơm', 'gà', 'Hải Nam', ...locations.hanoi],
    description: 'Cơm nấu với nước luộc gà, ăn kèm gà luộc',
  },
  {
    id: 33,
    name: 'Bánh tráng trộn',
    tags: ['món khô', 'bánh tráng', 'trộn', 'ăn vặt', ...locations.hanoi],
    description: 'Bánh tráng trộn với đủ loại gia vị và phụ gia',
  },
  {
    id: 34,
    name: 'Cháo vịt',
    tags: ['cháo', 'vịt', 'gừng', ...locations.hanoi],
    description: 'Cháo nấu với vịt, ăn kèm gừng và hành phi',
  },
  {
    id: 35,
    name: 'Bún thịt nướng',
    tags: ['bún', 'thịt nướng', 'nem', ...locations.hanoi],
    description: 'Bún với thịt heo nướng, nem, rau sống và nước mắm',
  },
  {
    id: 36,
    name: 'Cơm chiên dương châu',
    tags: [
      'cơm chiên',
      'xúc xích',
      'trứng',
      ...locations.hanoi,
      ...locations.hochiminh,
      ...locations.saigon,
    ],
    description: 'Cơm chiên với xúc xích, trứng, đậu Hà Lan và các loại rau củ',
  },
  {
    id: 37,
    name: 'Bánh đa cua',
    tags: ['bánh đa', 'cua', 'Hải Phòng', ...locations.hanoi],
    description: 'Bánh đa với nước dùng cua đặc trưng Hải Phòng',
  },
  {
    id: 38,
    name: 'Gà nướng',
    tags: ['gà', 'nướng', 'bia', ...locations.hanoi],
    description: 'Gà nướng nguyên con hoặc từng phần, ăn kèm muối ớt',
  },
  {
    id: 39,
    name: 'Súp cua',
    tags: ['súp', 'cua', 'trứng', ...locations.hanoi],
    description: 'Súp cua đặc với thịt cua và trứng',
  },
  {
    id: 40,
    name: 'Bánh mì chảo',
    tags: [
      'bánh mì',
      'trứng',
      'pate',
      ...locations.hanoi,
      ...locations.saigon,
      ...locations.danang,
    ],
    description:
      'Bánh mì nướng giòn ăn kèm với trứng, pate và các loại topping',
  },
  {
    id: 41,
    name: 'Lẩu cá kèo',
    tags: ['lẩu', 'cá kèo', 'miền Tây', ...locations.hanoi],
    description: 'Lẩu nấu với cá kèo, rau đắng và các loại rau khác',
  },
  {
    id: 42,
    name: 'Xôi xéo',
    tags: ['xôi', 'đậu xanh', 'hành phi', ...locations.hanoi],
    description: 'Xôi nếp với đậu xanh xay nhuyễn và hành phi',
  },
  {
    id: 43,
    name: 'Bún sườn chua',
    tags: ['bún', 'sườn', 'chua', ...locations.hanoi],
    description: 'Bún với nước dùng chua ngọt và sườn non',
  },
  {
    id: 44,
    name: 'Cơm sườn',
    tags: ['cơm', 'sườn', 'đơn giản', ...locations.hanoi],
    description: 'Cơm với sườn nướng hoặc ram, ăn kèm dưa chua',
  },
  {
    id: 45,
    name: 'Bánh căn',
    tags: ['bánh', 'bột gạo', 'Đà Lạt', ...locations.danang],
    description: 'Bánh nhỏ làm từ bột gạo, ăn kèm với nước mắm pha',
  },
  {
    id: 46,
    name: 'Cá kho tộ',
    tags: ['cá', 'kho', 'tộ đất', ...locations.hanoi],
    description: 'Cá kho trong tộ đất với nước mắm và thịt ba chỉ',
  },
  {
    id: 47,
    name: 'Bún mọc',
    tags: ['bún', 'mọc', 'sườn', ...locations.hanoi],
    description: 'Bún với nước dùng trong và các loại mọc, sườn',
  },
  {
    id: 48,
    name: 'Cơm cháy kho quẹt',
    tags: ['cơm cháy', 'kho quẹt', 'ăn vặt', ...locations.hanoi],
    description: 'Cơm cháy giòn ăn với nước kho quẹt đậm đà',
  },
  {
    id: 49,
    name: 'Bún ốc nguội',
    tags: ['bún', 'ốc', 'Hà Nội', ...locations.hanoi],
    description: 'Bún trộn với ốc luộc và nước mắm chua ngọt',
  },
  {
    id: 50,
    name: 'Cơm hến',
    tags: ['cơm', 'hến', 'Huế', ...locations.quynhon],
    description: 'Cơm trộn với hến, rau sống và nước mắm',
  },
  {
    id: 51,
    name: 'Phở gà',
    tags: ['phở', 'gà', 'truyền thống', ...locations.hanoi],
    description: 'Phở với nước dùng gà và thịt gà',
  },
  {
    id: 52,
    name: 'Bánh khọt',
    tags: ['bánh', 'tôm', 'Vũng Tàu', ...locations.hanoi],
    description: 'Bánh nhỏ giòn với nhân tôm, ăn kèm rau sống',
  },
  {
    id: 53,
    name: 'Cháo trai',
    tags: ['cháo', 'trai', 'gừng', ...locations.hanoi],
    description: 'Cháo nấu với thịt trai và gừng',
  },
];
export const normalize = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { search } = req.body;

  if (!search) {
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    return res.status(200).json(randomFood.name);
  }

  const normalizedSearch = normalize(search);
  const filteredFoods = foods.filter(food => {
    const normalizedName = normalize(food.name);
    const normalizedDesc = normalize(food.description);
    const normalizedTags = food.tags.map(tag => normalize(tag));

    return (
      normalizedName.includes(normalizedSearch) ||
      normalizedDesc.includes(normalizedSearch) ||
      normalizedTags.some(tag => tag.includes(normalizedSearch))
    );
  });

  if (filteredFoods.length === 0) {
    return res.status(404).json({ message: 'No matching food found' });
  }

  const randomFilteredFood =
    filteredFoods[Math.floor(Math.random() * filteredFoods.length)];
  res.status(200).json(randomFilteredFood.name);
}
