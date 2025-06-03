import { BaseResponse } from '../../../shared/interfaces/base-response';
import { Product } from './product';

export interface ProductResponse extends BaseResponse {
  results: Product[];
}
