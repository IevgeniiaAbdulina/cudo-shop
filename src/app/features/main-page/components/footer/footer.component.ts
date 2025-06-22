import { Component, inject, Output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { NavigateToSpecificRouteService } from '../../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';

@Component({
  selector: 'app-footer',
  imports: [ButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);

  @Output() public buttonClickedAboutUs(): void {
    this.navigateToSpecificRouteService.setRoute('about-us');
  }
}
