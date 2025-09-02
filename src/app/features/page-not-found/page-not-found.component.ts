import { Component, inject } from '@angular/core';
import { NavigateToSpecificRouteService } from '../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';

@Component({
  selector: 'app-page-not-found',
  imports: [ButtonComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  private navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);

  public backToHomepage(): void {
    this.navigateToSpecificRouteService.setRoute('main');
  }
}
