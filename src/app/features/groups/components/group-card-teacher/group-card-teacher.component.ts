import { Component, input } from '@angular/core';
import { IGroupTeacher } from '../../interfaces/IGroupTeacher';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-group-card-teacher',
  imports: [DatePipe],
  templateUrl: './group-card-teacher.component.html',
  styleUrl: './group-card-teacher.component.css',
})
export class GroupCardTeacherComponent {
  group = input<IGroupTeacher>();
}
