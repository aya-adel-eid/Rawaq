import { Routes } from '@angular/router';

export const routes: Routes = [
  // auth routes
  {
    path: '',
    loadComponent: () =>
      import('./core/layoute/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUtES),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashBoard/pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent,
      ),
  },
];
