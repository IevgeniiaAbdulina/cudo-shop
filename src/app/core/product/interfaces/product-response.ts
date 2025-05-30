import { Product } from './product';

export interface ProductResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Product[];
}
