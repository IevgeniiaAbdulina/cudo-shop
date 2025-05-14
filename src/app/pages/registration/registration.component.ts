import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from '../../shared/constants/regex';
import ERROR_MSG from '../../shared/constants/error-message';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  errMsg = ERROR_MSG;
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
      firstName: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
      lastName: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
      dob: ['', Validators.required], // TODO
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
        postalCode: ['', Validators.required], // TODO
        country: ['', Validators.required], // TODO
      }),
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      // Handle form submission
      console.log(this.registrationForm.value);
    }
  }

  getFieldError(fieldName: string) {
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
}
