import { Routes } from '@angular/router';
import { RegistrationComponent } from './features/auth/registration/registration.component';
import { LoginPageComponent } from './features/auth/login-page/login-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./features/main-page/main-page.routes').then((m) => m.mainRoutes),
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
