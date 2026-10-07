import { Component, inject, OnInit, signal } from '@angular/core';
import { JoinRequestsCardComponent } from '../../components/join-requests-card/join-requests-card.component';
import { GroupService } from '../../services/group.service';
import { IAllGroupJoinReq } from '../../interfaces/IAllGroupJoinReq';

@Component({
  selector: 'app-join-requests',
  imports: [JoinRequestsCardComponent],
  templateUrl: './join-requests.component.html',
  styleUrl: './join-requests.component.css',
})
export class JoinRequestsComponent implements OnInit {
  private readonly groupService = inject(GroupService);
  allGroupJoinReq = signal<IAllGroupJoinReq[] | null>(null);
  ngOnInit(): void {
    this.getAllGroupJoinReq();
  }
  getAllGroupJoinReq() {
    this.groupService.getAllGroupJoinReq().subscribe({
      next: (resp) => {
        this.allGroupJoinReq.set(resp);
      },
    });
  }
}
