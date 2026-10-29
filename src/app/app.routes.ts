import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged-guard';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

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
    path: '',
    canActivate: [authGuard],
    canActivateChild: [roleGuard],
    loadComponent: () =>
      import('./core/layoute/main-layout/main-layout.component').then((c) => c.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',

        loadComponent: () =>
          import('./features/dashBoard/pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent,
          ),
      },
      {
        path: 'group',
        data: { roles: ['student', 'teacher'] },
        loadChildren: () => import('./features/groups/groups.routes').then((c) => c.GroupsRoutes),
      },

      {
        path: 'group',
        data: { roles: ['student'] },
        loadChildren: () => import('./features/posts/posts.routes').then((c) => c.Posts_Routes),
      },
      {
        path: '',
        data: { roles: ['teacher'] },
        loadChildren: () =>
          import('./features/members/members.routes').then((c) => c.MembersRoutes),
      },
      {
        path: 'groupTeacher',
        data: { roles: ['teacher'] },
        loadComponent: () =>
          import('./features/groups/pages/my-groups-teacher/my-groups-teacher.component').then(
            (c) => c.MyGroupsTeacherComponent,
          ),
      },
    ],
  },
];
