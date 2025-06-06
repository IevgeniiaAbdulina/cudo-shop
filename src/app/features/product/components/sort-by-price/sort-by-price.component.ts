import { Component, output, OutputEmitterRef } from '@angular/core';
import { SortingService } from '../../services/sorting.service';
import { ProductProjection } from '../../../../core/product/interfaces/product-projection';

@Component({
  selector: 'app-sort-by-price',
  imports: [],
  templateUrl: './sort-by-price.component.html',
  styleUrl: './sort-by-price.component.scss',
})
export class SortByPriceComponent {
  public sortedProducts: OutputEmitterRef<ProductProjection[]> = output<ProductProjection[]>();

  constructor(private sortingService: SortingService) {}

  public sortProductsAsc(): void {
    this.sortingService.sortProductsAsc().subscribe({
      next: (data) => {
        this.sortedProducts.emit(data.results);
      },
      error: (error) => {
        console.error(`Loading error: ${error}`);
      },
    });
  }

  public sortProductsDesc(): void {
    this.sortingService.sortProductsDesc().subscribe({
      next: (data) => {
        this.sortedProducts.emit(data.results);
      },
      error: (error) => {
        console.error(`Loading error: ${error}`);
      },
    });
  }
}
