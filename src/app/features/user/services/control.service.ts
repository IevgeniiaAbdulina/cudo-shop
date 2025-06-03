import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

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
}
