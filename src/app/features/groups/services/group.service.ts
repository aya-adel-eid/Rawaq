import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IGroupData } from '../interfaces/IGroupData';
import { API_KEYS } from '../../../core/constants/API_KEYS';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly httpClinet = inject(HttpClient);
  createNewGroup(groupData: IGroupData) {
    return this.httpClinet.post(API_KEYS.dashboard.newGroup, groupData);
  }
}
