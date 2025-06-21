import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, Input, OnChanges, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { StorageService } from '../../../../core/auth/storage.service';
import { Cart } from '../../../../core/cart/interfaces/cart';
import { CartApiService } from '../../../../core/cart/services/cart-api.service';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [CommonModule],
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

  @Input() public productId: string = '';
  @Input() public productTitle: string = '';

  constructor(
    private cartApiService: CartApiService,
    private storageService: StorageService,
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
    const customerId = this.storageService.getCustomerId();

    if (!customerId) {
      if (this.product) {
        console.log('[handleAddLineItemToCart MY cart service]');
        this.cartService.handleAddLineItemToCart(this.product);
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
              console.log('[updateCart] updateCartModel');

              this.cartService.updateCartModel(response);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log('[updateCart error]', error.message);
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

          console.log('[add to cart button >> where cart is updated] addProductToCart');
          this.cartService.updateCartModel(response);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert(`Sorry, "${this.productTitle || 'specified product'}" can't be added to your cart. Please, contact support.`);
            console.warn(`Error adding product to cart.\n${error.error.message}`);
          } else {
            this.handleError(error);
          }
        },
      });
  }

  private checkIfProductAlreadyAddedToCart(): void {
    const customerId = this.storageService.getCustomerId();

    if (this.productId && customerId) {
      this.cartApiService
        .getCartByCustomerId(customerId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: unknown) => {
            const responseStr = JSON.stringify(response);
            const cartResponse: Cart = JSON.parse(responseStr);
            const isAdded =
              cartResponse &&
              cartResponse.lineItems.length > 0 &&
              cartResponse.lineItems.some((cli) => cli && this.productId === cli.productId);
            this.isDisabled.set(isAdded);
          },
          error: (error: HttpErrorResponse) => {
            console.warn('Customer does not have a Cart yet', error.message);
          },
        });
    } else {
      this.isDisabled.set(false);
    }
  }

  private handleError(error: HttpErrorResponse): Error {
    if (error.status !== 404 && error.status !== 400) {
      console.error(`Backend returned code ${error.status}:`, error.error);
    }

    return new Error('Something went wrong; please try again later.');
  }
}
