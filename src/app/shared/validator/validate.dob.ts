import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minimumAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const message = `you must be at least ${minAge} years old`;
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (age > minAge || (age === minAge && monthDifference > 0) || (age === minAge && monthDifference === 0 && dayDifference >= 0)) {
      return null;
    } else {
      return { dob: { requiredAge: minAge, actualAge: age, message } };
    }
  };
}
