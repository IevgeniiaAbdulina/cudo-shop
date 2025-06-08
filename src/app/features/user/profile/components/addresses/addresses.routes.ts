import { Routes } from '@angular/router';
import { AddressesComponent } from './addresses.component';

export const addressesInfoRoutes: Routes = [
  {
    path: '',
    component: AddressesComponent,
    data: { breadcrumb: 'Addresses' },
  },
];
