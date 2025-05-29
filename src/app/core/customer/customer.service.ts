import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CustomerAction } from './interfaces/customer-action';
import { UserResponse } from '../auth/interfaces/user-response';
import { environment } from '../../../environments/environment.dev';
import API_ENDPOINT from '../../shared/constants/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly CUSTOMERS_URL: string = `${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.CUSTOMERS}`;

  constructor(private http: HttpClient) {}

  public getCustomerById(customerId: string): Observable<UserResponse> {
    const url = `${this.CUSTOMERS_URL}/${customerId}`;

    return this.http.get<UserResponse>(url);
  }

  public updateCustomerById(customerId: string, version: number, actions: CustomerAction[]): Observable<UserResponse> {
    const url = `${this.CUSTOMERS_URL}/${customerId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { version, actions };

    return this.http.post<UserResponse>(url, body, { headers });
  }
}
