import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import API_ENDPOINT from '../../../shared/constants/api-endpoint';
import { CartResponse } from '../../../features/cart/interfaces/cart-response';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  private readonly CARTS_URL = `${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.CARTS}`;
  private readonly ME_CARTS_URL = `${environment.apiUrl}/${environment.projectKey}/me`;

  constructor(private http: HttpClient) {}

  public getMyActiveCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.ME_CARTS_URL}/${API_ENDPOINT.ACTIVE_CART}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.log('You do not have a cart yet. Creating a new cart...');

          return this.createMyCart();
        } else {
          return throwError(() => error);
        }
      }),
    );
  }

  public getCartByCustomerId(customerId: string): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.CARTS_URL}/customer-id=${customerId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.log(`User ${customerId} does not have a cart yet. Creating a new cart...`);

          return this.createMyCart();
        } else {
          return throwError(() => error);
        }
      }),
    );
  }

  public updateCartByIdAdd(
    cartId: string,
    version: number,
    productId: string,
    variantId: number,
    quantity: number = 1,
  ): Observable<CartResponse> {
    const payload = {
      version,
      actions: [
        {
          action: 'addLineItem',
          productId,
          variantId,
          quantity,
        },
      ],
    };

    return this.http.post<CartResponse>(`${this.CARTS_URL}/${cartId}`, payload);
  }

  public updateCartByIdRemove(cartId: string, version: number, lineItemId: string, quantity: number = 1): Observable<CartResponse> {
    const payload = {
      version,
      actions: [
        {
          action: 'removeLineItem',
          lineItemId,
          quantity,
        },
      ],
    };

    return this.http.post<CartResponse>(`${this.CARTS_URL}/${cartId}`, payload);
  }

  private createMyCart(): Observable<CartResponse> {
    console.warn('Creating the cart...');
    const payload = {
      currency: this.getCurrency(),
    };

    return this.http.post<CartResponse>(`${this.ME_CARTS_URL}/${API_ENDPOINT.CARTS}`, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error creating cart:', error);

        return throwError(() => error);
      }),
    );
  }

  public getCurrency(): string {
    return 'EUR';
  }
}
