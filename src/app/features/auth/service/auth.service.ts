import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api.commercetools.com'; // CommerceTools API URL

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    const url = `${this.apiUrl}/customers`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, userData, { headers }).pipe(catchError(this.handleError));
  }

  login(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, credentials, { headers }).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    // Handle error appropriately
    console.error('An error occurred:', error);

    return throwError('Something went wrong; please try again later.');
  }
}
