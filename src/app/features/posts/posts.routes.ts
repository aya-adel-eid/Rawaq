import { Routes } from '@angular/router';

export const Posts_Routes: Routes = [
  {
    path: ':groupId/posts',
    loadComponent: () =>
      import('./pages/group-posts-page/group-posts-page.component').then(
        (c) => c.GroupPostsPageComponent,
      ),
  },
];
