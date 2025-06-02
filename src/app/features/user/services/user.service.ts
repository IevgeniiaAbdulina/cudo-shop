import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserResponse } from '../interfaces/user-response';
import { UserModel } from '../model/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly PROJECT_KEY: string = environment.projectKey;
  private readonly API_URL: string = environment.apiUrl;

  private baseUrl: string = `${this.API_URL}/${this.PROJECT_KEY}`;
  private userUrl: string = `${this.API_URL}/${this.PROJECT_KEY}/me`;

  constructor(private http: HttpClient) {}

  public getUserPersonalInfoByToken(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.userUrl);
  }

  public updateUserById(userData: UserModel | null): Observable<UserResponse> {
    let payload;
    let userId;

    if (userData) {
      const customerVersion = userData.version;
      userId = userData.id;

      payload = {
        version: customerVersion,
        actions: [
          {
            action: 'setFirstName',
            firstName: userData.firstName,
          },
          {
            action: 'setLastName',
            lastName: userData.lastName,
          },
          {
            action: 'changeEmail',
            email: userData.email,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth: userData.dateOfBirth,
          },
        ],
      };
    }

    return this.http.post<UserResponse>(`${this.baseUrl}/customers/${userId}`, payload);
  }
}
