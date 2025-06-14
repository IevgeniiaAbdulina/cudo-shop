import { CartItemResponse, TotalPrice } from '../interfaces/cart-response';
import { calculateDiscount } from '../../../shared/utils/calculate-discount';

export class CartModel {
  constructor(
    public version: number,
    public id: string,
    public lineItems: CartItemResponse[],
    public totalPrice: TotalPrice,
    public totalItemQuantity: number,
  ) {}

  public printableTotalPrice(): number {
    return this.totalPrice.centAmount / 100;
  }

  public currencyCode(): string {
    return this.totalPrice.currencyCode;
  }

  public getShopDiscount(): number {
    let discount: number = 0;

    this.lineItems
      .filter((lineItem: CartItemResponse) => lineItem.price.discounted)
      .forEach((lineItem: CartItemResponse) => {
        const originalPrice: number = lineItem.price.value.centAmount;
        const discountedPrice: number = lineItem.price.discounted?.value.centAmount ?? 0;
        const quantity: number = lineItem.quantity;

        discount += calculateDiscount(originalPrice, discountedPrice, quantity);
      });

    return discount / 100;
  }

  public getItemsTotalPrice(): number {
    let totalOriginalPrice = 0;

    this.lineItems.forEach((lineItem) => {
      const originalPrice: number = lineItem.price.value.centAmount;
      const quantity: number = lineItem.quantity;

      totalOriginalPrice += originalPrice * quantity;
    });

    return totalOriginalPrice / 100;
  }
}
