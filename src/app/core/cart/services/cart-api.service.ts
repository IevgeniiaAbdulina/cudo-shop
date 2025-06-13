import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import API_ENDPOINT from '../../../shared/constants/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  private readonly CARTS_URL = `${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.CARTS}`;
  private readonly ME_CARTS_URL = `${environment.apiUrl}/${environment.projectKey}/me/${API_ENDPOINT.CARTS}`;

  constructor(private http: HttpClient) {}

  public getCartByCustomerId(customerId: string): Observable<unknown> {
    return this.http.get(`${this.CARTS_URL}/customer-id=${customerId}`).pipe(
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

  public updateCartById(cartId: string, version: number, productId: string, variantId: number, quantity: number = 1): Observable<unknown> {
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

    return this.http.post(`${this.CARTS_URL}/${cartId}`, payload);
  }

  private createMyCart(): Observable<unknown> {
    console.warn('Creating the cart...');
    const payload = {
      currency: this.getCurrency(),
    };

    return this.http.post(this.ME_CARTS_URL, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error creating cart:', error);

        return throwError(() => error);
      }),
    );
  }

  private getCurrency(): string {
    return 'EUR';
  }
}
