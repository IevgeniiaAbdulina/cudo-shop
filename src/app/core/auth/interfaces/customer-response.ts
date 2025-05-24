import { Address } from '../../model/address';

export interface CustomerResponse {
  customer: {
    firstName: string;
    lastName: string;
    addresses: Address[];
  };
}
