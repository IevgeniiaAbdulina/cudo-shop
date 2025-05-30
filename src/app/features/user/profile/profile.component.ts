import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserModel } from '../model/user-model';
import { UserResponse } from '../interfaces/user-response';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public user?: UserModel;

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.userService.getUserPersonalInfoByToken().subscribe({
      next: (response: UserResponse) => {
        console.log('[user profile page] response data: ', response);

        this.user = new UserModel(
          response.id,
          response.email,
          response.firstName,
          response.lastName,
          response.dateOfBirth,
          response.password,
          response.addresses,
        );
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
