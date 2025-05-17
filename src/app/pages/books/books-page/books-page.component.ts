import { Component, inject, Signal } from '@angular/core';
import { NavigateToSpecificRouteService } from '../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { Book } from '../../../shared/interfaces/book';
import { Cosmetics } from '../../../shared/interfaces/cosmetics';

@Component({
  selector: 'app-books-page',
  imports: [],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
})
export class BooksPageComponent {
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
