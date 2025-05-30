import { Address } from '../interfaces/user-response';

export class UserModel {
  constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: string,
    public password: string,
    public addresses: Address[],
  ) {}
}
