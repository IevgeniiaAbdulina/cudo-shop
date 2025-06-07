import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { ProductProjection } from '../../../../core/product/interfaces/product-projection';
import { ProductProjectionsHelperService } from '../../../../core/product/product-projections.helper.service';
import { ProductButtonComponent } from '../product-button/product-button.component';
import { ProductPriceComponent } from '../product-price/product-price.component';

@Component({
  selector: 'app-brief-card',
  imports: [ProductButtonComponent, ProductPriceComponent],
  templateUrl: './brief-card.component.html',
  styleUrl: './brief-card.component.scss',
})
export class BriefCardComponent implements OnInit, OnChanges {
  @Input() public product!: ProductProjection;

  public description: string = '';
  public imgUrl: string = '';
  public title: string = '';

  constructor(public productProjectionsHelperService: ProductProjectionsHelperService) {}

  public ngOnInit() {
    this.setProductData();
  }

  public ngOnChanges() {
    this.setProductData();
  }

  private setProductData(): void {
    this.description = this.productProjectionsHelperService.getShortProductDescription(this.product);
    this.imgUrl = this.productProjectionsHelperService.getProductImg(this.product);
    this.title = this.productProjectionsHelperService.getProductName(this.product);
  }

  public buttonClickedAddToCart(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      console.log('Product added to cart:', this.title);
    }
  }
}
