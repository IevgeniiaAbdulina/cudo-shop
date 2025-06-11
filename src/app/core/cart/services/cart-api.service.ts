import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import API_ENDPOINT from '../../../shared/constants/api-endpoint';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {
  private readonly CARTS_URL = `${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.CARTS}`;

  constructor(private http: HttpClient) {}

  public getCartByCustomerId(customerId: string): Observable<Cart | null> {
    return this.http.get<Cart>(`${this.CARTS_URL}/customer-id=${customerId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          // Handle 404 error specifically
          console.log(`User ${customerId} does not have a cart yet.`);
          return of(null); // Return null or any other value to indicate no cart exists
        } else {
          // Re-throw other errors
          return throwError(() => error);
        }
      })
    );
  }
}
