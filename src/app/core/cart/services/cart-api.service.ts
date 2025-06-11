import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import API_ENDPOINT from '../../../shared/constants/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  private readonly CARTS_URL = `${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.CARTS}`;

  constructor(private http: HttpClient) {}

  public getCartByCustomerId(customerId: string): Observable<unknown> {
    return this.http.get(`${this.CARTS_URL}/customer-id=${customerId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.log(`User ${customerId} does not have a cart yet. Creating a new cart...`);

          return this.createCartForCustomer(customerId);
        } else {
          return throwError(() => error);
        }
      }),
    );
  }

  private createCartForCustomer(customerId: string): Observable<unknown> {
    console.warn('Creating the cart...');

    return of();
  }
}
