import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, effect, inject, Input, OnChanges, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Cart } from '../../../../core/cart/interfaces/cart';
import { CartApiService } from '../../../../core/cart/services/cart-api.service';
import { CartResponse } from '../../../cart/interfaces/cart-response';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-remove-from-cart-button',
  imports: [],
  templateUrl: './remove-from-cart-button.component.html',
  styleUrls: ['../add-to-cart-button/add-to-cart-button.component.scss', './remove-from-cart-button.component.scss'],
})
export class RemoveFromCartButtonComponent implements OnChanges {
  private readonly destroyRef = inject(DestroyRef);
  private cart: Cart = CartService.initialCart;
  private lineItemId: string = '';
  public isShown = signal(false);

  @Input() public productId: string = '';
  @Input() public productTitle: string = '';

  constructor(
    private cartService: CartService,
    private cartApiService: CartApiService,
  ) {
    effect(() => {
      if (this.cartService.cartItemsCount()) {
        this.checkIfProductAlreadyAddedToCart();
      }
    });
  }

  public ngOnChanges(): void {
    this.checkIfProductAlreadyAddedToCart();
  }

  public handleRemoveFromCart(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      console.log('Product "%s" is removing from cart...', this.productTitle);
      this.updateCart();
    }
  }

  private updateCart(): void {
    this.cartApiService
      .getMyActiveCart()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: CartResponse) => {
          const responseStr = JSON.stringify(response);
          const cartResponse: Cart = JSON.parse(responseStr);
          if (cartResponse) {
            this.cart.id = cartResponse.id;
            this.cart.version = cartResponse.version;
            this.removeProductFromCart();
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.cart = this.cartService.cart() || CartService.initialCart;
            this.removeProductFromCart();
          } else {
            console.warn('[updateCart error]', error.message);
          }
        },
      });
  }

  private removeProductFromCart(): void {
    this.cartApiService
      .updateCartByIdRemove(this.cart.id, this.cart.version, this.lineItemId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: CartResponse) => {
          this.isShown.set(false);
          this.cartService.updateCartModel(response);
          console.log('Product "%s" has been successfully removed from your cart', this.productTitle);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert(`Sorry, "${this.productTitle || 'specified product'}" can't be removed from your cart. Please, contact support.`);
            console.warn(`Error adding product to cart.\n${error.error.message}`);
          } else {
            this.handleError(error);
          }
        },
      });
  }

  private checkIfProductAlreadyAddedToCart(): void {
    this.lineItemId = this.cartService.cart()?.lineItems.find((cli) => this.productId === cli.productId)?.id || '';
    this.isShown.set(!!this.lineItemId);
  }

  private handleError(error: HttpErrorResponse): Error {
    if (error.status !== 404 && error.status !== 400) {
      console.error(`Backend returned code ${error.status}:`, error.error);
    }

    return new Error('Something went wrong; please try again later.');
  }
}
