import { Routes } from '@angular/router';
import { resetPassGuard } from '../../core/guards/reset-pass-guard';
import { recoveryRedirectGuard } from '../../core/guards/recovery-redirect-guard';

export const AUTH_ROUtES: Routes = [
  {
    path: '',
    canActivate: [recoveryRedirectGuard],
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
    title: 'Sign In',
  },
  {
    path: 'sign-in',
    canActivate: [recoveryRedirectGuard],
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
    title: 'Sign In',
  },
  {
    path: 'sign-up',

    loadComponent: () =>
      import('./pages/register-page/register-page.component').then((m) => m.RegisterPageComponent),
    title: 'Sign Up',
  },

  {
    path: 'reset-password',
    canActivate: [resetPassGuard],
    loadComponent: () =>
      import('./pages/reset-password-page/reset-password-page.component').then(
        (m) => m.ResetPasswordPageComponent,
      ),
    title: 'Reset Password',
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password-page/forgot-password-page.component').then(
        (m) => m.ForgotPasswordPageComponent,
      ),
    title: 'Forgot Password',
  },
];
