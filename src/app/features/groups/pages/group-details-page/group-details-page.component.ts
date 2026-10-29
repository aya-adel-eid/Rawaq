import { Component, OnInit, signal } from '@angular/core';
import { STORED_KEY } from '../../../../core/constants/STORED_KEYS';
import { GroupDetailsStudentPageComponent } from '../group-details-student-page/group-details-student-page.component';
import { GroupDetailsTeacherPageComponent } from '../group-details-teacher-page/group-details-teacher-page.component';

@Component({
  selector: 'app-group-details-page',
  imports: [GroupDetailsStudentPageComponent, GroupDetailsTeacherPageComponent],
  templateUrl: './group-details-page.component.html',
  styleUrl: './group-details-page.component.css',
})
export class GroupDetailsPageComponent implements OnInit {
  role = signal<string>('');
  ngOnInit(): void {
    this.role.set(
      localStorage.getItem(STORED_KEY.role)! || sessionStorage.getItem(STORED_KEY.role)!,
    );
  }
}
