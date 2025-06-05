import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment.dev';
import API_ENDPOINT from '../../../../shared/constants/api-endpoint';
import { ProductDetailed } from '../interfaces/product-detailed';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailedService {
  private readonly PROJECT_KEY: string = environment.projectKey;
  private readonly API_URL: string = environment.apiUrl;
  protected apiUrlRequest: string = `${this.API_URL}/${this.PROJECT_KEY}/${API_ENDPOINT.PRODUCTS}/key=`;

  constructor(private http: HttpClient) {}

  public getProductByKey(key: string): Observable<ProductDetailed> {
    return this.http.get<ProductDetailed>(`${this.apiUrlRequest}${key}`).pipe(
      catchError((error) => {
        console.error(`Error: ${error}`);

        return throwError(() => new Error('Some Error'));
      }),
    );
  }
}
