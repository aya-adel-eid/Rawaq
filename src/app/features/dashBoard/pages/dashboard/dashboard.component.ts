import { Component } from '@angular/core';
import { FormGroupComponent } from '../../../groups/components/form-group/form-group.component';
import { GroupCardStudentComponent } from '../../../groups/components/group-card-student/group-card-student.component';

@Component({
  selector: 'app-dashboard',
  imports: [FormGroupComponent, GroupCardStudentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
