import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-remove-from-cart-button',
  imports: [],
  templateUrl: './remove-from-cart-button.component.html',
  styleUrls: ['../add-to-cart-button/add-to-cart-button.component.scss', './remove-from-cart-button.component.scss'],
})
export class RemoveFromCartButtonComponent implements OnChanges {

  @Input() public productId: string = '';
  @Input() public productTitle: string = '';

  constructor() {}

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
    // TODO
  }

  private removeProductFromCart(): void {
    // TODO
  }

  private checkIfProductAlreadyAddedToCart(): void {
    // TODO
  }

  private handleError(error: HttpErrorResponse): Error {
    if (error.status !== 404 && error.status !== 400) {
      console.error(`Backend returned code ${error.status}:`, error.error);
    }

    return new Error('Something went wrong; please try again later.');
  }
}
