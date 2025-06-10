import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [CommonModule],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss',
})
export class AddToCartButtonComponent {
  @Input() public text: string = '';
  @Input() public productTitle: string = '';
  @Input() public isDisabled: boolean = false;

  public handleAddToCart(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      console.log('Product added to cart:', this.productTitle);
    }
  }
}
