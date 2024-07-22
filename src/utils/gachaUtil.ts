// src/utils/gachaUtil.ts

export function getMaxPity(gachaType: number | string): number {
    const type = typeof gachaType === 'string' ? parseInt(gachaType, 10) : gachaType;
  
    switch (type) {
      case 1:
      case 1001:
        return 90;
      case 2:
      case 2001:
        return 90;
      case 3:
      case 3001:
        return 80;
      case 5:
      case 5001:
        return 80;
      default:
        return 90;
    }
  }
  