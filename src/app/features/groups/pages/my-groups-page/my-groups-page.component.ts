import { Component, inject, OnInit } from '@angular/core';
import { MyGroupsCardStudentComponent } from '../../components/my-groups-card-student/my-groups-card-student.component';
import { GroupService } from '../../services/group.service';
import { ShowErrorComponent } from '../../../../shared/components/show-error/show-error.component';
import { MyGroupsCardStudentSkeletoneComponent } from '../../components/my-groups-card-student-skeletone/my-groups-card-student-skeletone.component';

@Component({
  selector: 'app-my-groups-page',
  imports: [
    MyGroupsCardStudentComponent,
    ShowErrorComponent,
    MyGroupsCardStudentSkeletoneComponent,
  ],
  templateUrl: './my-groups-page.component.html',
  styleUrl: './my-groups-page.component.css',
})
export class MyGroupsPageComponent implements OnInit {
  private readonly groupService = inject(GroupService);
  isLoadingMyGroups = this.groupService.isLoadingMyGroupsJoined;
  hasErrorMyGroups = this.groupService.hasErrorMyGroupsJoined;
  allMyGroups = this.groupService.allMyGroupsStudentJoined;
  ngOnInit(): void {
    this.getAllMyGroups();
  }
  getAllMyGroups() {
    this.groupService.getAllMyGroupsStudentJoined();
  }
}
