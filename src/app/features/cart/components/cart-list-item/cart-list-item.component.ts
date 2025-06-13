import { Component, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { CurrencyPipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItemResponse } from '../../interfaces/cart-response';
import { CartItemModel } from '../../model/cart-item-model';
import { discountValue } from '../../../../shared/utils/discount-value';

@Component({
  selector: 'app-cart-list-item',
  imports: [ButtonComponent, NgOptimizedImage, RouterLink, CurrencyPipe, DecimalPipe],
  templateUrl: './cart-list-item.component.html',
  styleUrl: './cart-list-item.component.scss',
})
export class CartListItemComponent implements OnInit {
  protected readonly discountValue = discountValue;
  public count: WritableSignal<number> = signal(1);
  public cartItem: InputSignal<CartItemResponse | undefined> = input<CartItemResponse>();
  public item: WritableSignal<CartItemModel | undefined> = signal<CartItemModel | undefined>(undefined);

  public ngOnInit(): void {
    if (this.cartItem()) {
      const itemResponse: CartItemResponse = this.cartItem()!;

      console.log('[cart item] price ', itemResponse.price.discounted?.value.centAmount);
      this.item.set(
        new CartItemModel(
          itemResponse.productId,
          itemResponse.productKey,
          itemResponse.name['en-US'],
          itemResponse.variant.images[0].url,
          itemResponse.price.value.currencyCode,
          itemResponse.price.value.centAmount,
          itemResponse.quantity,
          itemResponse.totalPrice.centAmount,
          itemResponse.price.discounted?.value.centAmount,
        ),
      );

      this.count.set(itemResponse.quantity);
    }
  }

  public removeCartItem(itemId: string | undefined) {
    if (itemId) {
      console.log('[cart list item] remove item id: ', itemId);
    }
  }

  public increment(): void {
    if (this.count() < 100) {
      this.count.set(this.count() + 1);
    }

    return;
  }

  public decrement(key: string | undefined): void {
    if (this.count() > 1) {
      this.count.set(this.count() - 1);
    } else {
      this.removeCartItem(key);
    }
  }
}
