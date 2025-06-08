import { ProductCategory } from '../../product/interfaces/product-category';

export interface Category {
  id: string;
  name: Record<string, string>;
  ancestors: ProductCategory[];
}
