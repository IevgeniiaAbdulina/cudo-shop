import { Component, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { Book } from '../../../../shared/interfaces/book';
import { Cosmetics } from '../../../../shared/interfaces/cosmetics';
import { NavigateToSpecificRouteService } from '../../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';

@Component({
  selector: 'app-catalog-books',
  imports: [],
  templateUrl: './catalog-books.component.html',
  styleUrl: './catalog-books.component.scss',
})
export class CatalogBooksComponent {
  private navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);

  private data = inject(ROUTER_OUTLET_DATA) as Signal<{
    books: Book[];
    cosmetics: Cosmetics[];
  }>;

  public books = this.data().books;

  public goBack(): void {
    this.navigateToSpecificRouteService.setRoute('.');
  }
}
