import { BaseResponse } from '../../../shared/interfaces/base-response';
import { ProductProjection } from './product-projection';

export interface ProductProjectionsResponse extends BaseResponse {
  results: ProductProjection[];
}
