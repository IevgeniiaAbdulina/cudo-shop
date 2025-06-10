import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { LoginComponent } from '../auth/login/login.component';
import { authGuard } from '../../core/auth/auth.guard';
import { isLoggedGuard } from '../../core/auth/is-logged.guard';
import { AboutUsComponent } from '../about-us/about-us.component';

export const mainRoutes: Routes = [
  {
    path: '',
    title: 'Cudo Shop',
    component: MainPageComponent,
    data: { breadcrumb: 'Home' },
    children: [
      {
        path: 'main',
        component: HomeComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        data: { breadcrumb: 'About Us' },
      },
      {
        path: 'registration',
        component: RegistrationComponent,
        canActivate: [isLoggedGuard],
        data: { breadcrumb: 'Registration' },
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [isLoggedGuard],
        data: { breadcrumb: 'Login' },
      },
      {
        path: 'books',
        loadChildren: () => import('../product/product.routes').then((c) => c.productRoutes),
        data: { breadcrumb: 'Books' },
      },
      {
        path: 'cosmetics',
        loadChildren: () => import('../product/product.routes').then((c) => c.productRoutes),
        data: { breadcrumb: 'Cosmetics' },
      },
      {
        path: 'profile',
        loadChildren: () => import('../user/profile/user-profile.routes').then((c) => c.profileRoutes),
        canActivate: [authGuard],
        data: { breadcrumb: 'Profile' },
      },
      {
        path: 'cart',
        loadComponent: () => import('../cart/cart-page/cart-page.component').then((c) => c.CartPageComponent),
        canActivate: [authGuard],
        data: { breadcrumb: 'Cart' },
      },
      {
        path: '404',
        loadComponent: () => import('../page-not-found/page-not-found.component').then((c) => c.PageNotFoundComponent),
        data: { breadcrumb: '' },
      },
    ],
  },
];
