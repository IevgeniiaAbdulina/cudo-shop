import { Injectable } from '@angular/core';

import { Product } from './interfaces/product';
import LANG from '../../shared/constants/lang';

@Injectable({
  providedIn: 'root',
})
export class ProductHelperService {
  constructor() {}

  public getProductImg(product: Product): string {
    const currentMasterVariantImage = product.masterData.current.masterVariant.images[this.getImgIdx()];

    return currentMasterVariantImage.url;
  }

  public getProductName(product: Product): string {
    const currentName = product.masterData.current.name;

    return currentName[this.getLangKey()];
  }

  public getShortProductDescription(product: Product): string {
    const currentMetaDescription = product.masterData.current.metaDescription;
    const description = currentMetaDescription[this.getLangKey()];

    return description.length > 89 ? `${description.slice(0, 80)}...` : description;
  }

  private getImgIdx(): number {
    return 0;
  }

  private getLangKey(): string {
    return LANG.EN_US;
  }
}
