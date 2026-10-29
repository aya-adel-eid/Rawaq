import { Component, input } from '@angular/core';
import { IGroupTeacher } from '../../interfaces/IGroupTeacher';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-group-card-teacher',
  imports: [DatePipe, RouterLink],
  templateUrl: './group-card-teacher.component.html',
  styleUrl: './group-card-teacher.component.css',
})
export class GroupCardTeacherComponent {
  group = input<IGroupTeacher>();
}
