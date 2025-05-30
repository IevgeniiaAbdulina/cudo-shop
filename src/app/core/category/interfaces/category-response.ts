import { Category } from './category';

export interface CategoryResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Category[];
}
