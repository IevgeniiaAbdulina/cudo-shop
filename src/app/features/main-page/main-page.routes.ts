import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from '../auth/registration/registration.component';

export const mainRoutes: Routes = [
  {
    path: '',
    title: 'Cudo Shop',
    component: MainPageComponent,
    children: [
      {
        path: 'main',
        component: HomeComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: 'books',
        loadChildren: () => import('../product/product.routes').then((c) => c.productRoutes),
      },
      {
        path: 'cosmetics',
        loadChildren: () => import('../product/product.routes').then((c) => c.productRoutes),
      },
      {
        path: 'cart',
        loadComponent: () => import('../cart/cart-page/cart-page.component').then((c) => c.CartPageComponent),
      },
      {
        path: '404',
        loadComponent: () => import('../page-not-found/page-not-found.component').then((c) => c.PageNotFoundComponent),
      },
    ],
  },
];
