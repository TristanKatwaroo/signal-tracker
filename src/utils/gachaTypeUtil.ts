// src/utils/gachaTypeUtil.ts

export function getGachaTypeName(gachaType: number | string): string {
    // Convert to number if it's a string
    const type = typeof gachaType === 'string' ? parseInt(gachaType, 10) : gachaType;
  
    // Log for debugging
    console.log('Gacha type received:', gachaType, 'Converted type:', type);
  
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