import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  public static validationChecks(control: AbstractControl): boolean | null {
    return control.invalid && (control.dirty || control.touched);
  }

  public static getFormControl(form: FormGroup, control: string): AbstractControl | FormArray | null {
    return form.get(control) ?? null;
  }

  public static matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { confirmedValidator: 'Passwords do not match.' };
        matchingControl!.setErrors(error);

        return error;
      } else {
        matchingControl!.setErrors(null);

        return null;
      }
    };
  }
}
