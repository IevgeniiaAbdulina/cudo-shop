import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CUSTOMERS, HOST, PROJECT_KEY } from '../auth.constants';
import User from '../../../shared/model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${HOST}/${PROJECT_KEY}`;
  private accessToken = 'Ce5nn3SDzeBzrkSYyFkfTy7DRZsgjWwM';

  constructor(private http: HttpClient) {}

  public register(userData: User): Observable<unknown> {
    const url = `${this.apiUrl}/${CUSTOMERS}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    });

    return this.http.post(url, userData, { headers }).pipe(catchError(this.handleError));
  }

  private handleError(error: unknown): Observable<never> {
    // Handle error appropriately
    console.error('An error occurred:', error);

    return throwError('Something went wrong; please try again later.');
  }
}
