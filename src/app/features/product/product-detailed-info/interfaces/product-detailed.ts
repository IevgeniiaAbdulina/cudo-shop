import { Price } from '../../../../core/product/interfaces/price';
import { ProductCategory } from '../../../../core/product/interfaces/product-category';
import { ProductImage } from '../../../../core/product/interfaces/product-image';

export interface ProductDetailed {
  id: string;
  key: string;
  masterData: {
    current: {
      name: {
        'en-US': string;
      };
      categories: ProductCategory;
      description: {
        'en-US': string;
      };
      masterVariant: {
        sku: string | number;
        key: string | number;
        images: ProductImage[];
        prices: Price[];
      };
    };
  };
}
