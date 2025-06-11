import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  private getCart(): void {
    this.cartApiService
      .getCartByCustomerId(this.getCustomerId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: unknown) => {
          console.log('[39]cart', response);
        },
        error: (error: HttpErrorResponse) => {
          // Handle unexpected errors
          console.log('[getCart]', error.message);
          this.handleError(error);
        },
      });
  }

  private getCustomerId(): string {
    return '3740b429-a77a-45b2-831b-236003228369'; // TODO
  }

  private handleError(error: HttpErrorResponse): Error {
    if (error.status !== 404) {
      console.error(`Backend returned code ${error.status}:`, error.error);
    } else {
      console.warn('As expected:', error.error);
    }

    return new Error('Something went wrong; please try again later.');
  }
}
