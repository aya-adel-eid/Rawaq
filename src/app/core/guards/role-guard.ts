import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { STORED_KEY } from '../constants/STORED_KEYS';

export type UserRole = 'student' | 'teacher';

const ROLE_HOME: Record<UserRole, string> = {
  student: '/group',
  teacher: '/members',
};

const isRole = (v: unknown): v is UserRole => v === 'student' || v === 'teacher';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  const stored = localStorage.getItem(STORED_KEY.role) ?? sessionStorage.getItem(STORED_KEY.role);
  const role = isRole(stored) ? stored : null;

  // أقرب roles في السلسلة من الـ root للـ route الحالي
  const allowed = route.pathFromRoot
    .map((r) => r.data['roles'] as UserRole[] | undefined)
    .filter((r): r is UserRole[] => Array.isArray(r))
    .pop();

  if (!allowed?.length) return true;
  if (role && allowed.includes(role)) return true;

  return router.createUrlTree([role ? ROLE_HOME[role] : '/sign-in']);
};
