import { Routes } from '@angular/router';
import { BooksPageComponent } from './books-page/books-page.component';
import { BookDetailsComponent } from './book-details/book-details.component';

export const booksRoutes: Routes = [
  {
    path: '',
    component: BooksPageComponent,
  },
  {
    path: ':id',
    component: BookDetailsComponent,
  },
];
