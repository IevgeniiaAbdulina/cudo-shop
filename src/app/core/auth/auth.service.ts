import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from './interfaces/auth-response';
import { environment } from '../../../environments/environment.dev';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { CustomerResponse } from './interfaces/customer-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly PROJECT_KEY: string = environment.projectKey;
  private readonly CLIENT_SECRET: string = environment.clientSecret;
  private readonly CLIENT_ID: string = environment.clientId;
  private readonly AUTH_URL: string = environment.authUrl;
  private readonly accessToken: string = 'TpggDrcR9Fy0PteZLFt5UGzUOmftFm0e'; // TODO

  private apiClientAuthorization: string = btoa(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`);
  private apiUrlUserLogin: string = `${this.AUTH_URL}/oauth/${this.PROJECT_KEY}`;

  private tokenSubject = new BehaviorSubject<string | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isUserValid: boolean = false;

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

    return this.http.post<AuthResponse>(`${this.apiUrlUserLogin}/customers/token`, body.toString(), { headers }).pipe(
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

  public register(userData: User): Observable<unknown> {
    const url = `${environment.apiUrl}/${environment.projectKey}/customers`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    });

    return this.http.post<CustomerResponse>(url, userData, { headers }).pipe(
      tap({
        next: () => {},
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
    this.tokenSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  public getToken(): string | null {
    return this.tokenSubject.value;
  }
}
