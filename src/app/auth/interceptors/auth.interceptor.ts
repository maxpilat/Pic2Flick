import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Token } from '../models/auth.model';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token');

  if (token) {
    token = (JSON.parse(localStorage.getItem('token')) as Token).access_token;
  }

  const clonedRequest = req.clone({
    setParams: {
      client_id: environment.accessKey,
    },
    setHeaders: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return next(clonedRequest);
};
