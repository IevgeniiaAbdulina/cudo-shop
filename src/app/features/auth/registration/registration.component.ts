import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from '../../../shared/constants/regex';
import ERROR_MSG from '../../../shared/constants/error-message';
import { minimumAgeValidator } from '../../../shared/validator/validate.dob';
import { postalCodeValidator } from '../../../shared/validator/validate.postal-code';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public errMsg = ERROR_MSG;
  public registrationForm!: FormGroup;
  public passwordFieldType: string = 'password';
  public isPasswordVisible: boolean = false;
  public validCountries: string[] = ['Poland', 'Germany', 'USA'];
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
      firstName: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
      lastName: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
      dob: ['', [Validators.required, minimumAgeValidator(18)]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
        postalCode: ['', [Validators.required, postalCodeValidator()]],
        country: ['', Validators.required],
      }),
    });

    const countryValueChangesSubscription = this.registrationForm.get('address.country')?.valueChanges.subscribe(() => {
      this.registrationForm.get('address.postalCode')?.updateValueAndValidity();
    });

    if (countryValueChangesSubscription) {
      this.subscription.add(countryValueChangesSubscription);
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSubmit(): void {
    if (this.registrationForm.valid) {
      // Handle form submission
      console.log(this.registrationForm.value);
    }
  }

  public getFieldError(fieldName: string) {
    let error = '';
    let field = this.registrationForm.get(fieldName);
    if (!field) {
      field = this.registrationForm.controls['address'].get(fieldName);
    }
    if (field?.errors) {
      error = Object.keys(field?.errors)[0];
    }

    return error;
  }

  public isFieldInvalid(fieldName: string): boolean | undefined {
    const field = this.registrationForm.get(fieldName);

    return field?.invalid && field?.touched;
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordFieldType = this.isPasswordVisible ? 'text' : 'password';
  }

  public getPostalCodeErrorMessage() {
    const errors = this.registrationForm.get('address.postalCode')?.errors;

    return errors ? errors['message'] : '';
  }
}
