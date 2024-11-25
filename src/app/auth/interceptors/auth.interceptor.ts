import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // const token = authService.getToken();

  const clonedRequest = req.clone({
    // setHeaders: {
    //   ...(token ? { Authorization: `Bearer ${token.access_token}` } : {}),
    // },
  });

  return next(clonedRequest);
};
