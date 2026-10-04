import { Component, computed, input } from '@angular/core';
import { IGroupStudent } from '../../interfaces/IGroupStudent';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-group-card-student',
  imports: [DatePipe],
  templateUrl: './group-card-student.component.html',
  styleUrl: './group-card-student.component.css',
})
export class GroupCardStudentComponent {
  groupStudent = input.required<IGroupStudent>();
  progress = computed(() => {
    const g = this.groupStudent();
    if (!g.max_no_of_students) return 0;
    return Math.min((g.current_students_count / g.max_no_of_students) * 100, 100);
  });
  weeks = computed(() => {
    const d = this.groupStudent().duration_in_days;
    return d ? Math.ceil(d / 7) : null;
  });
}
