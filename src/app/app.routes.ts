import { Routes } from '@angular/router';
import { RegistrationComponent } from './features/auth/registration/registration.component';
import { LoginComponent } from './features/auth/login/login.component';

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
    component: LoginComponent,
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
