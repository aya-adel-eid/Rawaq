import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { STORED_KEY } from '../../constants/STORED_KEYS';
import { AuthService } from '../../../features/auth/service/auth.service';

@Component({
  selector: 'app-asid-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './asid-bar.component.html',
  styleUrl: './asid-bar.component.css',
})
export class AsidBarComponent implements OnInit {
  private readonly plat_Id = inject(PLATFORM_ID);
  authService = inject(AuthService);
  role = signal<string>('');
  teacher = [
    {
      label: 'My Groups',
      route: '/teacher/groups',
      icon: 'groups',
    },
    {
      label: 'Join Requests',
      route: '/teacher/requests',
      icon: 'requst',
    },
    {
      label: 'Group Assignments',
      route: '/teacher/assignments',
      icon: 'assignments',
    },
    {
      label: 'Group Students',
      route: '/teacher/students',
      icon: 'students',
    },
    { label: 'Group Posts', route: '/teacher/posts', icon: 'posts' },
    {
      label: 'Create New Post',
      route: '/teacher/posts/new',
      icon: 'newPost',
    },
  ];
  student = [
    {
      label: 'dashboard',
      route: '/',
      icon: 'dashboard',
    },
    {
      label: 'Explore Groups',
      route: '/student/explore',
      icon: 'explore',
    },
    {
      label: 'My Groups',
      route: '/student/groups',
      icon: 'groups',
    },
    {
      label: 'My Calendar',
      route: '/student/calendar',
      icon: 'calander',
    },
    { label: 'Group Posts', route: '/student/posts', icon: 'posts' },
    {
      label: 'Group Assignments',
      route: '/student/assignments',
      icon: 'assignments',
    },
    {
      label: 'Create New Post',
      route: '/student/posts/new',
      icon: 'newPost',
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
