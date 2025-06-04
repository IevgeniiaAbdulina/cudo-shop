import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { BOOKS_ID, COSMETICS_ID } from '../../../shared/constants/category';
import { NavigateToSpecificRouteService } from '../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { Category } from '../../../core/category/interfaces/category';
import { CategoryApiService } from '../../../core/category/category.api.service';
import { CategoryHelperService } from '../../../core/category/category.helper.service';
import { ProductProjection } from '../../../core/product/interfaces/product-projection';
import { ProductProjectionsResponse } from '../../../core/product/interfaces/product-projections-response';
import { ProductProjectionsApiService } from '../../../core/product/product-projections.api.service';
import { ProductProjectionsHelperService } from '../../../core/product/product-projections.helper.service';
import { BriefCardComponent } from './brief-card/brief-card.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, BriefCardComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  public products: ProductProjection[] = [];
  public categories: Category[] = [];
  public currentRoute: string = '';
  public selectedCategory: string | null = null;
  public categoryTitle0: string = 'Books';
  public categoryTitle1: string = 'Cosmetics';

  constructor(
    private navigateToSpecificRouteService: NavigateToSpecificRouteService,
    private router: Router,
    private categoryApiService: CategoryApiService,
    private productProjectionsApiService: ProductProjectionsApiService,

    public productProjectionsHelperService: ProductProjectionsHelperService,
    public categoryHelperService: CategoryHelperService,
  ) {}

  public ngOnInit() {
    this.currentRoute = this.router.url;

    this.loadProducts();
    this.loadCategories();
  }

  public loadProducts() {
    this.filterByCategory(BOOKS_ID);
  }

  public filterByCategory(categoryId: string): void {
    this.selectedCategory = categoryId !== BOOKS_ID && categoryId !== COSMETICS_ID ? categoryId : '';
    this.productProjectionsApiService.getProductProjectionsByCategory(categoryId).subscribe({
      next: (response) => {
        const responseStr = JSON.stringify(response);
        const productProjectionsResponse: ProductProjectionsResponse = JSON.parse(responseStr);
        this.products = [...productProjectionsResponse.results];
      },
      error: (error: HttpErrorResponse) => {
        // Handle request error
        this.handleError(error);
      },
    });
  }

  public onKeyUpFilter(event: KeyboardEvent, categoryId: string): void {
    if (event.key === 'Enter') {
      this.filterByCategory(categoryId);
    }
  }

  public goBack(): void {
    this.navigateToSpecificRouteService.setRoute('.');
  }

  private loadCategories() {
    this.loadBookSubCategories(); // TODO
  }

  private loadBookSubCategories(): void {
    this.categoryApiService.getSubcategories(BOOKS_ID).subscribe({
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
}
