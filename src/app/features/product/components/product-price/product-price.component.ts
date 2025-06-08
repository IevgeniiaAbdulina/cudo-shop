import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductProjection } from '../../../../core/product/interfaces/product-projection';
import { ProductProjectionsHelperService } from '../../../../core/product/services/product-projections.helper.service';

@Component({
  selector: 'app-product-price',
  imports: [CommonModule],
  templateUrl: './product-price.component.html',
  styleUrl: './product-price.component.scss',
})
export class ProductPriceComponent {
  @Input() public product!: ProductProjection;

  constructor(public helperService: ProductProjectionsHelperService) {}

  public getDiscountValue(): number {
    if (this.product && this.helperService.hasDiscount(this.product)) {
      const discountPrice = Number.parseFloat(this.helperService.getProductDiscount(this.product));
      const regularPrice = Number.parseFloat(this.helperService.getProductPrice(this.product));

      return Math.round((1 - discountPrice / regularPrice) * 100);
    }

    return 0;
  }
}
