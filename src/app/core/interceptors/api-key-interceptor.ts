import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req);
  if (req.urlWithParams.includes('uploads')) {
    return next(req);
  }
  req = req.clone({
    setHeaders: {
      apikey: environment.anonKey,
    },
  });
  return next(req);
};
