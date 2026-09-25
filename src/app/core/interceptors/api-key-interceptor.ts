import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    setHeaders: {
      apikey: environment.anonKey,
    },
  });
  return next(req);
};
