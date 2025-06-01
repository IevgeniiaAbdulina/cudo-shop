import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailedInfoComponent } from './product-detailed-info/product-detailed-info.component';

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: ':key',
    component: ProductDetailedInfoComponent,
  },
];
