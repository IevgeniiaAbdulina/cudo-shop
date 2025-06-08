import { BaseProduct } from './base-product';
import { Price } from './price';
import { ProductCategory } from './product-category';
import { ProductImage } from './product-image';

export interface ProductProjection extends BaseProduct {
  name: Record<string, string>;
  description: Record<string, string>;
  categories: ProductCategory;
  metaDescription: Record<string, string>;
  variants: [];
  masterVariant: {
    images: ProductImage[];
    prices: Price[];
  };
}
