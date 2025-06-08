import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import API_ENDPOINT from '../../../shared/constants/api-endpoint';
import { getLangKey } from '../../../shared/utils/utils';
import { ProductProjectionsResponse } from '../interfaces/product-projections-response';

@Injectable({
  providedIn: 'root',
})
export class ProductProjectionsApiService {
  private readonly SEARCH_URL = `${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.PRODUCT_SEARCH}`;

  constructor(private http: HttpClient) {}

  public getProductProjectionsByCategory(categoryId: string): Observable<ProductProjectionsResponse> {
    const params = new HttpParams().set('filter', `categories.id:subtree("${categoryId}")`);

    return this.http.get<ProductProjectionsResponse>(this.SEARCH_URL, { params });
  }

  public searchProducts(searchTerm: string): Observable<ProductProjectionsResponse> {
    const params = new HttpParams().set(`text.${getLangKey()}`, searchTerm).set('fuzzy', true);

    return this.http.get<ProductProjectionsResponse>(this.SEARCH_URL, { params });
  }
}
