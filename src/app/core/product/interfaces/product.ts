import { BaseProduct } from './base-product';
import { ProductMasterData } from './product-master-data';

export interface Product extends BaseProduct {
  masterData: {
    current: ProductMasterData;
    staged: ProductMasterData;
  };
}
