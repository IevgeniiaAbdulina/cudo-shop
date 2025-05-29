import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CustomerService } from './customer.service';
import { UserResponse } from '../auth/interfaces/user-response';
import { CustomerAction } from './interfaces/customer-action';
import { environment } from '../../../environments/environment.dev';
import API_ENDPOINT from '../../shared/constants/api-endpoint';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService],
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch customer by id', () => {
    const mockResponse: UserResponse = {
      id: '123',
      version: 1,
      firstName: 'John',
      lastName: 'Doe',
      addresses: [],
    };

    service.getCustomerById('123').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.CUSTOMERS}/123`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should update customer by id', () => {
    const mockResponse: UserResponse = {
      id: '123',
      version: 2,
      firstName: 'John',
      lastName: 'Doe',
      addresses: [],
    };

    const customerActions: CustomerAction[] = [{ action: 'updateAddress', addressId: '456' }];

    service.updateCustomerById('123', 1, customerActions).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/${environment.projectKey}/${API_ENDPOINT.CUSTOMERS}/123`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual({ version: 1, actions: customerActions });
    req.flush(mockResponse);
  });
});
