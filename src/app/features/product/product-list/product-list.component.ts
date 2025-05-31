import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavigateToSpecificRouteService } from '../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { CategoryResponse } from '../../../core/category/interfaces/category-response';
import { Category } from '../../../core/category/interfaces/category';
import { CategoryApiService } from '../../../core/category/category.api.service';
import { CategoryHelperService } from '../../../core/category/category.helper.service';
import { Product } from '../../../core/product/interfaces/product';
import { ProductResponse } from '../../../core/product/interfaces/product-response';
import { ProductService } from '../../../core/product/product.service';
import { ProductHelperService } from '../../../core/product/product.helper.service';
import { BriefCardComponent } from './brief-card/brief-card.component';

@Component({
  selector: 'app-product-list',
  imports: [BriefCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];

  public categories: Category[] = [];

  public currentRoute: string = '';
  public selectedCategory: string | null = null;

  constructor(
    private navigateToSpecificRouteService: NavigateToSpecificRouteService,
    private router: Router,
    private categoryApiService: CategoryApiService,
    private productApiService: ProductService,
    public productHelperService: ProductHelperService,
    public categoryHelperService: CategoryHelperService,
  ) {}

  public ngOnInit() {
    this.currentRoute = this.router.url;

    this.loadProducts();
    this.loadCategories();
  }

  private loadProducts() {
    this.productApiService.getAllProducts().subscribe({
      next: (response) => {
        const responseStr = JSON.stringify(response);
        const productResponse: ProductResponse = JSON.parse(responseStr);
        console.log(productResponse); // TODO
        this.products = [...productResponse.results];
      },
      error: (error: HttpErrorResponse) => {
        // Handle request error
        this.handleError(error);
      },
    });
  }

  private loadCategories() {
    this.categoryApiService.getAllCategories().subscribe({
      next: (response) => {
        const responseStr = JSON.stringify(response);
        const categoryResponse: CategoryResponse = JSON.parse(responseStr);
        console.log(categoryResponse); // TODO
        this.categories = [...categoryResponse.results];
      },
      error: (error: HttpErrorResponse) => {
        // Handle request error
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

  public goBack(): void {
    this.navigateToSpecificRouteService.setRoute('.');
  }
}
