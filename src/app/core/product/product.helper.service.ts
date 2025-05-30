import { Injectable } from '@angular/core';

import { getLangKey } from '../../shared/utils/utils';
import { Product } from './interfaces/product';
import { ProductImage } from './interfaces/product-image';

@Injectable({
  providedIn: 'root',
})
export class ProductHelperService {
  constructor() {}

  public getProductImg(product: Product): string {
    const currentMasterVariantImage: ProductImage = product.masterData.current.masterVariant.images[this.getImgIdx()];

    return currentMasterVariantImage.url;
  }

  public getProductName(product: Product): string {
    const currentName = product.masterData.current.name;

    return currentName[getLangKey()];
  }

  public getShortProductDescription(product: Product): string {
    const currentMetaDescription = product.masterData.current.metaDescription;
    const description = currentMetaDescription[getLangKey()];

    return description.length > 89 ? `${description.slice(0, 80)}...` : description;
  }

  private getImgIdx(): number {
    return 0;
  }
}
