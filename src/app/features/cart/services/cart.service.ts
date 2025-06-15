import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartResponse } from '../interfaces/cart-response';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly PROJECT_KEY: string = environment.projectKey;
  private readonly API_URL: string = environment.apiUrl;

  private baseUrl: string = `${this.API_URL}/${this.PROJECT_KEY}`;

  constructor(private http: HttpClient) {}

  public getCartById(cartId: string): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.baseUrl}/carts/${cartId}`);
  }

  public changeLineItemQuantity(
    cartId: string | undefined,
    cartVersion: number | undefined,
    lineItemId: string | undefined,
    lineItemQuantity: number,
  ): Observable<CartResponse> {
    const body = {
      version: cartVersion,
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId: `${lineItemId}`,
          quantity: lineItemQuantity,
        },
      ],
    };

    return this.http.post<CartResponse>(`${this.baseUrl}/carts/${cartId}`, JSON.stringify(body));
  }
}
