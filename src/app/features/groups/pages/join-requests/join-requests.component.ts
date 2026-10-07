import { Component, inject, OnInit } from '@angular/core';
import { JoinRequestsCardComponent } from '../../components/join-requests-card/join-requests-card.component';
import { GroupService } from '../../services/group.service';
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
  allGroupJoinReq = this.groupService.allGroupJoinReq;
  hasError = this.groupService.hasErrorGroupJoinReq;
  isLoadding = this.groupService.isLoaddingGroupJoinReq;
  ngOnInit(): void {
    this.getAllGroupJoinReq();
  }
  getAllGroupJoinReq() {
    this.isLoadding.set(true);
    this.hasError.set(false);
    this.groupService.getAllGroupJoinReq();
  }
}
