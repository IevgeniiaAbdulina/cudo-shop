import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductProjectionsHelperService } from '../../../../core/product/services/product-projections.helper.service';

@Component({
  selector: 'app-product-search',
  imports: [ReactiveFormsModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss',
})
export class ProductSearchComponent {
  private readonly destroyRef = inject(DestroyRef);

  @Output() public productSearch = new EventEmitter<string>();

  public searchControl = new FormControl('');

  constructor(private productProjectionsHelperService: ProductProjectionsHelperService) {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value !== null) {
          this.productProjectionsHelperService.searchTermSignal.set(value);
        }
      });
  }
}
