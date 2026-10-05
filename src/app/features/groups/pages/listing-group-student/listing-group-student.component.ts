import { Component, inject, OnInit, signal } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { IGroupStudent } from '../../interfaces/IGroupStudent';
import { GroupCardStudentComponent } from '../../components/group-card-student/group-card-student.component';
import { GroupCardStudentSkeletonComponent } from '../../components/group-card-student-skeleton/group-card-student-skeleton.component';
import { ShowErrorComponent } from '../../../../shared/components/show-error/show-error.component';

@Component({
  selector: 'app-listing-group-student',
  imports: [GroupCardStudentComponent, GroupCardStudentSkeletonComponent, ShowErrorComponent],
  templateUrl: './listing-group-student.component.html',
  styleUrl: './listing-group-student.component.css',
})
export class ListingGroupStudentComponent implements OnInit {
  private readonly groupService = inject(GroupService);
  allGroups = signal<IGroupStudent[] | null>(null);
  isLoading = signal<boolean>(false);
  hasError = signal<boolean>(false);
  ngOnInit(): void {
    this.getAllGroups();
  }
  getAllGroups() {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.groupService.getAllGroupsStudent().subscribe({
      next: (resp) => {
        this.isLoading.set(false);
        this.allGroups.set(resp);
      },
      error: () => {
        this.isLoading.set(false);
        this.hasError.set(true);
      },
    });
  }
}
