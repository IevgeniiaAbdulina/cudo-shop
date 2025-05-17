import { Component, inject, Signal } from '@angular/core';
import { NavigateToSpecificRouteService } from '../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { Book } from '../../../shared/interfaces/book';
import { Cosmetics } from '../../../shared/interfaces/cosmetics';

@Component({
  selector: 'app-cosmetics-page',
  imports: [],
  templateUrl: './cosmetics-page.component.html',
  styleUrl: './cosmetics-page.component.scss',
})
export class CosmeticsPageComponent {
  private navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);
  private data = inject(ROUTER_OUTLET_DATA) as Signal<{
    books: Book[];
    cosmetics: Cosmetics[];
  }>;

  public cosmetics = this.data().cosmetics;

  public goBack(): void {
    this.navigateToSpecificRouteService.setRoute('.');
  }
}
