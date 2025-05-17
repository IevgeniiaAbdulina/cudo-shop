import { Routes } from '@angular/router';
import { CosmeticsPageComponent } from './cosmetics-page/cosmetics-page.component';
import { CosmeticsDetailsComponent } from './cosmetics-details/cosmetics-details.component';

export const cosmeticsRoutes: Routes = [
  {
    path: '',
    component: CosmeticsPageComponent,
  },
  {
    path: ':id',
    component: CosmeticsDetailsComponent,
  },
];
