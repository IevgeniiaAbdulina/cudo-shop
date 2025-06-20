import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, Input, OnChanges, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { StorageService } from '../../../../core/auth/storage.service';
import { Cart } from '../../../../core/cart/interfaces/cart';
import { CartApiService } from '../../../../core/cart/services/cart-api.service';
import { CartStateService } from '../../../../core/cart/services/cart-state.service';
import { ProductProjection } from '../../../../core/product/interfaces/product-projection';
import { ProductProjectionsHelperService } from '../../../../core/product/services/product-projections.helper.service';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [CommonModule],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss',
})
export class AddToCartButtonComponent implements OnInit, OnChanges {
  private readonly destroyRef = inject(DestroyRef);
  private cartId: string = '';
  private cartVersion: number = 0;
  private productId: string = '';
  private variantId: number = 1;
  public productTitle: string = '';
  public isDisabled: boolean = false;

  @Input() public product: ProductProjection | null = null;

  constructor(
    private cartApiService: CartApiService,
    private cartStateService: CartStateService,
    private productProjectionsHelperService: ProductProjectionsHelperService,
    private storageService: StorageService,
  ) {}

  public ngOnChanges(): void {
    if (this.product) {
      this.isDisabled = this.cartStateService.isProductDisabled(this.product.id);
    }
  }

  public ngOnInit(): void {
    this.productTitle = this.product ? this.productProjectionsHelperService.getProductName(this.product) : '';
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
      alert('Please sign in to add anything to your cart.');

      return;
    }

    this.cartApiService
      .getCartByCustomerId(customerId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: unknown) => {
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
          this.isDisabled = true;
          this.cartStateService.disableProduct(this.productId);
          console.log('Product "%s" has been successfully added to your cart', this.productTitle);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert(`Sorry, "${this.productTitle}" can't be added to your cart. Please, contact support.`);
            console.warn(`Error adding product to cart.\n${error.error.message}`);
          } else {
            this.handleError(error);
          }
        },
      });
  }

  private handleError(error: HttpErrorResponse): Error {
    if (error.status !== 404 && error.status !== 400) {
      console.error(`Backend returned code ${error.status}:`, error.error);
    }

    return new Error('Something went wrong; please try again later.');
  }
}
