import { isPlatformBrowser } from '@angular/common';
import { Component, computed, effect, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { STORED_KEY } from '../../constants/STORED_KEYS';
import { AuthService } from '../../../features/auth/service/auth.service';
import { InitialsPipePipe } from '../../../shared/pipes/initials-pipe-pipe';

type UserRole = 'student' | 'teacher';

interface NavLink {
  label: string;
  route: string;
  icon: string;
  roles: UserRole[];
  exact?: boolean;
}

// نفس الـ routes اللي في app.routes + groups.routes + members.routes
const NAV_LINKS: NavLink[] = [
  {
    label: 'Dashboard',
    route: '/dashboard',
    icon: 'dashboard',
    roles: ['student', 'teacher'],
    exact: true,
  },

  // student
  { label: 'Explore Groups', route: '/group', icon: 'explore', roles: ['student'], exact: true },
  { label: 'My Groups', route: '/group/joined', icon: 'groups', roles: ['student'] },

  // teacher
  { label: 'Join Requests', route: '/members', icon: 'requst', roles: ['teacher'] },
];

@Component({
  selector: 'app-asid-bar',
  imports: [RouterLink, RouterLinkActive, InitialsPipePipe],
  templateUrl: './asid-bar.component.html',
  styleUrl: './asid-bar.component.css',
})
export class AsidBarComponent implements OnInit {
  private readonly plat_Id = inject(PLATFORM_ID);
  authService = inject(AuthService);
  userData = this.authService.userData;
  role = signal<UserRole | null>(null);
  constructor() {
    effect(() => console.log('userData changed:', this.userData()));
  }

  links = computed(() => {
    const role = this.role();
    return role ? NAV_LINKS.filter((l) => l.roles.includes(role)) : [];
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.plat_Id)) {
      console.log(this.userData());
      const stored =
        localStorage.getItem(STORED_KEY.role) ?? sessionStorage.getItem(STORED_KEY.role);
      this.role.set(stored === 'student' || stored === 'teacher' ? stored : null);
      this.authService.getUserData(this.authService.getToken()!);
    }
  }
}
