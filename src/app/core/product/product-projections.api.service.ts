import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.dev';
import API_ENDPOINT from '../../shared/constants/api-endpoint';
import { ProductProjection } from './interfaces/product-projection';

@Injectable({
  providedIn: 'root',
})
export class ProductProjectionsApiService {
  private readonly SEARCH_URL = `${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.PRODUCT_SEARCH}`;

  constructor(private http: HttpClient) {}

  public getAllProductProjections(): Observable<ProductProjection> {
    return this.http.get<ProductProjection>(this.SEARCH_URL);
  }

  public getProductProjectionsByCategory(categoryId: string): Observable<ProductProjection> {
    const params = new HttpParams().set('filter.query', `categories.id:"${categoryId}"`);

    return this.http.get<ProductProjection>(this.SEARCH_URL, { params });
  }
}
