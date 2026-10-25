import { Component, inject, OnInit } from '@angular/core';
import { GroupCardTeacherComponent } from '../../components/group-card-teacher/group-card-teacher.component';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-my-groups-teacher',
  imports: [GroupCardTeacherComponent],
  templateUrl: './my-groups-teacher.component.html',
  styleUrl: './my-groups-teacher.component.css',
})
export class MyGroupsTeacherComponent implements OnInit {
  private readonly groupService = inject(GroupService);
  allGroupsTeacher = this.groupService.allMyGroupsTeacher;
  ngOnInit(): void {
    this.groupService.getAllMyGroupsTeacher();
  }
}
