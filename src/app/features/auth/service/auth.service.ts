import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CustomerResponse } from '../../../core/auth/interfaces/customer-response';
import { User } from '../../../core/model/user';
import { environment } from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly accessToken: string = 'TpggDrcR9Fy0PteZLFt5UGzUOmftFm0e';

  constructor(private http: HttpClient) {}

  public register(userData: User): Observable<unknown> {
    const url = `${environment.apiUrl}/${environment.projectKey}/${environment.customers}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    });

    return this.http.post<CustomerResponse>(url, userData, { headers }).pipe(
      tap({
        next: (response: CustomerResponse) => {
          // Show success registration message
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

    return new Error('Something went wrong; please try again later.');
  }
}
