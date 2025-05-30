import { Injectable } from '@angular/core';
import { Product } from './interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductHelperService {

  constructor() {}

  public getProductImg(product: Product): string {
    const currentMasterVariantImage = product.masterData.current.masterVariant.images[0];

    return currentMasterVariantImage.url;
  }

  public getProductName(product: Product): string {
    const currentName = product.masterData.current.name;
    const key = Object.keys(currentName)[0];

    return currentName[key];
  }

  public getShortProductDescription(product: Product): string {
    const currentMetaDescription = product.masterData.current.metaDescription;
    const key = Object.keys(currentMetaDescription)[0];
    const description = currentMetaDescription[key];

    return description.length > 89 ? `${description.slice(0, 80)}...` : description;
  }
}
