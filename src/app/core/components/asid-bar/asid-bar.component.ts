import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { STORED_KEY } from '../../constants/STORED_KEYS';

@Component({
  selector: 'app-asid-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './asid-bar.component.html',
  styleUrl: './asid-bar.component.css',
})
export class AsidBarComponent implements OnInit {
  private readonly plat_Id = inject(PLATFORM_ID);
  role = signal<string>('');
  teacher = [
    {
      label: 'My Groups',
      route: '/teacher/groups',
      icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    },
    {
      label: 'Join Requests',
      route: '/teacher/requests',
      icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6',
    },
    {
      label: 'Group Assignments',
      route: '/teacher/assignments',
      icon: 'M8 2h8v4H8zM16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M12 11h4M12 16h4',
    },
    {
      label: 'Group Students',
      route: '/teacher/students',
      icon: 'M22 10 12 5 2 10l10 5 10-5zM6 12.5V16a6 3 0 0 0 12 0v-3.5',
    },
    { label: 'Group Posts', route: '/teacher/posts', icon: 'M10 8h12v12H10zM4 16V4h12' },
    {
      label: 'Create New Post',
      route: '/teacher/posts/new',
      icon: 'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.4 2.6a2 2 0 0 1 3 3L12 15l-4 1 1-4z',
    },
  ];
  student = [
    {
      label: 'dashboard',
      route: '/',
      icon: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z',
    },
    {
      label: 'Explore Groups',
      route: '/student/explore',
      icon: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z',
    },
    {
      label: 'My Groups',
      route: '/student/groups',
      icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    },
    {
      label: 'My Calendar',
      route: '/student/calendar',
      icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    },
    { label: 'Group Posts', route: '/student/posts', icon: 'M10 8h12v12H10zM4 16V4h12' },
    {
      label: 'Group Assignments',
      route: '/student/assignments',
      icon: 'M8 2h8v4H8zM16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M12 11h4M12 16h4',
    },
    {
      label: 'Create New Post',
      route: '/student/posts/new',
      icon: 'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.4 2.6a2 2 0 0 1 3 3L12 15l-4 1 1-4z',
    },
  ];
  ngOnInit(): void {
    if (isPlatformBrowser(this.plat_Id)) {
      this.role.set(
        localStorage.getItem(STORED_KEY.role)! || sessionStorage.getItem(STORED_KEY.role)!,
      );
    }
  }
}
