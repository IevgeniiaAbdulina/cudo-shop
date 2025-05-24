import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment.dev';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  console.log('[auth interceptor] procession url: ', req.url);

  if (req.url.includes(`${environment.authUrl}/oauth`)) {
    console.log('[auth interceptor] auth case: using clientID + secret for request: ', req.url);

    const token: string | null = authService.getToken(true);
    if (token) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', 'Basic ' + token),
      });

      return next(newReq);
    }
  } else {
    const token: string | null = authService.getToken(false);
    console.log('[auth interceptor] normal case: using access token for request: ', req.url);

    if (token) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });

      return next(newReq);
    }
  }

  return next(req);
};
