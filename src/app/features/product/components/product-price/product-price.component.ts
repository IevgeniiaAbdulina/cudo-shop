import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductProjection } from '../../../../core/product/interfaces/product-projection';
import { ProductProjectionsHelperService } from '../../../../core/product/product-projections.helper.service';
import { ProductProjection } from '../../../../core/product/interfaces/product-projection';

@Component({
  selector: 'app-product-price',
  imports: [CommonModule],
  templateUrl: './product-price.component.html',
  styleUrl: './product-price.component.scss',
})
export class ProductPriceComponent {
  @Input() public product!: ProductProjection;

  constructor(public helperService: ProductProjectionsHelperService) {}
}
