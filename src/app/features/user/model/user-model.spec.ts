import { UserModel } from './user-model';

describe('UserModel', () => {
  it('should create an instance', () => {
    expect(new UserModel('id', 'email', 'firstName', 'lastName', 'dateOfBirth', 'password', [])).toBeTruthy();
  });
});
