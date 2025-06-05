import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserResponse } from '../interfaces/user-response';
import { UserModel } from '../model/user-model';
import { Address } from '../../../core/model/address';
import { countryNameCode } from '../../../shared/utils/country-to-code';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly PROJECT_KEY: string = environment.projectKey;
  private readonly API_URL: string = environment.apiUrl;
  private UUID: string | null = null;

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

  public changeUserPassword(id: string, version: number, currentPassword: string, newPassword: string): Observable<UserResponse> {
    const body = {
      id: id,
      version: version,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    return this.http.post<UserResponse>(`${this.baseUrl}/customers/password`, JSON.stringify(body));
  }

  public addAddress(id: string, version: number, address: Address): Observable<UserResponse> {
    this.UUID = self.crypto.randomUUID();

    const body = {
      version: version,
      actions: [
        {
          action: 'addAddress',
          address: {
            key: this.UUID,
            firstName: address.firstName,
            lastName: address.lastName,
            streetName: address.streetName,
            postalCode: address.postalCode,
            city: address.city,
            country: countryNameCode(address.country),
          },
        },
      ],
    };

    return this.http.post<UserResponse>(`${this.baseUrl}/customers/${id}`, JSON.stringify(body));
  }

  public findAddressByKey(addresses: Address[]): Address | undefined {
    return addresses.find((addresses: Address) => addresses.key === this.UUID);
  }

  public addShippingAddress(id: string, version: number, addressId: string | undefined): Observable<UserResponse> {
    const body = {
      version: version,
      actions: [
        {
          action: 'addShippingAddressId',
          addressId: addressId,
        },
      ],
    };

    return this.http.post<UserResponse>(`${this.baseUrl}/customers/${id}`, JSON.stringify(body));
  }

  public setDefaultShippingAddress(id: string, version: number, addressId: string | undefined): Observable<UserResponse> {
    const body = {
      version: version,
      actions: [
        {
          action: 'setDefaultShippingAddress',
          addressId: addressId,
        },
      ],
    };

    return this.http.post<UserResponse>(`${this.baseUrl}/customers/${id}`, JSON.stringify(body));
  }

  public addBillingAddress(id: string, version: number, addressId: string | undefined): Observable<UserResponse> {
    const body = {
      version: version,
      actions: [
        {
          action: 'addBillingAddressId',
          addressId: addressId,
        },
      ],
    };

    return this.http.post<UserResponse>(`${this.baseUrl}/customers/${id}`, JSON.stringify(body));
  }

  public setDefaultBillingAddress(id: string, version: number, addressId: string | undefined): Observable<UserResponse> {
    const body = {
      version: version,
      actions: [
        {
          action: 'setDefaultBillingAddress',
          addressId: addressId,
        },
      ],
    };

    return this.http.post<UserResponse>(`${this.baseUrl}/customers/${id}`, JSON.stringify(body));
  }
}
