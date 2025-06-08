import { Injectable, signal } from '@angular/core';

import { getLangKey } from '../../../shared/utils/utils';
import { ProductImage } from '../interfaces/product-image';
import { ProductProjection } from '../interfaces/product-projection';

@Injectable({
  providedIn: 'root',
})
export class ProductProjectionsHelperService {
  public searchTermSignal = signal<string>('');

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

  public getProductCurrency(productProjection: ProductProjection): string {
    const productCurrency = productProjection.masterVariant.prices[this.getPriceIdx()].value.currencyCode;

    return productCurrency;
  }

  public getProductPrice(productProjection: ProductProjection): string {
    const price = productProjection.masterVariant.prices[this.getPriceIdx()].value.centAmount;
    const productPrice = (price / 100).toFixed(2);

    return productPrice;
  }

  public hasDiscount(productProjection: ProductProjection): boolean {
    const isSale = !!productProjection.masterVariant.prices[this.getPriceIdx()].discounted;

    return isSale;
  }

  public getProductDiscount(productProjection: ProductProjection): string {
    const discountPrice = productProjection.masterVariant.prices[this.getPriceIdx()].discounted?.value.centAmount;
    if (typeof discountPrice !== 'undefined') {
      const productDiscount = (discountPrice / 100).toFixed(2);

      return productDiscount;
    } else {
      return '';
    }
  }

  private getImgIdx(): number {
    return 0; // TODO
  }

  private getPriceIdx(): number {
    return 0; // TODO
  }
}
