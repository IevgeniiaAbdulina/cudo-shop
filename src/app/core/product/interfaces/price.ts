import { PriceValue } from './price-value';
import { ProductCategory } from './product-category';

export interface Price {
  id: string;
  value: PriceValue;
  country: string;
  discounted?: {
    value: PriceValue;
    discount: ProductCategory;
  };
}
