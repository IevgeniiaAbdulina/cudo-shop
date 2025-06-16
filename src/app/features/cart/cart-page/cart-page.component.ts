import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { NavigateToSpecificRouteService } from '../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { CartListItemComponent } from '../components/cart-list-item/cart-list-item.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CartResponse } from '../interfaces/cart-response';
import { CurrencyPipe } from '@angular/common';
import { CartModel } from '../model/cart-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  imports: [ButtonComponent, CartListItemComponent, RouterLink, CurrencyPipe, FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  private cartId = 'bcd29e2e-fd23-440d-a00f-4d05389a50cd';

  public showCode: boolean = false;
  public showCodeMassage: boolean = false;
  public isCodeSuccess: boolean = false;
  public navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);
  private cartService = inject(CartService);

  public cart: WritableSignal<CartModel | null> = signal<CartModel | null>(null);
  public couponCode: string = '';

  public ngOnInit(): void {
    this.cartService.getCartById(this.cartId).subscribe((response: CartResponse) => {
      this.updateCartModel(response);
    });
  }

  private updateCartModel(response: CartResponse): void {
    this.cart.set(
      new CartModel(
        response.version,
        response.id,
        response.lineItems,
        response.totalPrice,
        response.totalLineItemQuantity,
        response.discountOnTotalPrice?.discountedAmount.centAmount,
        false,
      ),
    );
  }

  private getSelectedCartItem(productId: string | undefined) {
    return this.cart()?.lineItems?.find((item) => item.productId === productId);
  }

  public increment($event: string | undefined): void {
    const selectedItem = this.getSelectedCartItem($event);
    const quantity: number | undefined = (selectedItem?.quantity ?? 0) + 1;

    this.cartService.changeLineItemQuantity(this.cart()?.id, this.cart()?.version, selectedItem?.id, quantity).subscribe((response) => {
      this.updateCartModel(response);
    });
  }

  public decrement($event: string | undefined): void {
    const selectedItem = this.getSelectedCartItem($event);
    const quantity: number | undefined = (selectedItem?.quantity ?? 0) - 1;

    this.cartService.changeLineItemQuantity(this.cart()?.id, this.cart()?.version, selectedItem?.id, quantity).subscribe((response) => {
      this.updateCartModel(response);
    });
  }

  public delete($event: string | undefined): void {
    const selectedItem = this.getSelectedCartItem($event);
    const quantity = 0;

    this.cartService.changeLineItemQuantity(this.cart()?.id, this.cart()?.version, selectedItem?.id, quantity).subscribe((response) => {
      this.updateCartModel(response);
    });
  }

  public buttonGoToCatalog(): void {
    this.navigateToSpecificRouteService.setRoute('main');
  }

  public proceedCheckout(): void {
    console.log('Checkout');
  }

  public showCouponCodeInput(): void {
    this.showCode = !this.showCode;
  }

  public handleCouponCodeErrorMessage(): string {
    if (this.isCodeSuccess) {
      return 'Coupon code applied successfully.';
    } else {
      return "Hm, that code doesn't seem to work.";
    }
  }

  public applyCode(): void {
    this.showCodeMassage = true;
    this.isCodeSuccess = true;
    this.handleCouponCodeErrorMessage();

    this.cartService.addDiscountCode(this.cart()?.id, this.cart()?.version, this.couponCode).subscribe({
      next: (response: CartResponse) => {
        this.isCodeSuccess = true;
        this.handleCouponCodeErrorMessage();
        this.updateCartModel(response);
      },
      error: (error) => {
        console.error('[cart apply code error]', error);
        this.isCodeSuccess = false;
        this.handleCouponCodeErrorMessage();
      },
    });
  }
}
