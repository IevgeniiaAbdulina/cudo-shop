import { BaseResponse } from '../../../shared/interfaces/base-response';
import { Category } from './category';

export interface CategoryResponse extends BaseResponse {
  results: Category[];
}
