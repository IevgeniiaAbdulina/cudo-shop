import { Routes } from '@angular/router';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { RegistrationComponent } from './pages/registration/registration.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./pages/main-page/main-page.routes').then((m) => m.mainRoutes),
  },
  {
    path: 'sign-in',
    pathMatch: 'full',
    component: SignInPageComponent,
  },
  {
    path: 'registration',
    pathMatch: 'full',
    component: RegistrationComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
