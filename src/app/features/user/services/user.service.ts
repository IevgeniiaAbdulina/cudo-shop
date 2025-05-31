import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserResponse } from '../interfaces/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly PROJECT_KEY: string = environment.projectKey;
  private readonly API_URL: string = environment.apiUrl;

  private userUrl: string = `${this.API_URL}/${this.PROJECT_KEY}/me`;

  constructor(private http: HttpClient) {}

  public getUserPersonalInfoByToken(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.userUrl);
  }
}
