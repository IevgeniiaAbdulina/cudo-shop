import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import ERROR_MSG from '../../../shared/constants/error-message';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../../shared/constants/regex';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: '../registration/registration.component.scss',
})
export class LoginComponent implements OnInit {
  public errMsg = ERROR_MSG;
  public loginForm!: FormGroup;
  public passwordFieldType: string = 'password';
  public isPasswordVisible: boolean = false;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      // Handle form submission
      console.log(this.loginForm.value);
    }
  }

  public getFieldError(fieldName: string) {
    let error = '';
    let field = this.loginForm.get(fieldName);
    if (!field) {
      field = this.loginForm.controls['address'].get(fieldName);
    }
    if (field?.errors) {
      error = Object.keys(field?.errors)[0];
    }

    return error;
  }

  public isFieldInvalid(fieldName: string): boolean | undefined {
    const field = this.loginForm.get(fieldName);

    return field?.invalid && field?.touched;
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordFieldType = this.isPasswordVisible ? 'text' : 'password';
  }
}
