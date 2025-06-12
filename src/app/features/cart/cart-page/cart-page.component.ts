import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { NavigateToSpecificRouteService } from '../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { CartListItemComponent } from '../components/cart-list-item/cart-list-item.component';

@Component({
  selector: 'app-cart-page',
  imports: [ButtonComponent, CartListItemComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  public count: number = 3;
  public list: number[] = [1, 2, 3];
  private navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);

  public cartItem = {
    key: '101295786',
    title: 'Product title Product title Product title Product title Product title Product title Product title Product title',
    image: 'https://images.cdn.europe-west1.gcp.commercetools.com/db016a89-0f79-4115-8880-c624ee9b2428/wendigo3--dA0Lmct.jpg',
  };

  public buttonGoToCatalog(): void {
    this.navigateToSpecificRouteService.setRoute('main');
  }
}
