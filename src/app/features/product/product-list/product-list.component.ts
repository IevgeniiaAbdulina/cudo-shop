import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BriefCardComponent } from './brief-card/brief-card.component';
import { Product } from '../../../core/product/interfaces/product';
import { ProductService } from '../../../core/product/product.service';
import { ProductResponse } from '../../../core/product/interfaces/product-response';
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
    private productService: ProductService,
    private router: Router,
  ) {}

  public products: Product[] = [];

  public currentRoute: string = '';

  public ngOnInit() {
    this.currentRoute = this.router.url;

    this.productService.getAllProducts().subscribe({
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

  public getProductImg(product: Product): string {
    const currentMasterVariantImage = product.masterData.current.masterVariant.images[0];

    return currentMasterVariantImage.url;
  }

  public getProductName(product: Product): string {
    const currentName = product.masterData.current.name;
    const key = Object.keys(currentName)[0];

    return currentName[key];
  }

  public getShortProductDescription(product: Product): string {
    const currentMetaDescription = product.masterData.current.metaDescription;
    const key = Object.keys(currentMetaDescription)[0];
    const description = currentMetaDescription[key];

    return description.length > 89 ? `${description.slice(0, 80)}...` : description;
  }

  public goBack(): void {
    this.navigateToSpecificRouteService.setRoute('.');
  }
}
