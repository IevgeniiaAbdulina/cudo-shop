import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, Input, OnChanges, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Cart } from '../../../../core/cart/interfaces/cart';
import { CartApiService } from '../../../../core/cart/services/cart-api.service';
import { CartItemResponse, CartResponse } from '../../../cart/interfaces/cart-response';
import { CartService } from '../../../cart/services/cart.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [CommonModule, MatProgressSpinner],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss',
})
export class AddToCartButtonComponent implements OnChanges {
  private readonly destroyRef = inject(DestroyRef);
  private cart: Cart = {
    id: '',
    version: 0,
    lineItems: [],
  };
  private variantId: number = 1;
  public isDisabled = signal(false);
  public isLoading: WritableSignal<boolean> = signal(false);

  @Input() public productId: string = '';
  @Input() public productTitle: string = '';

  constructor(
    private cartApiService: CartApiService,
    public cartService: CartService,
  ) {}

  public ngOnChanges(): void {
    this.checkIfProductAlreadyAddedToCart();
  }

  public handleAddToCart(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      console.log('Product "%s" is adding to cart...', this.productTitle);
      this.updateCart();
    }
  }

  private updateCart(): void {
    this.isLoading.set(true);
    const customerId = this.cartService.customerIdentifier();

    if (!customerId) {
      if (this.productId) {
        this.cartService.handleAddLineItemToCart(this.productId).subscribe(() => {
          this.isLoading.set(false);
          this.isDisabled.set(true);
        });
      }
    } else {
      this.cartApiService
        .getCartByCustomerId(customerId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: CartResponse) => {
            const responseStr = JSON.stringify(response);
            const cartResponse: Cart = JSON.parse(responseStr);
            if (cartResponse) {
              this.cart.id = cartResponse.id;
              this.cart.version = cartResponse.version;
              this.addProductToCart();
              this.cartService.updateCartModel(response);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log('[updateCart error]', error.message);
            this.isLoading.set(false);
            this.handleError(error);
          },
        });
    }
  }

  private addProductToCart(): void {
    this.cartApiService
      .updateCartById(this.cart.id, this.cart.version, this.productId, this.variantId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: CartResponse) => {
          this.isDisabled.set(true);
          console.log('Product "%s" has been successfully added to your cart', this.productTitle);
          this.isLoading.set(false);
          this.cartService.updateCartModel(response);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.isLoading.set(false);
            alert(`Sorry, "${this.productTitle || 'specified product'}" can't be added to your cart. Please, contact support.`);
            console.warn(`Error adding product to cart.\n${error.error.message}`);
          } else {
            this.handleError(error);
          }
        },
      });
  }

  private checkIfProductAlreadyAddedToCart(): void {
    const isAdded = this.cartService.cart()?.lineItems.some((cli: CartItemResponse) => cli && this.productId === cli.productId) ?? false;
    this.isDisabled.set(isAdded);
  }

  private handleError(error: HttpErrorResponse): Error {
    if (error.status !== 404 && error.status !== 400) {
      console.error(`Backend returned code ${error.status}:`, error.error);
    }

    return new Error('Something went wrong; please try again later.');
  }
}
