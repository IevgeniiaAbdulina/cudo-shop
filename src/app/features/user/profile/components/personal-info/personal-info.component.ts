import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { UserModel } from '../../../model/user-model';
import { UserResponse } from '../../../interfaces/user-response';
import { UserService } from '../../../services/user.service';
import { EditModeModalComponent } from '../edit-mode-modal/edit-mode-modal.component';

@Component({
  selector: 'app-personal-info',
  imports: [ButtonComponent, DatePipe, TitleCasePipe, EditModeModalComponent],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent implements OnInit {
  public user: WritableSignal<UserModel | null> = signal<UserModel | null>(null);

  public isModalVisible: boolean = false;

  constructor(private userService: UserService) {}

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
    this.editModeToggle();
  }

  public closeModal(): void {
    this.editModeToggle();
  }

  public submitForm(): void {
    console.log('[personal-info] submit form');
  }
}
