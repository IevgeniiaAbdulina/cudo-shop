import { Injectable } from '@angular/core';

import { getLangKey } from '../../shared/utils/utils';
import { ProductProjection } from './interfaces/product-projection';
import { ProductImage } from './interfaces/product-image';

@Injectable({
  providedIn: 'root',
})
export class ProductProjectionsHelperService {
  constructor() {}

  public getProductName(productProjection: ProductProjection): string {
    const currentName = productProjection.name;

    return currentName[getLangKey()];
  }

  public getProductImg(productProjection: ProductProjection): string {
    const currentMasterVariantImage: ProductImage = productProjection.masterVariant.images[this.getImgIdx()];

    return currentMasterVariantImage.url;
  }

  public getShortProductDescription(productProjection: ProductProjection): string {
    const currentMetaDescription = productProjection.metaDescription;
    const description = currentMetaDescription[getLangKey()];

    return description.length > 89 ? `${description.slice(0, 80)}...` : description;
  }

  private getImgIdx(): number {
    return 0; // TODO
  }
}
