import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';

import { authInterceptor } from './auth.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../auth/auth.service';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => TestBed.runInInjectionContext(() => authInterceptor(req, next));
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(withInterceptors([authInterceptor])), provideHttpClientTesting()],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should use authService', () => {
    expect(authService).toBeTruthy();
  });

  describe('making http calls', () => {
    it('should add Authorization header to the request', () => {
      const url = '/api/test';
      jest.spyOn(authService, 'login');
      const mockUser = { email: 'test@example.com', password: '123qweQWE' };
      authService.login(mockUser).subscribe((result) => {
        expect(result).toBeTruthy();
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.headers.get('Authorization')).toEqual('Basic mock_token');
      req.flush('HTTP for testing purposes');
    });
  });
});
