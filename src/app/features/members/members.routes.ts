import { Routes } from '@angular/router';

export const MembersRoutes: Routes = [
  {
    path: 'members',
    loadComponent: () =>
      import('./pages/join-requests/join-requests.component').then((c) => c.JoinRequestsComponent),
  },
];
