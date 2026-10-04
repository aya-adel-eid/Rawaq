import { Component, inject, OnInit, signal } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { IGroupStudent } from '../../interfaces/IGroupStudent';
import { GroupCardStudentComponent } from '../../components/group-card-student/group-card-student.component';

@Component({
  selector: 'app-listing-group-student',
  imports: [GroupCardStudentComponent],
  templateUrl: './listing-group-student.component.html',
  styleUrl: './listing-group-student.component.css',
})
export class ListingGroupStudentComponent implements OnInit {
  private readonly groupService = inject(GroupService);
  allGroups = signal<IGroupStudent[] | null>(null);
  ngOnInit(): void {
    this.getAllGroups();
  }
  getAllGroups() {
    this.groupService.getAllGroupsStudent().subscribe({
      next: (resp) => {
        console.log(resp);
        this.allGroups.set(resp);
      },
    });
  }
}
