import { Component, input } from '@angular/core';
import { ImyGroups } from '../../interfaces/IMyGroups';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-groups-card-student',
  imports: [DatePipe, RouterLink],
  templateUrl: './my-groups-card-student.component.html',
  styleUrl: './my-groups-card-student.component.css',
})
export class MyGroupsCardStudentComponent {
  myGroup = input<ImyGroups>();
}
