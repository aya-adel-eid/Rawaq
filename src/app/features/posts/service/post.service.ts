import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_KEYS } from '../../../core/constants/API_KEYS';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  showCreatPost = signal<boolean>(false);
  closeFormCreate() {
    this.showCreatPost.set(false);
  }
  openFormCreate() {
    this.showCreatPost.set(true);
  }
  private readonly http = inject(HttpClient);
  createPost(postData: {}) {
    return this.http.post(API_KEYS.dashboard.creatPost, postData);
  }
}
