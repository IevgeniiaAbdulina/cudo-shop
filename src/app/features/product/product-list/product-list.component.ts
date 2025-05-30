import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BriefCardComponent } from './brief-card/brief-card.component';
import { Product } from '../../../core/product/interfaces/product';
import { ProductResponse } from '../../../core/product/interfaces/product-response';
import { ProductService } from '../../../core/product/product.service';
import { ProductHelperService } from '../../../core/product/product.helper.service';
import { NavigateToSpecificRouteService } from '../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';

@Component({
  selector: 'app-product-list',
  imports: [BriefCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  constructor(
    private navigateToSpecificRouteService: NavigateToSpecificRouteService,
    private apiService: ProductService,
    public helperService: ProductHelperService,
    private router: Router,
  ) {}

  public products: Product[] = [];

  public currentRoute: string = '';

  public ngOnInit() {
    this.currentRoute = this.router.url;

    this.apiService.getAllProducts().subscribe({
      next: (response) => {
        const responseStr = JSON.stringify(response);
        const productResponse: ProductResponse = JSON.parse(responseStr);

        this.products = [...productResponse.results];
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
