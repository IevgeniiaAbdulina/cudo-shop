import { Component, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { Book } from '../../../../shared/interfaces/book';
import { Cosmetics } from '../../../../shared/interfaces/cosmetics';

@Component({
  selector: 'app-catalog-books',
  imports: [],
  templateUrl: './catalog-books.component.html',
  styleUrl: './catalog-books.component.scss',
})
export class CatalogBooksComponent {
  private data = inject(ROUTER_OUTLET_DATA) as Signal<{
    books: Book[];
    cosmetics: Cosmetics[];
  }>;

  public books = this.data().books;
}
