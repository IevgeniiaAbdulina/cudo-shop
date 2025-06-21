import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

import { AuthResponse } from './interfaces/auth-response';
import { CustomerAction } from '../customer/interfaces/customer-action';
import { CustomerResponse } from '../customer/interfaces/customer-response';
import { UserResponse } from './interfaces/user-response';
import { Address } from '../model/address';
import { User } from '../model/user';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { CustomerService } from '../customer/services/customer.service';
import API_ENDPOINT from '../../shared/constants/api-endpoint';
import { UserService } from '../../features/user/services/user.service';
import { CartService } from '../../features/cart/services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly PROJECT_KEY: string = environment.projectKey;
  private readonly CLIENT_SECRET: string = environment.clientSecret;
  private readonly CLIENT_ID: string = environment.clientId;
  private readonly AUTH_URL: string = environment.authUrl;
  private readonly SCOPES: string[] = environment.scopes;

  private apiClientAuthorization: string = btoa(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`);
  private apiUrlUserLogin: string = `${this.AUTH_URL}/oauth/${this.PROJECT_KEY}`;

  private tokenSubject = new BehaviorSubject<string | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isUserValid: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private customerService: CustomerService,
    private userService: UserService,
    private cartService: CartService,
  ) {
    const token: string | null = this.storageService.getToken();
    if (token) {
      this.tokenSubject.next(token);
      this.isAuthenticatedSubject.next(false);
    }

    this.setAuthorisedSession();
  }

  public get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  private setAuthorisedSession(): void {
    const isAuthorisedSession: boolean = this.storageService.isSessionNormal();
    const accessToken: string | null = this.storageService.getToken();
    const isExpirationDateOk: boolean = Date.now() / 1000 < this.storageService.getExpirationDate();

    if (isAuthorisedSession && accessToken && isExpirationDateOk) {
      this.tokenSubject.next(accessToken);
      this.isAuthenticatedSubject.next(true);
    }
  }

  public getToken(initialToken: boolean): string | null {
    if (initialToken) {
      return this.apiClientAuthorization;
    }

    return this.tokenSubject.value;
  }

  public auth(): Observable<AuthResponse> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('scope', this.SCOPES[0]);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + this.apiClientAuthorization,
    };

    return this.http.post<AuthResponse>(`${this.AUTH_URL}/oauth/token`, body.toString(), { headers }).pipe(
      tap({
        next: (response: AuthResponse) => {
          this.storageService.setSession(response, 'anonymous', false);
          this.tokenSubject.next(response.access_token);
        },
        error: (error) => {
          console.error('[auth service] Authorization failed', error);
          this.handleError(error);
        },
      }),
    );
  }

  public login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', credentials.email);
    body.set('password', credentials.password);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + this.apiClientAuthorization,
    };

    console.log('[auth service >> where cart is updated] login');
    this.cartService.updateCartModel(null);
    this.cartService.handleCart();

    return this.http.post<AuthResponse>(`${this.apiUrlUserLogin}/${API_ENDPOINT.CUSTOMERS}/token`, body.toString(), { headers }).pipe(
      tap({
        next: (response: AuthResponse) => {
          this.storageService.setSession(response, 'normal', false);
          this.tokenSubject.next(response.access_token);
          this.isAuthenticatedSubject.next(true);

          this.userService.getUserPersonalInfoByToken().subscribe((userResponse: UserResponse) => {
            const customerId = userResponse.id;
            this.storageService.setCustomerId(customerId);
          });
        },
        error: (error) => {
          this.handleError(error);
        },
      }),
    );
  }

  public register(userData: User): Observable<UserResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<CustomerResponse>(`${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.CUSTOMERS}`, userData, { headers })
      .pipe(
        switchMap((response: CustomerResponse) => {
          const customerId: string = response.customer.id;
          const version: number = response.customer.version;
          const billingAddress: Address = response.customer.addresses[0];
          const shippingAddress: Address = response.customer.addresses[1];
          const updateActions: CustomerAction[] = [];

          if (billingAddress.id) {
            updateActions.push({
              action: 'setDefaultBillingAddress',
              addressId: billingAddress.id,
            });
          } else {
            throw new Error('Invalid billing address id');
          }

          if (shippingAddress.id) {
            updateActions.push({
              action: 'setDefaultShippingAddress',
              addressId: shippingAddress.id,
            });
          } else {
            throw new Error('Invalid shipping address id');
          }

          if (updateActions.length > 0) {
            return this.customerService.updateCustomerById(customerId, version, updateActions);
          }

          return this.customerService.getCustomerById(customerId);
        }),
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else if (error.status === 400) {
      this.isUserValid = false;
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }

    return new Error('Something went wrong; please try again later.');
  }

  public logout(): void {
    this.storageService.clearStorage();
    this.tokenSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.auth().subscribe();
    this.router.navigate(['/login']);
    console.log('[auth service >> where cart is updated] logout');
    this.cartService.updateCartModel(null);
  }

  public refreshToken(): Observable<AuthResponse> {
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', this.storageService.getRefreshToken() || '');

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + this.apiClientAuthorization,
    };

    return this.http.post<AuthResponse>(`${this.AUTH_URL}/oauth/token`, body.toString(), { headers }).pipe(
      tap((response: AuthResponse) => {
        this.storageService.setSession(response, 'normal', true);
        this.tokenSubject.next(response.access_token);
        this.isAuthenticatedSubject.next(true);
      }),
    );
  }
}
