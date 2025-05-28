import { Component, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { Book } from '../../../../shared/interfaces/book';
import { Cosmetics } from '../../../../shared/interfaces/cosmetics';
import { NavigateToSpecificRouteService } from '../../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);

  public title: string = 'Home page';

  public selectCatalog(catalogName: string) {
    this.navigateToSpecificRouteService.setRoute(catalogName);
  }
}
