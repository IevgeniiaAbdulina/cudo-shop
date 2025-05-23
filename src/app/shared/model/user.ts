import Address from './address';

export default interface User {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses?: Address[];
} // eslint-disable-line semi
