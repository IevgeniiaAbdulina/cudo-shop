import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ProductProjectionsResponse } from '../../../core/product/interfaces/product-projections-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  private readonly PROJECT_KEY: string = environment.projectKey;
  private readonly API_URL: string = environment.apiUrl;

  private baseUrl: string = `${this.API_URL}/${this.PROJECT_KEY}/product-projections/search`;

  constructor(private http: HttpClient) {}

  private createFilterParams(categoryId: string): string {
    let filterByCategory = '';
    if (categoryId) {
      filterByCategory = `&filter=categories.id:subtree("${categoryId}")`;
    }

    return filterByCategory;
  }

  public sortProductsPopular(categoryId: string): Observable<ProductProjectionsResponse> {
    const filterByCategory = this.createFilterParams(categoryId);
    const params = new HttpParams({ fromString: `${filterByCategory}` });

    return this.http.post<ProductProjectionsResponse>(this.baseUrl, params);
  }

  public sortProductsByPriceAsc(categoryId: string): Observable<ProductProjectionsResponse> {
    const filterByCategory = this.createFilterParams(categoryId);
    const params = new HttpParams({ fromString: `sort=price asc${filterByCategory}` });

    return this.http.post<ProductProjectionsResponse>(this.baseUrl, params);
  }

  public sortProductsByPriceDesc(categoryId: string): Observable<ProductProjectionsResponse> {
    const filterByCategory = this.createFilterParams(categoryId);
    const params = new HttpParams({ fromString: `sort=price desc${filterByCategory}` });

    return this.http.post<ProductProjectionsResponse>(this.baseUrl, params);
  }

  public sortProductsAlphabeticallyAsc(categoryId: string): Observable<ProductProjectionsResponse> {
    const filterByCategory = this.createFilterParams(categoryId);
    const params = new HttpParams({ fromString: `sort=name.en-US asc${filterByCategory}` });

    return this.http.post<ProductProjectionsResponse>(this.baseUrl, params);
  }

  public sortProductsAlphabeticallyDesc(categoryId: string): Observable<ProductProjectionsResponse> {
    const filterByCategory = this.createFilterParams(categoryId);
    const params = new HttpParams({ fromString: `sort=name.en-US desc${filterByCategory}` });

    return this.http.post<ProductProjectionsResponse>(this.baseUrl, params);
  }
}
