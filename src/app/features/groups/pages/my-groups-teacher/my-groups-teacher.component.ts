import { Component, inject, OnInit } from '@angular/core';
import { GroupCardTeacherComponent } from '../../components/group-card-teacher/group-card-teacher.component';
import { GroupService } from '../../services/group.service';
import { RouterLink } from '@angular/router';
import { ShowErrorComponent } from '../../../../shared/components/show-error/show-error.component';
import { MyGroupsCardStudentSkeletoneComponent } from '../../components/my-groups-card-student-skeletone/my-groups-card-student-skeletone.component';

@Component({
  selector: 'app-my-groups-teacher',
  imports: [
    GroupCardTeacherComponent,
    RouterLink,
    ShowErrorComponent,
    MyGroupsCardStudentSkeletoneComponent,
  ],
  templateUrl: './my-groups-teacher.component.html',
  styleUrl: './my-groups-teacher.component.css',
})
export class MyGroupsTeacherComponent implements OnInit {
  private readonly groupService = inject(GroupService);
  allGroupsTeacher = this.groupService.allMyGroupsTeacher;
  hasError = this.groupService.hasErrorMyGroupsTeacher;
  ngOnInit(): void {
    this.getAllMyGroupsTeacher();
  }
  getAllMyGroupsTeacher() {
    this.groupService.getAllMyGroupsTeacher();
  }
}
