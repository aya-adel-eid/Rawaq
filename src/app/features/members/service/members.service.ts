import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IAllGroupJoinReq } from '../../groups/interfaces/IAllGroupJoinReq';
import { API_KEYS } from '../../../core/constants/API_KEYS';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private readonly httpClinet = inject(HttpClient);
  allGroupJoinReq = signal<IAllGroupJoinReq[] | null>(null);
  hasErrorGroupJoinReq = signal<boolean>(false);
  isLoaddingGroupJoinReq = signal<boolean>(false);
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
}
