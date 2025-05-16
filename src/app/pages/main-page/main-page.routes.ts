import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { HomeComponent } from './components/home/home.component';
import { CatalogBooksComponent } from './components/catalog-books/catalog-books.component';
import { CatalogCosmeticsComponent } from './components/catalog-cosmetics/catalog-cosmetics.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const mainRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
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
        component: CatalogBooksComponent,
      },
      {
        path: 'cosmetics',
        component: CatalogCosmeticsComponent,
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];
