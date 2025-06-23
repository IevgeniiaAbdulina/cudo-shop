import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { ProductImage } from '../../../core/product/interfaces/product-image';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { AddToCartButtonComponent } from '../components/add-to-cart-button/add-to-cart-button.component';
import { RemoveFromCartButtonComponent } from '../components/remove-from-cart-button/remove-from-cart-button.component';
import { ProductDetailed } from './interfaces/product-detailed';
import { ModalComponent } from './modal/modal/modal.component';
import { ProductDetailedService } from './services/product-detailed.service';

@Component({
  selector: 'app-product-detailed-info',
  imports: [AddToCartButtonComponent, ButtonComponent, CommonModule, ModalComponent, RemoveFromCartButtonComponent],
  templateUrl: './product-detailed-info.component.html',
  styleUrl: './product-detailed-info.component.scss',
})
export class ProductDetailedInfoComponent implements OnInit {
  @Input() public product: ProductDetailed | null = null;
  @Input() public key: string | null = null;
  @Input() public currentImageIndex: number = 0;

  public products: ProductDetailed[] = [];
  public productImages: ProductImage[] = [];
  public isModalOpen: boolean = false;

  constructor(private productDetailedService: ProductDetailedService) {}

  public ngOnInit(): void {
    if (this.key) {
      this.productDetailedService.getProductByKey(this.key).subscribe({
        next: (product: ProductDetailed) => {
          const responseStr = JSON.stringify(product);
          const productResponse: ProductDetailed = JSON.parse(responseStr);
          this.products[0] = productResponse;
          this.getProductImages(productResponse);
          this.currentImageIndex = 0;
        },
        error: (error) => {
          console.error(`Loading error: ${error}`);
        },
      });
    }
  }

  public getProductName(product: ProductDetailed): string {
    const productName = product.masterData.current.name['en-US'];

    return productName;
  }

  public getProductPrice(product: ProductDetailed): string {
    const price = product.masterData.current.masterVariant.prices[0].value.centAmount;
    const productPrice = (price / 100).toFixed(2);

    return productPrice;
  }

  public getProductDiscount(product: ProductDetailed): string {
    const discountPrice = product.masterData.current.masterVariant.prices[0].discounted?.value.centAmount;
    if (typeof discountPrice !== 'undefined') {
      const productDiscount = (discountPrice / 100).toFixed(2);

      return productDiscount;
    } else {
      return '';
    }
  }

  public hasDiscount(product: ProductDetailed): boolean {
    const isSale = !!product.masterData.current.masterVariant.prices[0].discounted;

    return isSale;
  }

  public getDiscountValue(product: ProductDetailed): number {
    if (product && this.hasDiscount(product)) {
      const discountPrice = Number.parseFloat(this.getProductDiscount(product));
      const regularPrice = Number.parseFloat(this.getProductPrice(product));

      return Math.round((1 - discountPrice / regularPrice) * 100);
    }

    return 0;
  }

  public getProductCurrency(product: ProductDetailed): string {
    const productCurrency = product.masterData.current.masterVariant.prices[0].value.currencyCode;

    return productCurrency;
  }

  public getProductDescription(product: ProductDetailed): string {
    const productDescription = product.masterData.current.description['en-US'];

    return productDescription;
  }

  public getProductImages(product: ProductDetailed): ProductImage[] {
    this.productImages = product.masterData.current.masterVariant.images;

    return this.productImages;
  }

  public onClickLeft() {
    if (this.productImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.productImages.length) % this.productImages.length;
    }
  }

  public onClickRight() {
    if (this.productImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.productImages.length;
    }
  }

  public getCurrentImage(): ProductImage | null {
    if (this.productImages.length > 0 && this.currentImageIndex >= 0 && this.currentImageIndex < this.productImages.length) {
      return this.productImages[this.currentImageIndex];
    }

    return null;
  }

  public openImageInModal(): void {
    this.isModalOpen = true;
  }

  public onCloseModal(index: number): void {
    this.currentImageIndex = index;
    this.isModalOpen = false;
  }
}
