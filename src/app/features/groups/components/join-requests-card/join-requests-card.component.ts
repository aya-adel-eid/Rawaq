import { Component, HostListener, inject, input, signal } from '@angular/core';
import { IAllGroupJoinReq } from '../../interfaces/IAllGroupJoinReq';
import { InitialsPipePipe } from '../../../../shared/pipes/initials-pipe-pipe';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago-pipe';
import { GroupService } from '../../services/group.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-join-requests-card',
  imports: [InitialsPipePipe, TimeAgoPipe],
  templateUrl: './join-requests-card.component.html',
  styleUrl: './join-requests-card.component.css',
})
export class JoinRequestsCardComponent {
  private readonly groupService = inject(GroupService);
  private readonly toaster = inject(ToastrService);
  allGroupJoinReq = input<IAllGroupJoinReq[]>();
  columns = [
    { label: 'Student', align: 'text-left' },
    { label: 'Group Name', align: 'text-left' },
    { label: 'Requested', align: 'text-left' },
    { label: 'Actions', align: 'text-right' },
  ];
  openMenuId = signal<string | null>(null);

  toggleMenu(id: string) {
    this.openMenuId.update((current) => (current === id ? null : id));
  }

  @HostListener('document:click')
  closeMenu() {
    this.openMenuId.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.openMenuId.set(null);
  }
  acceptJoinReq(groupId: string) {
    this.groupService.AcceptJoinReq(groupId).subscribe({
      next: () => {
        this.toaster.success('Student added to group successfully');
      },
      error: (error: HttpErrorResponse) => {
        this.toaster.error(error.error.message);
      },
    });
  }
}
