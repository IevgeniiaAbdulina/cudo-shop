import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

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

  public getSubcategories(parentId: string): Observable<Category[]> {
    return this.http
      .get<CategoryResponse>(this.URL)
      .pipe(map((response) => response.results.filter((category) => category.ancestors.some((ancestor) => ancestor.id === parentId))));
  }
}
