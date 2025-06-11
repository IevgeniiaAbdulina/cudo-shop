import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Cart } from '../../../../core/cart/interfaces/cart';
import { CartApiService } from '../../../../core/cart/services/cart-api.service';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [CommonModule],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss',
})
export class AddToCartButtonComponent {
  private readonly destroyRef = inject(DestroyRef);

  @Input() public text: string = '';
  @Input() public productTitle: string = '';
  @Input() public isDisabled: boolean = false;

  constructor(private cartApiService: CartApiService) {}

  public handleAddToCart(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      console.log('Product added to cart:', this.productTitle);
      this.getCart();
    }
  }

  private getCart() {
    console.log('[33]cart');
    this.cartApiService
      .getCartByCustomerId(this.getCustomerId()) // TODO for anonimous session
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const responseStr = JSON.stringify(response);
          const cart: Cart = JSON.parse(responseStr);
          console.log('[41]cart', cart);
          // this.products = [...productProjectionsResponse.results];
        },
        error: (error: HttpErrorResponse) => {
          // Handle request error
          this.handleError(error);
        },
      });
  }

  private getCustomerId(): string {
    return '8e43f958-3582-4a2c-90a9-96dceda7c57f'; // TODO
  }

  private handleError(error: HttpErrorResponse): Error {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else if (error.status === 404) {
      console.log(`User %s does not have a cart yet %d %s`, this.getCustomerId(), error.status, error.error);
    } else {
      console.error(`Backend returned code ${error.status}:`, error.error);
    }

    return new Error('Something went wrong; please try again later.');
  }
}
