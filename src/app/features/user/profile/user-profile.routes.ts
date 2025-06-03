import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

export const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'personal-info',
        pathMatch: 'full',
      },
      {
        path: 'personal-info',
        loadChildren: () => import('../profile/components/personal-info/personal-info.routes').then((c) => c.personalInfoRoutes),
      },
      {
        path: 'addresses',
        loadChildren: () => import('../profile/components/addresses/addresses.routes').then((c) => c.addressesInfoRoutes),
      },
    ],
  },
];
