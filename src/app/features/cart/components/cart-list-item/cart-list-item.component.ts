import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-list-item',
  imports: [ButtonComponent, NgOptimizedImage, RouterLink],
  templateUrl: './cart-list-item.component.html',
  styleUrl: './cart-list-item.component.scss',
})
export class CartListItemComponent {
  public count: WritableSignal<number> = signal(1);

  public cartItem: InputSignal<
    | {
        key: string;
        title: string;
        image: string;
      }
    | undefined
  > = input<
    | {
        key: string;
        title: string;
        image: string;
      }
    | undefined
  >();

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
