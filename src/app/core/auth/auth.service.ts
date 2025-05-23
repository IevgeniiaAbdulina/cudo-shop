import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from './interfaces/auth-response';
import { environment } from '../../../environments/environment.dev';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly PROJECT_KEY: string = environment.projectKey;
  private readonly CLIENT_SECRET: string = environment.clientSecret;
  private readonly CLIENT_ID: string = environment.clientId;
  private readonly AUTH_URL: string = environment.authUrl;

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

    return this.http.post<AuthResponse>(`${this.apiUrlUserLogin}/customers/token`, body.toString(), { headers }).pipe(
      tap({
        next: (response: AuthResponse) => {
          // this.setSession(response);
          this.tokenSubject.next(response.access_token);
          this.isAuthenticatedSubject.next(true);
          //   Show success login message
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
    } else {
      // Backend returned unsuccessful response
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }

    return new Error('Something bad happened; please try again later.');
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
