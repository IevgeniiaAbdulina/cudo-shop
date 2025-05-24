import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

import { AuthResponse } from './interfaces/auth-response';
import { CustomerAction } from './interfaces/customer-action';
import { CustomerResponse } from './interfaces/customer-response';
import { UserResponse } from './interfaces/user-response';
import { Address } from '../model/address';
import { User } from '../model/user';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly PROJECT_KEY: string = environment.projectKey;
  private readonly CLIENT_SECRET: string = environment.clientSecret;
  private readonly CLIENT_ID: string = environment.clientId;
  private readonly AUTH_URL: string = environment.authUrl;
  private readonly CUSTOMERS_URL: string = `${environment.apiUrl}/${environment.projectKey}/${environment.customers}`;
  private readonly accessToken: string = 'a0GgPCH_GxNSIXfIFC58D0V8YQeW8EtJ'; // TODO

  private apiClientAuthorization: string = btoa(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`);
  private apiUrlUserLogin: string = `${this.AUTH_URL}/oauth/${this.PROJECT_KEY}`;

  private tokenSubject = new BehaviorSubject<string | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.tokenSubject.next(this.apiClientAuthorization);
  }

  public get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  public get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
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

    return this.http.post<AuthResponse>(`${this.apiUrlUserLogin}/${environment.customers}/token`, body.toString(), { headers }).pipe(
      tap({
        next: (response: AuthResponse) => {
          // this.setSession(response);
          this.tokenSubject.next(response.access_token);
          this.isAuthenticatedSubject.next(true);
        },
        error: (error) => {
          this.handleError(error);
        },
      }),
    );
  }

  public register(userData: User, isDefaultBillingAddress: string, isDefaultShippingAddress: string): Observable<UserResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    });

    return this.http.post<CustomerResponse>(this.CUSTOMERS_URL, userData, { headers }).pipe(
      switchMap((response: CustomerResponse) => {
        const customerId: string = response.customer.id;
        const version: number = response.customer.version;
        const address: Address = response.customer.addresses[0];
        const updateActions: CustomerAction[] = [];

        if (address.id) {
          if (isDefaultShippingAddress) {
            updateActions.push({
              action: 'setDefaultShippingAddress',
              addressId: address.id,
            });
          }

          if (isDefaultBillingAddress) {
            updateActions.push({
              action: 'setDefaultBillingAddress',
              addressId: address.id,
            });
          }
        } else {
          throw new Error('Invalid address id');
        }

        if (updateActions.length > 0) {
          return this.updateCustomerById(customerId, version, updateActions);
        }

        return this.getCustomerById(customerId);
      }),
    );
  }

  private getCustomerById(customerId: string): Observable<UserResponse> {
    const url = `${this.CUSTOMERS_URL}/${customerId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });

    return this.http.get<UserResponse>(url, { headers });
  }

  private updateCustomerById(customerId: string, version: number, actions: CustomerAction[]): Observable<UserResponse> {
    const url = `${this.CUSTOMERS_URL}/${customerId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    });
    const body = { version, actions };

    return this.http.post<UserResponse>(url, body, { headers });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client-side or network error
      console.error('An error occurred:', error.error);
    } else {
      // Backend returned unsuccessful response
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }

    return new Error('Something went wrong; please try again later.');
  }

  public logout(): void {
    this.tokenSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  public getToken(): string | null {
    return this.tokenSubject.value;
  }
}
