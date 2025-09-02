import { UserModel } from './user-model';

describe('UserModel', () => {
  it('should create an instance', () => {
    expect(new UserModel(0, 'id', 'email', 'firstName', 'lastName', 'dateOfBirth', 'password', [])).toBeTruthy();
  });
});
