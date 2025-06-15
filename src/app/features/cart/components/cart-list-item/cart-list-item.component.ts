import { Component, effect, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItemResponse } from '../../interfaces/cart-response';
import { CartItemModel } from '../../model/cart-item-model';
import { discountValue } from '../../../../shared/utils/discount-value';

@Component({
  selector: 'app-cart-list-item',
  imports: [ButtonComponent, NgOptimizedImage, RouterLink, DecimalPipe],
  templateUrl: './cart-list-item.component.html',
  styleUrl: './cart-list-item.component.scss',
})
export class CartListItemComponent {
  protected readonly discountValue = discountValue;
  public cartItem: InputSignal<CartItemResponse | undefined> = input<CartItemResponse>();
  public itemModel: CartItemModel | null = null;

  public incrementItem: OutputEmitterRef<string | undefined> = output<string | undefined>();
  public decrementItem: OutputEmitterRef<string | undefined> = output<string | undefined>();

  constructor() {
    effect(() => {
      if (this.cartItem()) {
        const item: CartItemResponse = this.cartItem()!;

        this.itemModel = new CartItemModel(
          item.productId,
          item.productKey,
          item.name['en-US'],
          item.variant.images[0].url,
          item.price.value.currencyCode,
          item.price.value.centAmount,
          item.quantity,
          item.totalPrice.centAmount,
          item.price.discounted?.value.centAmount,
        );
      }
    });
  }
}
