import { ProductCategory } from './product-category';
import { ProductImage } from './product-image';

export interface ProductMasterData {
  name: Record<string, string>;
  categories: ProductCategory[];
  metaDescription: Record<string, string>;
  masterVariant: { images: ProductImage[] };
}
