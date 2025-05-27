import { FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { minimumAgeValidator } from './validate.dob';

describe('minimumAgeValidator', () => {
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl('');
  });

  it('should return null if the age is greater than the minimum age', () => {
    const validator: ValidatorFn = minimumAgeValidator(18);
    control.setValue(new Date(new Date().setFullYear(new Date().getFullYear() - 20)).toISOString().split('T')[0]);
    const result: ValidationErrors | null = validator(control);
    expect(result).toBeNull();
  });

  it('should return null if the age is equal to the minimum age', () => {
    const validator: ValidatorFn = minimumAgeValidator(18);
    control.setValue(new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]);
    const result: ValidationErrors | null = validator(control);
    expect(result).toBeNull();
  });

  it('should return an error if the age is less than the minimum age', () => {
    const validator: ValidatorFn = minimumAgeValidator(18);
    control.setValue(new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString().split('T')[0]);
    const result: ValidationErrors | null = validator(control);
    expect(result).toEqual({
      dob: {
        requiredAge: 18,
        actualAge: 16,
        message: 'you must be at least 18 years old',
      },
    });
  });

  it('should return an error if the birth date is in the future', () => {
    const validator: ValidatorFn = minimumAgeValidator(18);
    control.setValue(new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]);
    const result: ValidationErrors | null = validator(control);
    expect(result).toEqual({
      dob: {
        requiredAge: 18,
        actualAge: -1,
        message: 'you must be at least 18 years old',
      },
    });
  });

  it('should return null if the age is exactly the minimum age and the birth date is today', () => {
    const validator: ValidatorFn = minimumAgeValidator(18);
    const today = new Date();
    control.setValue(new Date(today.setFullYear(today.getFullYear() - 18)).toISOString().split('T')[0]);
    const result: ValidationErrors | null = validator(control);
    expect(result).toBeNull();
  });
});
