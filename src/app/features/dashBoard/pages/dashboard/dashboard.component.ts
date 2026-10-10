import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { STORED_KEY } from '../../../../core/constants/STORED_KEYS';
import { ListingGroupStudentComponent } from '../../../groups/pages/listing-group-student/listing-group-student.component';
import { FormGroupComponent } from '../../../groups/components/form-group/form-group.component';

@Component({
  selector: 'app-dashboard',
  imports: [ListingGroupStudentComponent, FormGroupComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly plat_id = inject(PLATFORM_ID);
  role = signal<string>('');
  ngOnInit(): void {
    if (isPlatformBrowser(this.plat_id)) {
      this.role.set(
        localStorage.getItem(STORED_KEY.role) ?? sessionStorage.getItem(STORED_KEY.role)!,
      );
    }
  }
}
