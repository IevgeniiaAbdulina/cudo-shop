import { CartResponse } from './cart-response';

export interface QueryCartResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: CartResponse[];
}
