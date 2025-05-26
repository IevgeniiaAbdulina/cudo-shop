enum ERROR_MSG {
  REQUIRED = 'is required',
  INVALID = 'invalid',
  PASSWORD = 'must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  NAME = 'must contain at least one character and no special characters or numbers',
  ERROR_LOGIN_MESSAGE = 'Invalid login or password',
  ERROR_REGISTRATION_MESSAGE = 'User with the same name is already exist',
}

export default ERROR_MSG;
