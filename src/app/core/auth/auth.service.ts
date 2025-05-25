import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from './interfaces/auth-response';
import { environment } from '../../../environments/environment.dev';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { CustomerResponse } from './interfaces/customer-response';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly PROJECT_KEY: string = environment.projectKey;
  private readonly CLIENT_SECRET: string = environment.clientSecret;
  private readonly CLIENT_ID: string = environment.clientId;
  private readonly AUTH_URL: string = environment.authUrl;
  private readonly API_URL: string = environment.apiUrl;
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
      console.log('[auth service] getting initial token');

      return this.apiClientAuthorization;
    }
    console.log('[auth service] getting access token');

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
          console.log('[auth service] Authorization client anonymous', response);
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

    return this.http.post<AuthResponse>(`${this.apiUrlUserLogin}/customers/token`, body.toString(), { headers }).pipe(
      tap({
        next: (response: AuthResponse) => {
          this.storageService.setSession(response, 'normal', false);
          this.tokenSubject.next(response.access_token);
          this.isAuthenticatedSubject.next(true);
        },
        error: (error) => {
          this.handleError(error);
        },
      }),
    );
  }

  public register(userData: User): Observable<CustomerResponse> {
    const url = `${this.API_URL}/${this.PROJECT_KEY}/customers`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<CustomerResponse>(url, userData, { headers }).pipe(
      tap({
        next: () => {
          this.login({ email: userData.email, password: userData.password }).subscribe();
        },
        error: (error) => {
          this.handleError(error);
        },
      }),
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client-side or network error
      console.error('An error occurred:', error.error);
    } else if (error.status === 400) {
      this.isUserValid = false;
    } else {
      // Backend returned unsuccessful response
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
  }

  public refreshToken(): Observable<AuthResponse> {
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', this.storageService.getRefreshToken() || '');

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + this.apiClientAuthorization,
    };

    console.log('[auth service] requesting refresh token');

    return this.http.post<AuthResponse>(`${this.AUTH_URL}/oauth/token`, body.toString(), { headers }).pipe(
      tap((response: AuthResponse) => {
        console.log('[auth service] requested refresh token: ', response);
        this.storageService.setSession(response, 'normal', true);
        this.tokenSubject.next(response.access_token);
        this.isAuthenticatedSubject.next(true);
      }),
    );
  }
}
