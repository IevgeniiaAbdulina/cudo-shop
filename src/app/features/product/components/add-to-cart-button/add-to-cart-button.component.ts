import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, Input, OnChanges, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { StorageService } from '../../../../core/auth/storage.service';
import { Cart } from '../../../../core/cart/interfaces/cart';
import { CartApiService } from '../../../../core/cart/services/cart-api.service';
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
  private cart: Cart = {
    id: '',
    version: 0,
    lineItems: [],
  };
  private productId: string = '';
  private variantId: number = 1;
  public productTitle: string = '';
  public isDisabled = signal(false);

  @Input() public product: ProductProjection | null = null;

  constructor(
    private cartApiService: CartApiService,
    private productProjectionsHelperService: ProductProjectionsHelperService,
    private storageService: StorageService,
  ) {}

  public ngOnChanges(): void {
    if (this.product) {
      this.productId = this.product.id;
      this.checkIfProductAlreadyAddedToCart();
    }
  }

  public ngOnInit(): void {
    if (this.product) {
      this.productTitle = this.productProjectionsHelperService.getProductName(this.product);
    }
  }

  public handleAddToCart(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      const productTitle = this.product ? this.productProjectionsHelperService.getProductName(this.product) : '';
      console.log('Product "%s" is adding to cart...', productTitle);
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
            this.cart.id = cartResponse.id;
            this.cart.version = cartResponse.version;
            console.log('[cart by customerId]', this.cart.id, this.cart.version); // TODO
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
    const productTitle = this.product ? this.productProjectionsHelperService.getProductName(this.product) : '';

    if (this.product) {
      this.productId = this.product.id;
    }

    this.cartApiService
      .updateCartById(this.cart.id, this.cart.version, this.productId, this.variantId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isDisabled.set(true);
          console.log('Product "%s" has been successfully added to your cart', productTitle);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert(`Sorry, "${productTitle || 'specified product'}" can't be added to your cart. Please, contact support.`);
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
            console.log('[check cart (by customerId)]', cartResponse?.id, cartResponse?.version); // TODO
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
