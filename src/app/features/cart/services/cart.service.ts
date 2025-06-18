import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CartResponse } from '../interfaces/cart-response';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly PROJECT_KEY: string = environment.projectKey;
  private readonly API_URL: string = environment.apiUrl;

  private baseUrl: string = `${this.API_URL}/${this.PROJECT_KEY}`;

  public cartItemsCount: WritableSignal<number> = signal<number>(0);

  constructor(private http: HttpClient) {}

  public getCartById(cartId: string): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.baseUrl}/carts/${cartId}`).pipe(
      tap({
        next: (cartResponse: CartResponse) => {
          this.cartItemsCount.set(cartResponse.lineItems.length);
        },
      }),
    );
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

    return this.http.post<CartResponse>(`${this.baseUrl}/carts/${cartId}`, JSON.stringify(body)).pipe(
      tap({
        next: (cartResponse: CartResponse) => {
          this.cartItemsCount.set(cartResponse.lineItems.length);
        },
      }),
    );
  }

  public addDiscountCode(cartId: string | undefined, cartVersion: number | undefined, code: string): Observable<CartResponse> {
    const body = {
      version: cartVersion,
      actions: [
        {
          action: 'addDiscountCode',
          code: code,
        },
      ],
    };

    return this.http.post<CartResponse>(`${this.baseUrl}/carts/${cartId}`, JSON.stringify(body));
  }
}
