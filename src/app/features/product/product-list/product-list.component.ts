import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BOOKS_ID, COSMETICS_ID } from '../../../shared/constants/category';
import { NavigateToSpecificRouteService } from '../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { Category } from '../../../core/category/interfaces/category';
import { CategoryApiService } from '../../../core/category/services/category.api.service';
import { CategoryHelperService } from '../../../core/category/services/category.helper.service';
import { ProductProjection } from '../../../core/product/interfaces/product-projection';
import { ProductProjectionsResponse } from '../../../core/product/interfaces/product-projections-response';
import { ProductProjectionsApiService } from '../../../core/product/services/product-projections.api.service';
import { ProductProjectionsHelperService } from '../../../core/product/services/product-projections.helper.service';
import { BreadcrumbService } from '../components/breadcrumb/breadcrumb.service';
import { BriefCardComponent } from '../components/brief-card/brief-card.component';
import { ProductButtonComponent } from '../components/product-button/product-button.component';
import { SortByPriceComponent } from '../components/sort-by-price/sort-by-price.component';
import { SortByAlphabeticalComponent } from '../components/sort-by-alphabetical/sort-by-alphabetical.component';
import { PaginatorComponent } from '../components/paginator/paginator.component';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    BriefCardComponent,
    ProductButtonComponent,
    RouterLink,
    SortByPriceComponent,
    SortByAlphabeticalComponent,
    PaginatorComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  public products: ProductProjection[] = [];
  public categories: Category[] = [];
  public currentRoute: string = '';
  public selectedCategory: string = '';
  public categoryTitle0: string = 'Books';
  public categoryTitle1: string = 'Cosmetics';
  public searchTerm: string = '';
  public length: number = 0;
  public limit: number = 6;
  public page: number = 1;

  constructor(
    private navigateToSpecificRouteService: NavigateToSpecificRouteService,
    private router: Router,
    private categoryApiService: CategoryApiService,
    private productProjectionsApiService: ProductProjectionsApiService,

    public productProjectionsHelperService: ProductProjectionsHelperService,
    public categoryHelperService: CategoryHelperService,
    public breadcrumbService: BreadcrumbService,
  ) {
    effect(() => {
      const searchTerm = this.productProjectionsHelperService.searchTermSignal();
      this.onSearch(searchTerm);
    });
  }

  public ngOnInit() {
    this.currentRoute = this.router.url;

    this.loadProducts();
    this.loadCategories();
  }

  public getSortedProducts(sortedProducts: ProductProjection[]): void {
    if (sortedProducts) {
      this.products = [...sortedProducts];
    }
  }

  public resetFilters(): void {
    this.selectedCategory = '';
    this.breadcrumbService.resetCurrentCategory();
  }

  public loadProducts(): void {
    this.filterByCategory(BOOKS_ID);
    this.resetFilters();
  }

  public filterByCategory(categoryId: string): void {
    this.selectedCategory = categoryId !== BOOKS_ID && categoryId !== COSMETICS_ID ? categoryId : '';
    const offset = (this.page - 1) * this.limit;
    console.log('offset', offset);
    this.productProjectionsApiService
      .getProductProjectionsByCategory(categoryId, this.limit, offset)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const responseStr = JSON.stringify(response);
          const productProjectionsResponse: ProductProjectionsResponse = JSON.parse(responseStr);
          this.products = [...productProjectionsResponse.results];
          this.length = productProjectionsResponse.total;
        },
        error: (error: HttpErrorResponse) => {
          // Handle request error
          this.handleError(error);
        },
      });
  }

  public setCurrentCategory(category: Category) {
    this.breadcrumbService.setCategory(category.name['en-US']);
    this.filterByCategory(category.id);
  }

  public onKeyUpFilter(event: KeyboardEvent, categoryId: string): void {
    if (event.key === 'Enter') {
      this.filterByCategory(categoryId);
    }
  }

  public onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    if (searchTerm) {
      this.productProjectionsApiService
        .searchProducts(searchTerm)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response) => {
            const responseStr = JSON.stringify(response);
            const productProjectionsResponse: ProductProjectionsResponse = JSON.parse(responseStr);
            this.products = [...productProjectionsResponse.results];
          },
          error: (error: HttpErrorResponse) => {
            this.handleError(error);
          },
        });
    }
  }

  public goBack(): void {
    this.navigateToSpecificRouteService.setRoute('.');
  }

  private loadCategories() {
    this.loadBookSubCategories(); // TODO
  }

  private loadBookSubCategories(): void {
    this.categoryApiService
      .getSubcategories(BOOKS_ID)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (categories: Category[]) => {
          this.categories = categories;
        },
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
        },
      });
  }

  private handleError(error: HttpErrorResponse): Error {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else if (error.status === 400) {
      this.products = [];
    } else {
      console.error(`Backend returned code ${error.status}:`, error.error);
    }

    return new Error('Something went wrong; please try again later.');
  }

  // public onPageChange(event: { pageIndex: number; pageSize: number }): void {
  //   console.log('click arrow on pagination');
  //   // const page = event.pageIndex + 1;
  //   // const size = event.pageSize;
  //   // this.loadProducts();
  // }
  public onPageLimitChange(event: { pageIndex: number; pageSize: number }): void {
    console.log('click onPageLimitChange');
    //const target = event.target;
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    console.log('limit', this.limit);
    this.filterByCategory(BOOKS_ID);
  }
}
