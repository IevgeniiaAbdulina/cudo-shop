import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { NavigateToSpecificRouteService } from '../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { CartListItemComponent } from '../components/cart-list-item/cart-list-item.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [ButtonComponent, CartListItemComponent, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  public count: number = 3;
  public list: number[] = [1, 2, 3];
  public showCode: boolean = false;
  public showCodeMassage: boolean = false;
  public isCodeSuccess: boolean = false;
  public navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);

  public cartItem = {
    key: '101295786',
    title: 'Maecenas finibus nisi ut eros vehicula, vitae gravida quam malesuada.',
    image: 'https://images.cdn.europe-west1.gcp.commercetools.com/db016a89-0f79-4115-8880-c624ee9b2428/wendigo3--dA0Lmct.jpg',
  };

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
