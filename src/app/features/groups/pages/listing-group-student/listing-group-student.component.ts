import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
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
  allGroups = this.groupService.allGroupsStudent;
  isLoading = this.groupService.isLoadingGroupsStudent;
  hasError = this.groupService.hasErrorGroupsStudent;
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getAllGroups();
  }
  getAllGroups() {
    this.groupService.getAllGroupsStudent();
  }
  sendRequsetForJoinGroup() {}
}
