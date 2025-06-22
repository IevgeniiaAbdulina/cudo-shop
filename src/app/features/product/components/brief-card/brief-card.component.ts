import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { HighlightSearchTermPipe } from '../../../../core/product/pipes/highlight-search-term.pipe';
import { ProductProjection } from '../../../../core/product/interfaces/product-projection';
import { ProductProjectionsHelperService } from '../../../../core/product/services/product-projections.helper.service';
import { AddToCartButtonComponent } from '../add-to-cart-button/add-to-cart-button.component';
import { ProductPriceComponent } from '../product-price/product-price.component';

@Component({
  selector: 'app-brief-card',
  imports: [AddToCartButtonComponent, HighlightSearchTermPipe, ProductPriceComponent],
  templateUrl: './brief-card.component.html',
  styleUrl: './brief-card.component.scss',
})
export class BriefCardComponent implements OnInit, OnChanges {
  @Input() public product!: ProductProjection;
  @Input() public searchTerm: string = '';

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
}
