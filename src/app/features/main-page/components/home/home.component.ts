import { Component, inject, OnInit } from '@angular/core';
import { NavigateToSpecificRouteService } from '../../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
//import { ProductListComponent } from '../../../product/product-list/product-list.component';
import { PromotionTeaserComponent } from '../../../../shared/ui/promotion-teaser/promotion-teaser.component';
//import { ProductProjectionsHelperService } from '../../../../core/product/services/product-projections.helper.service';
import { ProductProjection } from '../../../../core/product/interfaces/product-projection';
import { ProductProjectionsApiService } from '../../../../core/product/services/product-projections.api.service';
import { BOOKS_ID, COSMETICS_ID } from '../../../../shared/constants/category';
import { ProductProjectionsResponse } from '../../../../core/product/interfaces/product-projections-response';
import { HttpErrorResponse } from '@angular/common/http';
import { BriefCardComponent } from '../../../product/components/brief-card/brief-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, BriefCardComponent, PromotionTeaserComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);

  public title: string = 'Home page';
  public books: ProductProjection[] = [];
  public cosmetics: ProductProjection[] = [];
  public limit: number = 5;

  constructor(private productProjectionsApiService: ProductProjectionsApiService) {}

  public ngOnInit() {
    this.loadCategories();
  }
  public selectCatalog(catalogName: string) {
    this.navigateToSpecificRouteService.setRoute(catalogName);
  }

  public loadCategories() {
    this.loadBooks();
    this.loadCosmetics();
  }

  public loadBooks() {
    this.productProjectionsApiService.getProductProjectionsByCategory(BOOKS_ID, this.limit, 0).subscribe({
      next: (response) => {
        const responseStr = JSON.stringify(response);
        const productProjectionsResponse: ProductProjectionsResponse = JSON.parse(responseStr);
        this.books = [...productProjectionsResponse.results];
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
      },
    });
  }

  public loadCosmetics() {
    this.productProjectionsApiService.getProductProjectionsByCategory(COSMETICS_ID, this.limit, 0).subscribe({
      next: (response) => {
        const responseStr = JSON.stringify(response);
        const productProjectionsResponse: ProductProjectionsResponse = JSON.parse(responseStr);
        this.cosmetics = [...productProjectionsResponse.results];
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
      this.books = [];
      this.cosmetics = [];
    } else {
      console.error(`Backend returned code ${error.status}:`, error.error);
    }

    return new Error('Something went wrong; please try again later.');
  }
}
