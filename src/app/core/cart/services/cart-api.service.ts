import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import API_ENDPOINT from '../../../shared/constants/api-endpoint';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {
  private readonly CARTS_URL = `${environment.apiUrl}/${environment.projectKey}/me/${API_ENDPOINT.CARTS}`;

  constructor(private http: HttpClient) {}

  public getCartByCustomerId(customerId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.CARTS_URL}/customer-id=${customerId}`);
  }
}
