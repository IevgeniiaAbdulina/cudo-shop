import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function postalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const postalCode = control.value;
    const countryControl = control.parent?.get('country');
    if (!countryControl) {
      return null;
    }
    const country: string = countryControl.value;

    const postalCodePatterns: Record<string, RegExp> = {
      Poland: /^[0-9]{2}-[0-9]{3}$/,
      Germany: /^[0-9]{5}$/,
      USA: /^[0-9]{5}(-[0-9]{4})?$/,
    };

    const pattern = postalCodePatterns[country];
    let validPostalCode = '';
    switch (country) {
      case 'Poland':
        validPostalCode = '12-345';
        break;
      case 'Germany':
        validPostalCode = '12345';
        break;
      case 'USA':
        validPostalCode = '12345 or 12345-6789';
        break;
      default:
        break;
    }
    if (pattern && !pattern.test(postalCode)) {
      return { message: `input valid postal code format (e.g., ${validPostalCode})` };
    }

    return null;
  };
}
