import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';

import { refreshTokenInterceptor } from './refresh-token.interceptor';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../auth/storage.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('refreshTokenInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => TestBed.runInInjectionContext(() => refreshTokenInterceptor(req, next));
  let authService: AuthService;
  let storageService: StorageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, StorageService, provideHttpClient(withInterceptors([refreshTokenInterceptor])), provideHttpClientTesting()],
    });
    authService = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService);
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

  it('should use storageService', () => {
    expect(storageService).toBeTruthy();
  });

  describe('making http calls', () => {
    it('should reset Authorization header to the request', () => {
      const url = '/api/test';
      jest.spyOn(authService, 'login');
      authService.refreshToken().subscribe((result) => {
        expect(result).toBeTruthy();
      });

      const req = httpTestingController.expectOne(url);
      expect(req.request.headers.get('Authorization')).toEqual('Bearer mock_token');
      req.flush('HTTP for testing purposes');
    });
  });
});
