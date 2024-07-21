// src/utils/rankTypeUtil.ts

export function getRankTypeName(rankType: number | string): string {
    const rank = typeof rankType === 'string' ? parseInt(rankType, 10) : rankType;
  
    switch (rank) {
      case 2:
        return 'B-Rank';
      case 3:
        return 'A-Rank';
      case 4:
        return 'S-Rank';
      default:
        return 'Unknown';
    }
  }
  