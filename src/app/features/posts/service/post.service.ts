import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_KEYS } from '../../../core/constants/API_KEYS';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http = inject(HttpClient);
  createPost(postData: {}) {
    return this.http.post(API_KEYS.dashboard.creatPost, postData);
  }
}
