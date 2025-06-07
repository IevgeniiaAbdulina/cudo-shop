import { Component, Input, output, OutputEmitterRef } from '@angular/core';
import { ProductProjection } from '../../../../core/product/interfaces/product-projection';
import { SortingService } from '../../services/sorting.service';
import { ProductProjectionsResponse } from '../../../../core/product/interfaces/product-projections-response';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sort-by-alphabetical',
  imports: [ReactiveFormsModule],
  templateUrl: './sort-by-alphabetical.component.html',
  styleUrl: './sort-by-alphabetical.component.scss',
})
export class SortByAlphabeticalComponent {
  @Input() public selectedCategory: string = '';
  public sortedProducts: OutputEmitterRef<ProductProjection[]> = output<ProductProjection[]>();

  constructor(private sortingService: SortingService) {}

  public sortProductsAsc(): void {
    this.sortingService.sortProductsAlphabeticallyAsc(this.selectedCategory).subscribe({
      next: (data: ProductProjectionsResponse) => {
        this.sortedProducts.emit(data.results);
      },
      error: (error) => {
        console.error(`Loading error: ${error}`);
      },
    });
  }

  public sortProductsDesc(): void {
    this.sortingService.sortProductsAlphabeticallyDesc(this.selectedCategory).subscribe({
      next: (data: ProductProjectionsResponse) => {
        this.sortedProducts.emit(data.results);
      },
      error: (error) => {
        console.error(`Loading error: ${error}`);
      },
    });
  }
}
