import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment.dev';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (req.url.includes(`${environment.authUrl}/oauth`)) {
    if (token) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', 'Basic ' + token),
      });

      return next(newReq);
    }
  } else {
    if (token) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });

      return next(newReq);
    }
  }

  return next(req);
};
