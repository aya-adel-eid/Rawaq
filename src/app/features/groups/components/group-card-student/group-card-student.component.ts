import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { IGroupStudent } from '../../interfaces/IGroupStudent';
import { DatePipe } from '@angular/common';
import { GroupService } from '../../services/group.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GroupStatus } from '../../interfaces/GroupStatues';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-group-card-student',
  imports: [DatePipe],
  templateUrl: './group-card-student.component.html',
  styleUrl: './group-card-student.component.css',
})
export class GroupCardStudentComponent {
  groupStudent = input.required<IGroupStudent>();
  private readonly groupService = inject(GroupService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toaster = inject(ToastrService);
  isRequesting = signal<boolean>(false);
  statusConfig: Record<GroupStatus, { label: string; classes: string }> = {
    not_member: {
      label: 'Request to Join',
      classes:
        'bg-primary text-white cursor-pointer hover:opacity-90 text-[0.875rem] leading-5 tracking-[0.14px]',
    },
    pending: {
      label: 'Pending Approval',
      classes:
        'bg-[#6F797A] py-3 text-[0.875rem] leading-5 tracking-[0.14px] text-white opacity-60 cursor-not-allowed',
    },
    member: {
      label: 'Open Group',
      classes:
        'bg-[#E6E3D04D]/30  text-primary border-2 py-3  text-[0.875rem] leading-5 tracking-[0.14px] border-primary cursor-pointer ',
    },
  };

  config = computed(() => this.statusConfig[this.groupStudent().status as GroupStatus]);
  progress = computed(() => {
    const g = this.groupStudent();
    if (!g.max_no_of_students) return 0;
    return Math.min((g.current_students_count / g.max_no_of_students) * 100, 100);
  });
  weeks = computed(() => {
    const d = this.groupStudent().duration_in_days;
    return d ? Math.ceil(d / 7) : null;
  });
  sendRequsetForJoinGroup() {
    const group = this.groupStudent();
    if (group.status !== 'not_member' || this.isRequesting()) return;

    this.isRequesting.set(true);
    this.groupService
      .sentRequestForJoinGroup(group.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toaster.success('Your request has been sent successfully.');
          this.isRequesting.set(false);
          console.log('success');
        },
        error: () => {
          this.isRequesting.set(false);
          this.toaster.error('Unable to send your request. Please try again.');
        },
      });
  }
}
