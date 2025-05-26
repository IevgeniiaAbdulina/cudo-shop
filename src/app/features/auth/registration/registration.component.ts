import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../core/auth/auth.service';
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from '../../../shared/constants/regex';
import ERROR_MSG from '../../../shared/constants/error-message';
import { minimumAgeValidator } from '../../../shared/validator/validate.dob';
import { postalCodeValidator } from '../../../shared/validator/validate.postal-code';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { Address } from '../../../core/model/address';
import { User } from '../../../core/model/user';
import { UserResponse } from '../../../core/auth/interfaces/user-response';

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
      billingAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
        postalCode: ['', [Validators.required, postalCodeValidator()]],
        country: ['', Validators.required],
        useAsShippingAddress: [false],
      }),
      shippingAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
        postalCode: ['', [Validators.required, postalCodeValidator()]],
        country: ['', Validators.required],
      }),
    });

    this.addListeners();
  }

  public addListeners() {
    const billingCountryValueChangesSubscription = this.registrationForm.get('billingAddress.country')?.valueChanges.subscribe(() => {
      this.registrationForm.get('billingAddress.postalCode')?.updateValueAndValidity();
    });

    if (billingCountryValueChangesSubscription) {
      this.subscription.add(billingCountryValueChangesSubscription);
    }

    const shippingCountryValueChangesSubscription = this.registrationForm.get('shippingAddress.country')?.valueChanges.subscribe(() => {
      this.registrationForm.get('shippingAddress.postalCode')?.updateValueAndValidity();
    });

    if (shippingCountryValueChangesSubscription) {
      this.subscription.add(shippingCountryValueChangesSubscription);
    }

    const billingAddressValueChangesSubscription = this.registrationForm.get('billingAddress')?.valueChanges.subscribe(() => {
      const useAsShippingAddress = this.registrationForm.get('billingAddress.useAsShippingAddress')?.value;
      if (useAsShippingAddress) {
        this.copyBillingToShipping();
      }
    });

    if (billingAddressValueChangesSubscription) {
      this.subscription.add(billingAddressValueChangesSubscription);
    }
  }

  public copyBillingToShipping() {
    const billingAddress = this.registrationForm.get('billingAddress')?.value;
    this.registrationForm.get('shippingAddress')?.patchValue({
      street: billingAddress.street,
      city: billingAddress.city,
      postalCode: billingAddress.postalCode,
      country: billingAddress.country,
    });
  }

  public isBillingAddressValid(): boolean {
    return this.registrationForm.get('billingAddress')?.valid || false;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSubmit(): void {
    if (this.registrationForm.valid) {
      const userData = this.getUserData();

      this.authService.register(userData, this.registrationForm.value.address.useAsShippingAddress).subscribe({
        next: (response) => {
          const responseStr = JSON.stringify(response);
          const userResponse: UserResponse = JSON.parse(responseStr);
          alert(
            // TODO : create more attractive message to user
            `Nice to meet you, ${userResponse.firstName} ${userResponse.lastName}! You have been successfully registered!`,
          );
          this.authService.login({ email: userData.email, password: userData.password }).subscribe({
            next: () => {
              this.router.navigate(['/main']);
            },
            error: (error) => {
              this.handleLoginError(error);
            },
          });
        },
        error: () => {
          // Handle registration error
          this.handleRegistrationError();
        },
      });
    }
  }

  private getCountryCode(countryName: string): string {
    let country = '';
    switch (countryName) {
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

    return country;
  }

  private getUserData(): User {
    const billingAddress: Address = {
      streetName: this.registrationForm.value.address.street,
      city: this.registrationForm.value.address.city,
      postalCode: this.registrationForm.value.address.postalCode,
      country: this.getCountryCode(this.registrationForm.value.address.country),
    };
    const shippingAddress: Address = {
      streetName: this.registrationForm.value.shippingAddress.street,
      city: this.registrationForm.value.shippingAddress.city,
      postalCode: this.registrationForm.value.shippingAddress.postalCode,
      country: this.getCountryCode(this.registrationForm.value.shippingAddress.country),
    };

    return {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      dateOfBirth: this.registrationForm.value.dob,
      addresses: [billingAddress, shippingAddress],
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client-side or network error
      console.error('An error occurred:', error.error);
    } else {
      // Backend returned unsuccessful response
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }

    return new Error('Something went wrong; please try again later.');
  }

  private handleLoginError(error: HttpErrorResponse): void {
    // Display user-friendly error messages
    this.loginError = 'Login failed. Please try again.';
    console.log(this.loginError); // TODO
    this.handleError(error);
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
    const field = this.registrationForm.get(fieldName);
    if (field?.errors) {
      error = Object.keys(field?.errors)[0];
    }

    return error;
  }

  public isFieldInvalid(fieldName: string): boolean | undefined {
    const field = this.registrationForm.get(fieldName);

    return field?.invalid && (field?.dirty || field?.touched);
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordFieldType = this.isPasswordVisible ? 'text' : 'password';
  }
  public getPostalCodeErrorMessage(fieldPath: string): string {
    const errors = this.registrationForm.get(fieldPath)?.errors;

    return errors ? errors['message'] : '';
  }
}
