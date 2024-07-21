// src/utils/gachaTypeUtil.ts

export function getGachaTypeName(gachaType: number | string | null): string {
  if (gachaType === null) return 'Unknown';
  
  const type = typeof gachaType === 'string' ? parseInt(gachaType, 10) : gachaType;
  
  switch (type) {
    case 1:
    case 1001:
      return 'Standard';
    case 2:
    case 2001:
      return 'Exclusive';
    case 3:
    case 3001:
      return 'W-Engine';
    case 5:
    case 5001:
      return 'Exclusive';
    default:
      console.log('Unknown gacha type:', type);
      return 'Unknown';
  }
}

export function calculatePity(signals: any[], rank: number): number {
  let pullsSinceLastRank = 0;
  for (let i = signals.length - 1; i >= 0; i--) {
    pullsSinceLastRank++;
    if (signals[i].rank_type === rank) break;
  }
  return pullsSinceLastRank;
}
