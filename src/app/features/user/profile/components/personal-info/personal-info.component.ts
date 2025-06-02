import { Component, input, OnInit, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { DatePipe, NgIf, TitleCasePipe } from '@angular/common';
import { UserModel } from '../../../model/user-model';
import { UserResponse } from '../../../interfaces/user-response';
import { UserService } from '../../../services/user.service';
import { EditModeModalComponent } from '../edit-mode-modal/edit-mode-modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EDIT_MODE_MSG } from '../../enums/edit-mode-messages';

@Component({
  selector: 'app-personal-info',
  imports: [ButtonComponent, DatePipe, TitleCasePipe, EditModeModalComponent, ReactiveFormsModule, NgIf],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent implements OnInit {
  public user: WritableSignal<UserModel | null> = signal<UserModel | null>(null);
  public modalIsClosed = input();

  public isModalVisible: boolean = false;
  public profileForm!: FormGroup;
  public isEditSuccess: boolean = false;
  public showMessage: boolean = false;

  protected readonly EDIT_MODE_MSG = EDIT_MODE_MSG;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required]],
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
    });
  }

  public ngOnInit() {
    this.userService.getUserPersonalInfoByToken().subscribe({
      next: (response: UserResponse) => {
        this.user.set(
          new UserModel(
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
      const editedUserInfo = {
        id: this.user()!.id,
        email: this.profileForm.value.email,
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        dateOfBirth: this.profileForm.value.dateOfBirth,
        password: this.user()!.password,
        addresses: this.user()!.addresses,
      };

      this.user.set(editedUserInfo);
      this.isEditSuccess = true;
    } else {
      this.isEditSuccess = false;
    }

    this.showEditModeMessage();
    this.closeModal();
  }

  private setEditModeValue(): void {
    this.profileForm = this.fb.group({
      email: [this.user()?.email],
      firstName: [this.user()?.firstName],
      lastName: [this.user()?.lastName],
      dateOfBirth: [this.user()?.dateOfBirth],
    });
  }

  private showEditModeMessage(): void {
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }
}
