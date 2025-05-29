import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment.dev';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.url.includes(`${environment.authUrl}/oauth`)) {
    const token: string | null = authService.getToken(true);
    if (token) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', 'Basic ' + token),
      });

      return next(newReq);
    }
  } else {
    const token: string | null = authService.getToken(false);

    if (token) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });

      return next(newReq);
    }
  }

  return next(req);
};
