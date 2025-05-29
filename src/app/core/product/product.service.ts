import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ProductResponse } from './interfaces/product-response';
import API_ENDPOINT from '../../shared/constants/api-endpoint';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public getAllProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.PRODUCTS}`);
  }
}
