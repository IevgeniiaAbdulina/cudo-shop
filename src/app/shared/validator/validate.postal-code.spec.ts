import { FormControl, FormGroup } from '@angular/forms';
import { postalCodeValidator } from './validate.postal-code';

describe('postalCodeValidator', () => {
  let control: FormControl;
  let formGroup: FormGroup;

  beforeEach(() => {
    formGroup = new FormGroup({
      postalCode: new FormControl(''),
      country: new FormControl(''),
    });
    control = formGroup.get('postalCode') as FormControl;
  });

  it('should return null if country control is not present', () => {
    const validator = postalCodeValidator();
    const result = validator(new FormControl('12345'));
    expect(result).toBeNull();
  });

  it('should return null for valid postal code in Poland', () => {
    formGroup.get('country')?.setValue('Poland');
    control.setValue('12-345');
    const validator = postalCodeValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return error for invalid postal code in Poland', () => {
    formGroup.get('country')?.setValue('Poland');
    control.setValue('12345');
    const validator = postalCodeValidator();
    const result = validator(control);
    expect(result).toEqual({ message: 'input valid postal code format (e.g., 12-345)' });
  });

  it('should return null for valid postal code in Germany', () => {
    formGroup.get('country')?.setValue('Germany');
    control.setValue('12345');
    const validator = postalCodeValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return error for invalid postal code in Germany', () => {
    formGroup.get('country')?.setValue('Germany');
    control.setValue('12-345');
    const validator = postalCodeValidator();
    const result = validator(control);
    expect(result).toEqual({ message: 'input valid postal code format (e.g., 12345)' });
  });

  it('should return null for valid postal code in USA', () => {
    formGroup.get('country')?.setValue('USA');
    control.setValue('12345');
    const validator = postalCodeValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return null for valid extended postal code in USA', () => {
    formGroup.get('country')?.setValue('USA');
    control.setValue('12345-6789');
    const validator = postalCodeValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return error for invalid postal code in USA', () => {
    formGroup.get('country')?.setValue('USA');
    control.setValue('12-345');
    const validator = postalCodeValidator();
    const result = validator(control);
    expect(result).toEqual({ message: 'input valid postal code format (e.g., 12345 or 12345-6789)' });
  });

  it('should return null for unsupported country', () => {
    formGroup.get('country')?.setValue('Canada');
    control.setValue('12345');
    const validator = postalCodeValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });
});
