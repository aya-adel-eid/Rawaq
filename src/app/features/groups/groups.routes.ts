import { Routes } from '@angular/router';

export const GroupsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/listing-group-student/listing-group-student.component').then(
        (c) => c.ListingGroupStudentComponent,
      ),
  },
  {
    path: 'joined',
    loadComponent: () =>
      import('./pages/my-groups-page/my-groups-page.component').then(
        (c) => c.MyGroupsPageComponent,
      ),
  },
  {
    path: ':groupId',
    loadComponent: () =>
      import('./pages/group-details-page/group-details-page.component').then(
        (c) => c.GroupDetailsPageComponent,
      ),
  },
];
