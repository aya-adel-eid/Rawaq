import { Component } from '@angular/core';
import { FormGroupComponent } from '../../../groups/components/form-group/form-group.component';

@Component({
  selector: 'app-dashboard',
  imports: [FormGroupComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
