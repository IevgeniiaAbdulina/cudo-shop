import { Component, inject } from '@angular/core';
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
