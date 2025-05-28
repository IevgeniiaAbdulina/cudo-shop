import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { CustomerService } from '../customer/customer.service';
import { UserResponse } from './interfaces/user-response';
import { CustomerResponse } from '../customer/interfaces/customer-response';
import { environment } from '../../../environments/environment';
import API_ENDPOINT from '../../shared/constants/api-endpoint';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { AuthResponse } from './interfaces/auth-response';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let storageService: StorageService; // eslint-disable-line @typescript-eslint/no-unused-vars
  let customerService: CustomerService; // eslint-disable-line @typescript-eslint/no-unused-vars

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        StorageService,
        CustomerService,
        { provide: Router, useValue: { navigate: jest.fn() } },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService);
    customerService = TestBed.inject(CustomerService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use mock API_URL', () => {
    expect(environment.apiUrl).toBe('https://api.example.com');
  });

  it('should register a new user', () => {
    const mockUserData = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      addresses: [
        { streetName: '123 Main St', city: 'Anytown', postalCode: '12345', country: 'USA' },
        { streetName: '456 Elm St', city: 'Othertown', postalCode: '67890', country: 'USA' },
      ],
    };

    const mockCustomerResponse: CustomerResponse = {
      customer: {
        id: '123',
        version: 1,
        firstName: 'John',
        lastName: 'Doe',
        addresses: [
          { streetName: '123 Main St', city: 'Anytown', postalCode: '12345', country: 'USA', id: 'billingAddressId' },
          { streetName: '456 Elm St', city: 'Othertown', postalCode: '67890', country: 'USA', id: 'shippingAddressId' },
        ],
      },
    };

    const mockUpdateResponse: UserResponse = {
      id: '123',
      version: 2,
      firstName: 'John',
      lastName: 'Doe',
      addresses: [
        { streetName: '123 Main St', city: 'Anytown', postalCode: '12345', country: 'USA', id: 'billingAddressId' },
        { streetName: '456 Elm St', city: 'Othertown', postalCode: '67890', country: 'USA', id: 'shippingAddressId' },
      ],
    };

    service.register(mockUserData).subscribe((response) => {
      expect(response).toEqual(mockUpdateResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.CUSTOMERS}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockCustomerResponse);

    const updateReq = httpMock.expectOne(`${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.CUSTOMERS}/123`);
    expect(updateReq.request.method).toBe('POST');
    expect(updateReq.request.body).toEqual({
      version: 1,
      actions: [
        { action: 'setDefaultBillingAddress', addressId: 'billingAddressId' },
        { action: 'setDefaultShippingAddress', addressId: 'shippingAddressId' },
      ],
    });
    updateReq.flush(mockUpdateResponse);
  });

  it('should handle error during registration', () => {
    const mockUserData = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      addresses: [
        { streetName: '123 Main St', city: 'Anytown', postalCode: '12345', country: 'USA' },
        { streetName: '456 Elm St', city: 'Othertown', postalCode: '67890', country: 'USA' },
      ],
    };

    service.register(mockUserData).subscribe({
      error: (error) => {
        expect(error.message).toBe('Something went wrong; please try again later.');
      },
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.CUSTOMERS}`);
    expect(req.request.method).toBe('POST');
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
  });

  describe('login', () => {
    const userCredentials = { email: 'test@example.com', password: '123qweQWE' };
    const reqBody = 'grant_type=password&username=test%40example.com&password=123qweQWE';
    const loginUrl = `${environment.authUrl}/oauth/${environment.projectKey}/customers/token`;

    it('should authorize user', () => {
      const initToken: boolean = false;
      let token: string | null = null;

      service.login(userCredentials).subscribe((response: AuthResponse) => {
        token = response.access_token;
      });

      const req = httpMock.expectOne(loginUrl);
      req.flush(userCredentials);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(reqBody);
      expect(service.getToken(initToken)).toEqual(token);
      httpMock.verify();
    });

    it('throws an error if request fails', () => {
      let actualError: HttpErrorResponse | undefined;

      service.login(userCredentials).subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          actualError = error;
        },
      });

      const req = httpMock.expectOne(loginUrl);
      req.flush('Server error', {
        status: 500,
        statusText: 'Unprocessable entity',
      });

      if (!actualError) {
        throw new Error('Error needs to be defined');
      }
      expect(actualError.status).toEqual(500);
      expect(actualError.statusText).toEqual('Unprocessable entity');
    });
  });

  describe('refreshToken', () => {
    const refreshTokenUrl = `${environment.authUrl}/oauth/token`;

    it('should refresh client authorization', () => {
      let token: string | undefined;
      const response: AuthResponse = {
        access_token: 'string',
        token_type: 'string',
        expires_in: 0,
        scope: 'string',
        refresh_token: 'refreshToken',
      };
      service.refreshToken().subscribe((response) => {
        token = response.refresh_token;
      });
      const req = httpMock.expectOne(refreshTokenUrl);
      req.flush(response);

      expect(token).toEqual('refreshToken');
    });
  });
});
