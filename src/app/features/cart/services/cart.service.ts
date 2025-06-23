import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { CartResponse } from '../interfaces/cart-response';
import { QueryCartResponse } from '../interfaces/query-carts-response';
import { CartModel } from '../model/cart-model';
import { CartApiService } from '../../../core/cart/services/cart-api.service';
import { StorageService } from '../../../core/auth/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly PROJECT_KEY: string = environment.projectKey;
  private readonly API_URL: string = environment.apiUrl;

  private baseUrl: string = `${this.API_URL}/${this.PROJECT_KEY}`;

  public cart: WritableSignal<CartModel | null> = signal<CartModel | null>(null);
  public cartItemsCount: WritableSignal<number> = signal<number>(0);
  public customerIdentifier: WritableSignal<string> = signal<string>('');

  constructor(
    private http: HttpClient,
    private cartApiService: CartApiService,
    private storageService: StorageService,
  ) {}

  public handleCart(): void {
    const customerId = this.customerIdentifier();
    if (customerId === '') {
      const customerId = this.storageService.getCustomerId();
      if (customerId) {
        this.customerIdentifier.set(customerId);
      }
    }

    if (customerId) {
      // If a customer is logged in and have a cart:
      this.cartApiService.getCartByCustomerId(customerId).subscribe((data: CartResponse) => {
        if (data.id) {
          this.getCartByIdAndUpdate(data.id);
        }
      });
    } else {
      // If a customer is NOT logged in:
      const cartId = this.cart()?.id ?? '';
      if (cartId) {
        this.getCartByIdAndUpdate(cartId);
      } else {
        // If a cart does NOT exist yet:
        this.createNewCart().subscribe((cartResponse: CartResponse) => {
          this.updateCartModel(cartResponse);
        });
      }
    }
  }

  public createNewCart(): Observable<CartResponse> {
    const payload = {
      currency: this.cartApiService.getCurrency(),
    };

    return this.http.post<CartResponse>(`${this.baseUrl}/carts`, payload);
  }

  public getCartByIdAndUpdate(cartId: string): void {
    this.getCartById(cartId).subscribe((response: CartResponse) => {
      this.updateCartModel(response);
    });
  }

  public handleAddLineItemToCart(productId: string): Observable<void> {
    return this.addLineItemToCart(this.cart()?.id, this.cart()?.version, productId, 1).pipe(
      delay(500),
      map((res) => {
        this.updateCartModel(res);

        return;
      }),
    );
  }

  public updateCartModel(response: CartResponse | null): void {
    if (response) {
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
        this.cartItemsCount.set(this.getCartItemsCount());
      }
    } else {
      this.cart.set(null);
      this.cartItemsCount.set(0);
      this.customerIdentifier.set('');
    }
  }

  public getCartItemsCount(): number {
    return this.cart()!.lineItems!.length;
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

    return this.http.post<CartResponse>(`${this.baseUrl}/carts/${cartId}`, JSON.stringify(body));
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

    return this.http.post<CartResponse>(`${this.baseUrl}/carts/${cartId}`, JSON.stringify(body));
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
