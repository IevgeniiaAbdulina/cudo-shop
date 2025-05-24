import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../core/auth/auth.service';
import { CustomerResponse } from '../../../core/auth/interfaces/customer-response';
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from '../../../shared/constants/regex';
import ERROR_MSG from '../../../shared/constants/error-message';
import { minimumAgeValidator } from '../../../shared/validator/validate.dob';
import { postalCodeValidator } from '../../../shared/validator/validate.postal-code';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public errMsg = ERROR_MSG;
  public registrationForm!: FormGroup;
  public passwordFieldType: string = 'password';
  public isPasswordVisible: boolean = false;
  public validCountries: string[] = ['Poland', 'Germany', 'USA'];
  public registrationError: string = '';
  public loginError: string = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

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
        useBillingAddress: [false],
        useShippingAddress: [false],
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
      let country = '';
      switch (this.registrationForm.value.address.country) {
        case 'Poland':
          country = 'PL';
          break;
        case 'Germany':
          country = 'GE';
          break;
        case 'USA':
          country = 'US';
          break;
        default:
          country = 'UNDEFINED';
          break;
      }
      const address = {
        streetName: this.registrationForm.value.address.street,
        city: this.registrationForm.value.address.city,
        postalCode: this.registrationForm.value.address.postalCode,
        country,
      };
      const userData = {
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        dateOfBirth: this.registrationForm.value.dob,
        addresses: [
          {
            ...address,
            isDefaultBillingAddress: this.registrationForm.value.address.useBillingAddress,
            isDefaultShippingAddress: this.registrationForm.value.address.useShippingAddress,
          },
        ],
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          const responseStr = JSON.stringify(response);
          const userResponse: CustomerResponse = JSON.parse(responseStr);
          alert(
            `Nice to meet you, ${userResponse.customer.firstName} ${userResponse.customer.lastName}! You have been successful registered!`,
          );
          console.log(userResponse);
          // Handle successful registration
          this.router.navigate(['/main']);
        },
        error: () => {
          // Handle registration error
          this.handleRegistrationError();
        },
      });
    }
  }

  private handleRegistrationError(): void {
    // Display user-friendly error messages
    if (!this.authService.isUserValid) {
      // it has an error on this moment
      // console.log('User is has');
      this.registrationError = this.errMsg.ERROR_REGISTRATION_MESSAGE;
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
