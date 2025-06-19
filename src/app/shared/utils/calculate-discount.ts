export const calculateDiscount = (originalPrice: number, discountedPrice: number, quantity: number): number => {
  const totalOriginalPrice = originalPrice * quantity;
  const totalDiscountedPrice = discountedPrice * quantity;

  return totalOriginalPrice - totalDiscountedPrice;
};
