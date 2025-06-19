export class CartItemModel {
  constructor(
    public id: string,
    public key: string,
    public name: string,
    public image: string,
    public currencyCode: string,
    public originalPrice: number,
    public quantity: number,
    public totalPrice: number,
    public discountedPrice?: number,
  ) {}

  public printableTotalPrice(): number {
    return this.totalPrice / 100;
  }

  public printableOriginalPrice(): number {
    return this.originalPrice / 100;
  }

  public originalPriceByQuantity(): number {
    return this.printableOriginalPrice() * this.quantity;
  }
}
