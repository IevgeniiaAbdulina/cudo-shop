import { Routes } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

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
    path: 'login',
    pathMatch: 'full',
    component: LoginPageComponent,
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
