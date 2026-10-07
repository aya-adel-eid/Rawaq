import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IGroupData } from '../interfaces/IGroupData';
import { API_KEYS } from '../../../core/constants/API_KEYS';
import { IGroupStudent } from '../interfaces/IGroupStudent';
import { tap } from 'rxjs';
import { IAllGroupJoinReq } from '../interfaces/IAllGroupJoinReq';
import { ImyGroups } from '../interfaces/IMyGroups';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly httpClinet = inject(HttpClient);
  allGroupsStudent = signal<IGroupStudent[] | null>(null);
  isLoadingGroupsStudent = signal<boolean>(false);
  hasErrorGroupsStudent = signal<boolean>(false);
  allGroupJoinReq = signal<IAllGroupJoinReq[] | null>(null);
  hasErrorGroupJoinReq = signal<boolean>(false);
  isLoaddingGroupJoinReq = signal<boolean>(false);
  allMyGroupsStudentJoined = signal<ImyGroups[] | null>(null);
  isLoadingMyGroupsJoined = signal<boolean>(false);
  hasErrorMyGroupsJoined = signal<boolean>(false);
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
    this.isLoaddingGroupJoinReq.set(true);
    this.hasErrorGroupJoinReq.set(false);
    return this.httpClinet.get<IAllGroupJoinReq[]>(API_KEYS.dashboard.allGroupJoinReq).subscribe({
      next: (resp) => {
        this.allGroupJoinReq.set(resp);
        this.isLoaddingGroupJoinReq.set(false);
      },
      error: () => {
        this.hasErrorGroupJoinReq.set(true);
        this.isLoaddingGroupJoinReq.set(false);
      },
    });
  }
  AcceptJoinReq(groupId: string) {
    return this.httpClinet
      .post(API_KEYS.dashboard.acceptJoinReq, { p_request_id: groupId })
      .pipe(tap(() => this.removeRequest(groupId)));
  }
  rejectJoinReq(groupId: string) {
    return this.httpClinet
      .post(API_KEYS.dashboard.rejectJoinReq, { p_request_id: groupId })
      .pipe(tap(() => this.removeRequest(groupId)));
  }
  removeRequest(requestId: string) {
    this.allGroupJoinReq.update((list) => (list ?? []).filter((r) => r.id !== requestId));
  }
  getAllMyGroupsStudentJoined() {
    this.isLoadingMyGroupsJoined.set(true);
    this.hasErrorMyGroupsJoined.set(false);
    return this.httpClinet.get<ImyGroups[]>(API_KEYS.dashboard.myGroupsStudentJoined).subscribe({
      next: (resp) => {
        this.allMyGroupsStudentJoined.set(resp);
        this.isLoadingMyGroupsJoined.set(false);
        this.hasErrorMyGroupsJoined.set(false);
      },
      error: () => {
        this.isLoadingMyGroupsJoined.set(false);
        this.hasErrorMyGroupsJoined.set(true);
      },
    });
  }
}
