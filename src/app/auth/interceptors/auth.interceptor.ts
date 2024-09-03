import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    setParams: {
      client_id: environment.accessKey,
    },
  });

  return next(clonedRequest);
};
