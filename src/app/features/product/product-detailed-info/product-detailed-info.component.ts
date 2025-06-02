import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductDetailed } from './interfaces/product-detailed';
import { ProductDetailedService } from './services/product-detailed.service';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { CommonModule } from '@angular/common';
import { ProductImage } from '../../../core/product/interfaces/product-image';

@Component({
  selector: 'app-product-detailed-info',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './product-detailed-info.component.html',
  styleUrl: './product-detailed-info.component.scss',
})
export class ProductDetailedInfoComponent implements OnInit {
  @Input() public product: ProductDetailed | null = null;
  @Input() public key: string | null = null;
  public products: ProductDetailed[] = [];
  public productImages: ProductImage[] = [];

  constructor(private productDetailedService: ProductDetailedService) {}

  public ngOnInit(): void {
    if (this.key) {
      this.productDetailedService.getProductByKey(this.key).subscribe({
        next: (product: ProductDetailed) => {
          const responseStr = JSON.stringify(product);
          const productResponse: ProductDetailed = JSON.parse(responseStr);
          this.products[0] = productResponse;
        },
        error: (error) => {
          console.error(`Loading error: ${error}`);
        },
      });
    }
  }

  public getProductImage(product: ProductDetailed): string {
    const productImage = product.masterData.current.masterVariant.images[0].url;

    return productImage;
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

  public getProductCurrency(product: ProductDetailed): string {
    const productCurrency = product.masterData.current.masterVariant.prices[0].value.currencyCode;

    return productCurrency;
  }

  @Output() public buttonClickedAddToCart = new EventEmitter();

  public getProductDescription(product: ProductDetailed): string {
    const productDescription = product.masterData.current.description['en-US'];

    return productDescription;
  }

  public getProductImages(product: ProductDetailed): ProductImage[] {
    this.productImages = product.masterData.current.masterVariant.images;
    console.log('productImages', this.productImages);

    return this.productImages;
  }
}
