import { Component, inject, OnInit } from '@angular/core';
import { JoinRequestsCardComponent } from '../../components/join-requests-card/join-requests-card.component';
import { ShowErrorComponent } from '../../../../shared/components/show-error/show-error.component';
import { JoinGroupReqSkeletonComponent } from '../../components/join-group-req-skeleton/join-group-req-skeleton.component';
import { MembersService } from '../../service/members.service';

@Component({
  selector: 'app-join-requests',
  imports: [JoinRequestsCardComponent, ShowErrorComponent, JoinGroupReqSkeletonComponent],
  templateUrl: './join-requests.component.html',
  styleUrl: './join-requests.component.css',
})
export class JoinRequestsComponent implements OnInit {
  private readonly membersService = inject(MembersService);
  allGroupJoinReq = this.membersService.allGroupJoinReq;
  hasError = this.membersService.hasErrorGroupJoinReq;
  isLoadding = this.membersService.isLoaddingGroupJoinReq;
  ngOnInit(): void {
    this.getAllGroupJoinReq();
  }
  getAllGroupJoinReq() {
    this.isLoadding.set(true);
    this.hasError.set(false);
    this.membersService.getAllGroupJoinReq();
  }
}
