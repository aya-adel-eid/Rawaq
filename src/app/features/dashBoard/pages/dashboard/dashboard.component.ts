import { Component } from '@angular/core';
import { FormGroupComponent } from '../../../groups/components/form-group/form-group.component';
import { GroupCardStudentComponent } from '../../../groups/components/group-card-student/group-card-student.component';
import { ListingGroupStudentComponent } from '../../../groups/pages/listing-group-student/listing-group-student.component';
import { JoinRequestsComponent } from '../../../groups/pages/join-requests/join-requests.component';
import { MyGroupsCardStudentComponent } from '../../../groups/components/my-groups-card-student/my-groups-card-student.component';
import { MyGroupsPageComponent } from '../../../groups/pages/my-groups-page/my-groups-page.component';
import { GroupDetailsPageComponent } from '../../../groups/pages/group-details-page/group-details-page.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormGroupComponent,
    GroupCardStudentComponent,
    ListingGroupStudentComponent,
    JoinRequestsComponent,
    MyGroupsCardStudentComponent,
    MyGroupsPageComponent,
    GroupDetailsPageComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
