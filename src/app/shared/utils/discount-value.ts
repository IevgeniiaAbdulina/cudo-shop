export const discountValue = (originalPrice: number, discountedPrice: number): number =>
  Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
