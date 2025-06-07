import { Component, Input, output, OutputEmitterRef } from '@angular/core';
import { SortingService } from '../../services/sorting.service';
import { ProductProjection } from '../../../../core/product/interfaces/product-projection';
import { ProductProjectionsResponse } from '../../../../core/product/interfaces/product-projections-response';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sort-by-price',
  imports: [ReactiveFormsModule],
  templateUrl: './sort-by-price.component.html',
  styleUrl: './sort-by-price.component.scss',
})
export class SortByPriceComponent {
  @Input() public selectedCategory: string = '';
  public sortedProducts: OutputEmitterRef<ProductProjection[]> = output<ProductProjection[]>();

  constructor(private sortingService: SortingService) {}

  public sortProductsPopular(): void {
    this.sortingService.sortProductsPopular(this.selectedCategory).subscribe({
      next: (data: ProductProjectionsResponse) => {
        this.sortedProducts.emit(data.results);
      },
      error: (error) => {
        console.error(`Loading error: ${error}`);
      },
    });
  }

  public sortProductsAsc(): void {
    this.sortingService.sortProductsByPriceAsc(this.selectedCategory).subscribe({
      next: (data: ProductProjectionsResponse) => {
        this.sortedProducts.emit(data.results);
      },
      error: (error) => {
        console.error(`Loading error: ${error}`);
      },
    });
  }

  public sortProductsDesc(): void {
    this.sortingService.sortProductsByPriceDesc(this.selectedCategory).subscribe({
      next: (data: ProductProjectionsResponse) => {
        this.sortedProducts.emit(data.results);
      },
      error: (error) => {
        console.error(`Loading error: ${error}`);
      },
    });
  }
}
