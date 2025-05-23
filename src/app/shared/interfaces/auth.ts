import Address from '../model/address';

export interface CustomerResponse {
  customer: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    addresses: Address[];
  };
}
