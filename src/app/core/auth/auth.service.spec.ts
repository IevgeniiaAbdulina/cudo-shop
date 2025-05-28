import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { CustomerService } from '../customer/customer.service';
import { UserResponse } from './interfaces/user-response';
import { CustomerResponse } from '../customer/interfaces/customer-response';
import { environment } from '../../../environments/environment.dev';
import API_ENDPOINT from '../../shared/constants/api-endpoint';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let storageService: StorageService; // eslint-disable-line @typescript-eslint/no-unused-vars
  let customerService: CustomerService; // eslint-disable-line @typescript-eslint/no-unused-vars

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, StorageService, CustomerService, { provide: Router, useValue: { navigate: jest.fn() } }],
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
});
