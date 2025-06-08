import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailedInfoComponent } from './product-detailed-info/product-detailed-info.component';

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: { breadcrumb: '' },
  },
  {
    path: ':key',
    component: ProductDetailedInfoComponent,
    data: { breadcrumb: 'Product Details' },
  },
];
