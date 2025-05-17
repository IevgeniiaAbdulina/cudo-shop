import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const mainRoutes: Routes = [
  {
    path: '',
    title: 'Cudo Shop',
    component: MainPageComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'books',
        loadChildren: () => import('../books/books-page.routes').then((c) => c.booksRoutes),
      },
      {
        path: 'cosmetics',
        loadChildren: () => import('../cosmetics/cosmetics-page.routes').then((c) => c.cosmeticsRoutes),
      },
      {
        path: 'cart',
        loadComponent: () => import('../cart-page/cart-page.component').then((c) => c.CartPageComponent),
      },
      {
        path: '404',
        component: PageNotFoundComponent,
      },
    ],
  },
];
