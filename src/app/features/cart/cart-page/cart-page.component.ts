import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { NavigateToSpecificRouteService } from '../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';

@Component({
  selector: 'app-cart-page',
  imports: [ButtonComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  public count: number = 0;
  private navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);

  public buttonGoToCatalog(): void {
    this.navigateToSpecificRouteService.setRoute('main');
  }
}
