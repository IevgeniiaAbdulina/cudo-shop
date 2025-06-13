import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Cart } from '../../../../core/cart/interfaces/cart';
import { CartApiService } from '../../../../core/cart/services/cart-api.service';
import { ProductProjection } from '../../../../core/product/interfaces/product-projection';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [CommonModule],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss',
})
export class AddToCartButtonComponent {
  private readonly destroyRef = inject(DestroyRef);
  private cartId: string = '';
  private cartVersion: number = 0;
  private productId: string = '';
  private variantId: number = 1;

  @Input() public text: string = '';
  @Input() public productTitle: string = '';
  @Input() public isDisabled: boolean = false;
  @Input() public product: ProductProjection | null = null;

  constructor(private cartApiService: CartApiService) {}

  public handleAddToCart(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      console.log('Product "%s" is adding to cart...', this.productTitle);
      this.updateCart();
    }
  }

  private updateCart(): void {
    this.cartApiService
      .getCartByCustomerId(this.getCustomerId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: unknown) => {
          console.log('[updateCart process]', this.cartId, this.cartVersion, response);
          const responseStr = JSON.stringify(response);
          const cartResponse: Cart = JSON.parse(responseStr);
          if (cartResponse) {
            this.cartId = cartResponse.id;
            this.cartVersion = cartResponse.version;
            this.addProductToCart();
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log('[updateCart error]', error.message);
          // Handle unexpected errors
          this.handleError(error);
        },
      });
  }

  private addProductToCart(): void {
    if (this.product) {
      this.productId = this.product.id;
    }
    this.cartApiService
      .updateCartById(this.cartId, this.cartVersion, this.productId, this.variantId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isDisabled = true; // TODO
          console.log('Product %s added to cart successfully', this.productTitle); // TODO
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert(`Sorry, "${this.productTitle}" can't be added to you cart. Please, contact support.`);
            console.warn(`Error adding product to cart.\n${error.error.message}`);
          } else {
            this.handleError(error);
          }
        },
      });
  }

  private getCustomerId(): string {
    return '3740b429-a77a-45b2-831b-236003228369'; // TODO
  }

  private handleError(error: HttpErrorResponse): Error {
    if (error.status !== 404 && error.status !== 400) {
      console.error(`Backend returned code ${error.status}:`, error.error);
    }

    return new Error('Something went wrong; please try again later.');
  }
}
