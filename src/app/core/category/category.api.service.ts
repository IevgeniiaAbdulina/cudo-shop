import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import API_ENDPOINT from '../../shared/constants/api-endpoint';
import { Category } from './interfaces/category';
import { CategoryResponse } from './interfaces/category-response';

@Injectable({
  providedIn: 'root',
})
export class CategoryApiService {
  private readonly URL = `${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.CATEGORIES}`;

  constructor(private http: HttpClient) {}

  public getAllCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(this.URL);
  }

  public getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.URL}/${id}`);
  }
}
