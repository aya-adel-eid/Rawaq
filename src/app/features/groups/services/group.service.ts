import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IGroupData } from '../interfaces/IGroupData';
import { API_KEYS } from '../../../core/constants/API_KEYS';
import { IGroupStudent } from '../interfaces/IGroupStudent';
import { tap } from 'rxjs';
import { IAllGroupJoinReq } from '../interfaces/IAllGroupJoinReq';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly httpClinet = inject(HttpClient);
  allGroupsStudent = signal<IGroupStudent[] | null>(null);
  isLoadingGroupsStudent = signal<boolean>(false);
  hasErrorGroupsStudent = signal<boolean>(false);
  createNewGroup(groupData: IGroupData) {
    return this.httpClinet.post(API_KEYS.dashboard.newGroup, groupData);
  }
  getAllGroupsStudent() {
    this.isLoadingGroupsStudent.set(true);
    this.hasErrorGroupsStudent.set(false);
    return this.httpClinet
      .get<IGroupStudent[]>(API_KEYS.dashboard.allGroupsStudent)

      .subscribe({
        next: (resp) => {
          this.isLoadingGroupsStudent.set(false);
          this.allGroupsStudent.set(resp);
        },
        error: () => {
          this.isLoadingGroupsStudent.set(false);
          this.hasErrorGroupsStudent.set(true);
        },
      });
  }
  sentRequestForJoinGroup(groupId: string) {
    return this.httpClinet
      .post(API_KEYS.dashboard.GroupJoinRequests, {
        group_id: groupId,
      })
      .pipe(
        tap(() =>
          this.allGroupsStudent.update((groups) =>
            (groups ?? []).map((g) =>
              g.id === groupId ? { ...g, status: 'pending' as const } : g,
            ),
          ),
        ),
      );
  }
  getAllGroupJoinReq() {
    return this.httpClinet.get<IAllGroupJoinReq[]>(API_KEYS.dashboard.allGroupJoinReq);
  }
}
