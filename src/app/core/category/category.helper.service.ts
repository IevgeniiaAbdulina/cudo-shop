import { Injectable } from '@angular/core';

import { getLangKey } from '../../shared/utils/utils';
import { Category } from './interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryHelperService {
  constructor() {}

  public getCategoryName(category: Category): string {
    const name: Record<string, string> = category.name;

    return name[getLangKey()];
  }
}
