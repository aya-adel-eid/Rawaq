import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);
  const refreshToken = authService.getRefreshToken();
  if (token && refreshToken) {
    return true;
  }
  return router.navigate(['/sign-in']);
};
