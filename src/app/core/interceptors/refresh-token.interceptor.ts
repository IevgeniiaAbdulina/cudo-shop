import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../auth/storage.service';
import { environment } from '../../../environments/environment.dev';
import { switchMap } from 'rxjs';
import { AuthResponse } from '../auth/interfaces/auth-response';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const storageService: StorageService = inject(StorageService);
  const expiresAt: number = storageService.getExpirationDate();

  if (!req.url.includes(`${environment.authUrl}/oauth`)) {
    if (Date.now() / 1000 > expiresAt) {
      return authService.refreshToken().pipe(
        switchMap((token: AuthResponse) => {
          const newReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token.access_token),
          });

          return next(newReq);
        }),
      );
    } else {
      console.log('[refresh token interceptor] is ok');
    }
  }

  return next(req);
};
