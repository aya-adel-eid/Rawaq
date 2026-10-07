import { Component, inject, OnInit, signal } from '@angular/core';
import { JoinRequestsCardComponent } from '../../components/join-requests-card/join-requests-card.component';
import { GroupService } from '../../services/group.service';
import { IAllGroupJoinReq } from '../../interfaces/IAllGroupJoinReq';
import { ShowErrorComponent } from '../../../../shared/components/show-error/show-error.component';
import { JoinGroupReqSkeletonComponent } from '../../components/join-group-req-skeleton/join-group-req-skeleton.component';

@Component({
  selector: 'app-join-requests',
  imports: [JoinRequestsCardComponent, ShowErrorComponent, JoinGroupReqSkeletonComponent],
  templateUrl: './join-requests.component.html',
  styleUrl: './join-requests.component.css',
})
export class JoinRequestsComponent implements OnInit {
  private readonly groupService = inject(GroupService);
  allGroupJoinReq = signal<IAllGroupJoinReq[] | null>(null);
  hasError = signal<boolean>(false);
  isLoadding = signal<boolean>(false);
  ngOnInit(): void {
    this.getAllGroupJoinReq();
  }
  getAllGroupJoinReq() {
    this.isLoadding.set(true);
    this.hasError.set(false);
    this.groupService.getAllGroupJoinReq().subscribe({
      next: (resp) => {
        this.allGroupJoinReq.set(resp);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoadding.set(false);
      },
    });
  }
}
