import { Address } from '../../model/address';

export interface UserResponse {
  id: string;
  version: number;
  firstName: string;
  lastName: string;
  addresses: Address[];
}
