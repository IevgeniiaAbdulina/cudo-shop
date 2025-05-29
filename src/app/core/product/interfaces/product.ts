import { ProductMasterData } from './product-master-data';

export interface Product {
  id: string;
  version: number;
  productType: string;
  masterData: {
    current: ProductMasterData;
    staged: ProductMasterData;
  };
}
