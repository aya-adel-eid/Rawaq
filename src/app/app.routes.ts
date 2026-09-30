import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  // auth routes
  {
    path: '',
    canActivate: [loggedGuard],
    loadComponent: () =>
      import('./core/layoute/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUtES),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashBoard/pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent,
      ),
  },
];
