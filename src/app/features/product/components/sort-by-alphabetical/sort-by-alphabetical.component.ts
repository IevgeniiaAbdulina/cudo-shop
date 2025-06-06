import { Component, output, OutputEmitterRef } from '@angular/core';
import { ProductProjection } from '../../../../core/product/interfaces/product-projection';
import { SortingService } from '../../services/sorting.service';
import { ProductProjectionsResponse } from '../../../../core/product/interfaces/product-projections-response';

@Component({
  selector: 'app-sort-by-alphabetical',
  imports: [],
  templateUrl: './sort-by-alphabetical.component.html',
  styleUrl: './sort-by-alphabetical.component.scss',
})
export class SortByAlphabeticalComponent {
  public sortedProducts: OutputEmitterRef<ProductProjection[]> = output<ProductProjection[]>();

  constructor(private sortingService: SortingService) {}

  public sortProductsAsc(): void {
    this.sortingService.sortProductsAlphabeticallyAsc().subscribe({
      next: (data: ProductProjectionsResponse) => {
        this.sortedProducts.emit(data.results);
      },
      error: (error) => {
        console.error(`Loading error: ${error}`);
      },
    });
  }

  public sortProductsDesc(): void {
    this.sortingService.sortProductsAlphabeticallyDesc().subscribe({
      next: (data: ProductProjectionsResponse) => {
        this.sortedProducts.emit(data.results);
      },
      error: (error) => {
        console.error(`Loading error: ${error}`);
      },
    });
  }
}
