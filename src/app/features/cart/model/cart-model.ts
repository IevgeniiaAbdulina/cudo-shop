import { CartItemResponse, TotalPrice } from '../interfaces/cart-response';

export class CartModel {
  constructor(
    public version: number,
    public id: string,
    public lineItems: CartItemResponse[],
    public totalPrice: TotalPrice,
    public totalItemQuantity: number,
  ) {}

  public printableTotalPrice(): string {
    const result = this.totalPrice.centAmount / 100;

    return result.toString();
  }

  public currencyCode(): string {
    return this.totalPrice.currencyCode;
  }
}
