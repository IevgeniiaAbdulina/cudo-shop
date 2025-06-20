import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CartResponse } from '../interfaces/cart-response';
import { QueryCartResponse } from '../interfaces/query-carts-response';
import { CartModel } from '../model/cart-model';
import { CartApiService } from '../../../core/cart/services/cart-api.service';
import { ProductProjection } from '../../../core/product/interfaces/product-projection';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly PROJECT_KEY: string = environment.projectKey;
  private readonly API_URL: string = environment.apiUrl;

  private baseUrl: string = `${this.API_URL}/${this.PROJECT_KEY}`;

  public cart: WritableSignal<CartModel | null> = signal<CartModel | null>(null);
  public cartItemsCount: WritableSignal<number> = signal<number>(0);

  constructor(
    private http: HttpClient,
    private cartApiService: CartApiService,
  ) {}

  public createAnonymousCart(): void {
    this.handleCart();
  }

  public createNewCart(): Observable<CartResponse> {
    const payload = {
      currency: this.cartApiService.getCurrency(),
    };

    return this.http.post<CartResponse>(`${this.baseUrl}/carts`, payload);
  }

  public handleCart(): void {
    const cartID = localStorage.getItem('cartId');
    if (cartID) {
      this.getCartById(cartID).subscribe((response: CartResponse) => {
        this.updateCartModel(response);
      });
    } else {
      this.createNewCart().subscribe((cartResponse: CartResponse) => {
        this.updateCartModel(cartResponse);
      });
    }
  }

  public handleAddLineItemToCart(product: ProductProjection): void {
    this.addLineItemToCart(this.cart()?.id, this.cart()?.version, product.id, 1).subscribe(() => {
      console.log('Product item has been added');
      // TODO: add message success item added
    });
  }

  public updateCartModel(response: CartResponse): void {
    this.cart.set(
      new CartModel(
        response.version,
        response.id,
        response.lineItems,
        response.totalPrice,
        response.totalLineItemQuantity,
        response.discountOnTotalPrice?.discountedAmount.centAmount,
        false,
      ),
    );
    if (this.cart()?.lineItems) {
      this.cartItemsCount.set(this.cart()!.lineItems!.length);
    }
    if (this.cart()?.id) {
      localStorage.setItem('cartId', this.cart()!.id);
    }
  }

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

    return this.http.post<CartResponse>(`${this.baseUrl}/carts/${cartId}`, JSON.stringify(body)).pipe(
      tap({
        next: (cartResponse: CartResponse) => {
          this.cartItemsCount.set(cartResponse.lineItems.length);
        },
      }),
    );
  }

  public addLineItemToCart(
    cartId: string | undefined,
    cartVersion: number | undefined,
    productId: string | undefined,
    variantId: number,
  ): Observable<CartResponse> {
    const body = {
      version: cartVersion,
      actions: [
        {
          action: 'addLineItem',
          productId: `${productId}`,
          variantId: variantId,
          quantity: 1,
        },
      ],
    };

    return this.http.post<CartResponse>(`${this.baseUrl}/carts/${cartId}`, JSON.stringify(body)).pipe(
      tap({
        next: (cartResponse: CartResponse) => {
          this.updateCartModel(cartResponse);
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

  public deleteCartById(cartId: string | undefined, cartVersion: number | undefined): Observable<QueryCartResponse> {
    return this.http.delete<QueryCartResponse>(`${this.baseUrl}/carts/${cartId}?version=${cartVersion}`);
  }
}
