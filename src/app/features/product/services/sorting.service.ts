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

  public sortProductsByPriceAsc(): Observable<ProductProjectionsResponse> {
    const params = new HttpParams({ fromString: 'sort=price asc' });

    return this.http.post<ProductProjectionsResponse>(this.baseUrl, params);
  }

  public sortProductsByPriceDesc(): Observable<ProductProjectionsResponse> {
    const params = new HttpParams({ fromString: 'sort=price desc' });

    return this.http.post<ProductProjectionsResponse>(this.baseUrl, params);
  }

  public sortProductsAlphabeticallyAsc(): Observable<ProductProjectionsResponse> {
    const params = new HttpParams({ fromString: 'sort=name.en-US asc' });

    return this.http.post<ProductProjectionsResponse>(this.baseUrl, params);
  }

  public sortProductsAlphabeticallyDesc(): Observable<ProductProjectionsResponse> {
    const params = new HttpParams({ fromString: 'sort=name.en-US desc' });

    return this.http.post<ProductProjectionsResponse>(this.baseUrl, params);
  }
}
