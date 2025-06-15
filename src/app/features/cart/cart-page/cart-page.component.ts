import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { NavigateToSpecificRouteService } from '../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { CartListItemComponent } from '../components/cart-list-item/cart-list-item.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CartResponse } from '../interfaces/cart-response';
import { CurrencyPipe } from '@angular/common';
import { CartModel } from '../model/cart-model';

@Component({
  selector: 'app-cart-page',
  imports: [ButtonComponent, CartListItemComponent, RouterLink, CurrencyPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  private cartId = 'ec77f411-6b92-4d4d-81d9-5eb1b25bb2ef';

  public count: number = 3;
  public showCode: boolean = false;
  public showCodeMassage: boolean = false;
  public isCodeSuccess: boolean = false;
  public navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);
  private cartService = inject(CartService);

  public cart: WritableSignal<CartModel | null> = signal<CartModel | null>(null);

  public ngOnInit(): void {
    this.cartService.getCartById(this.cartId).subscribe((response: CartResponse) => {
      this.cart.set(new CartModel(response.version, response.id, response.lineItems, response.totalPrice, response.totalLineItemQuantity));
    });
  }

  private getSelectedCartItem(productId: string | undefined) {
    return this.cart()?.lineItems?.find((item) => item.productId === productId);
  }

  public increment($event: string | undefined): void {
    const selectedItem = this.getSelectedCartItem($event);
    const quantity: number | undefined = (selectedItem?.quantity ?? 0) + 1;

    this.cartService.changeLineItemQuantity(this.cart()?.id, this.cart()?.version, selectedItem?.id, quantity).subscribe((response) => {
      this.cart.set(new CartModel(response.version, response.id, response.lineItems, response.totalPrice, response.totalLineItemQuantity));
    });
  }

  public decrement($event: string | undefined): void {
    const selectedItem = this.getSelectedCartItem($event);
    const quantity: number | undefined = (selectedItem?.quantity ?? 0) - 1;

    this.cartService.changeLineItemQuantity(this.cart()?.id, this.cart()?.version, selectedItem?.id, quantity).subscribe((response) => {
      this.cart.set(new CartModel(response.version, response.id, response.lineItems, response.totalPrice, response.totalLineItemQuantity));
    });
  }

  public buttonGoToCatalog(): void {
    this.navigateToSpecificRouteService.setRoute('main');
  }

  public proceedCheckout(): void {
    console.log('Checkout');
  }

  public showCouponCodeInput(): void {
    console.log('showCouponCodeInput');
    this.showCode = !this.showCode;
  }

  public handleCouponCodeErrorMessage(): string {
    console.log('showApplyCodeMessage');
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
  }
}
