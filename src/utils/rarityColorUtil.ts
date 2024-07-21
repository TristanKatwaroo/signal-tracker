// src/utils/rarityColorUtil.ts

export function getRarityColor(rarity: number | string): string {
  const rarityNumber = typeof rarity === 'string' ? parseInt(rarity, 10) : rarity;

  switch (rarityNumber) {
    case 2:
      return 'text-blue-500';
    case 3:
      return 'text-purple-500';
    case 4:
      return 'text-orange-500';
    default:
      return 'text-gray-500'; // Default color for unknown rarity
  }
}