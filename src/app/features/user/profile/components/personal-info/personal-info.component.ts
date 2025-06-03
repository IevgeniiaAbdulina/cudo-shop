import { Component, input, OnInit, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { DatePipe, NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { UserModel } from '../../../model/user-model';
import { UserResponse } from '../../../interfaces/user-response';
import { UserService } from '../../../services/user.service';
import { EditModeModalComponent } from '../edit-mode-modal/edit-mode-modal.component';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EDIT_MODE_MSG } from '../../enums/edit-mode-messages';
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from '../../../../../shared/constants/regex';
import { minimumAgeValidator } from '../../../../../shared/validator/validate.dob';
import { ControlService } from '../../../services/control.service';
import ERROR_MSG from '../../../../../shared/constants/error-message';

@Component({
  selector: 'app-personal-info',
  imports: [ButtonComponent, DatePipe, TitleCasePipe, EditModeModalComponent, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent implements OnInit {
  public user: WritableSignal<UserModel | null> = signal<UserModel | null>(null);
  public modalIsClosed = input();

  public isModalVisible: boolean = false;
  public isPasswordModalVisible: boolean = false;
  public profileForm!: FormGroup;
  public passwordForm!: FormGroup;
  public isEditSuccess: boolean = false;
  public isChangePasswordSuccess: boolean = false;
  public showMessage: boolean = false;
  public changePasswordErrorMessage: boolean = false;

  protected readonly EDIT_MODE_MSG = EDIT_MODE_MSG;
  protected readonly ERROR_MSG = ERROR_MSG;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.profileForm = this.fb.group({
      email: [''],
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
    });

    this.passwordForm = this.fb.group({
      currentPassword: [''],
      newPassword: [''],
      confirmNewPassword: [''],
    });
  }

  public ngOnInit() {
    this.userService.getUserPersonalInfoByToken().subscribe({
      next: (response: UserResponse) => {
        this.user.set(
          new UserModel(
            response.version,
            response.id,
            response.email,
            response.firstName,
            response.lastName,
            response.dateOfBirth,
            response.password,
            response.addresses,
          ),
        );
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public changePasswordModeToggle(): void {
    this.isPasswordModalVisible = !this.isPasswordModalVisible;
  }

  public openPasswordModal(): void {
    this.setPasswordForm();
    this.changePasswordModeToggle();
  }

  public closePasswordModal(): void {
    this.passwordForm.reset();
    this.changePasswordModeToggle();
  }

  private setPasswordForm(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
      newPassword: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
      confirmNewPassword: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
    });
  }

  public onPasswordFormSubmit(): void {
    if (this.passwordForm.valid) {
      console.log('[edit-profile password] change password');

      this.isChangePasswordSuccess = true;
      this.showChangePasswordErrorMessage();
      this.closePasswordModal();
    } else {
      this.isChangePasswordSuccess = false;
      this.showChangePasswordErrorMessage();
    }
  }

  public editModeToggle(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  public openModal() {
    this.setEditModeValue();
    this.editModeToggle();
  }

  public closeModal(): void {
    this.profileForm.reset();
    this.editModeToggle();
  }

  public onFormSubmit(): void {
    if (this.profileForm.valid) {
      this.user.set(
        new UserModel(
          this.user()!.version,
          this.user()!.id,
          this.profileForm.value.email,
          this.profileForm.value.firstName,
          this.profileForm.value.lastName,
          this.profileForm.value.dateOfBirth,
          this.user()!.password,
          this.user()!.addresses,
        ),
      );

      this.userService.updateUserById(this.user()).subscribe({
        next: (response: UserResponse) => {
          console.log('[personal-info] update response: ', response);
        },
        error: (error) => {
          console.error(error);
        },
      });

      this.isEditSuccess = true;
      this.showEditModeMessage();
      this.closeModal();
    } else {
      this.isEditSuccess = false;
      this.showEditModeMessage();
    }
  }

  private setEditModeValue(): void {
    this.profileForm = this.fb.group({
      email: [this.user()?.email, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      firstName: [this.user()?.firstName, [Validators.required, Validators.pattern(NAME_REGEX)]],
      lastName: [this.user()?.lastName, [Validators.required, Validators.pattern(NAME_REGEX)]],
      dateOfBirth: [this.user()?.dateOfBirth, [Validators.required, minimumAgeValidator(18)]],
    });
  }

  private showEditModeMessage(): void {
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 3500);
  }

  private showChangePasswordErrorMessage(): void {
    this.changePasswordErrorMessage = true;

    setTimeout(() => {
      this.changePasswordErrorMessage = false;
    }, 3500);
  }

  public validationCheck(control: AbstractControl): boolean | null {
    return ControlService.validationChecks(control);
  }

  public getControlName(controlName: string): AbstractControl | null {
    return ControlService.getFormControl(this.profileForm, controlName);
  }

  public getPasswordControlName(controlName: string): AbstractControl | null {
    return ControlService.getFormControl(this.passwordForm, controlName);
  }
}
