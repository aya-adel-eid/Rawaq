import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_KEYS } from '../../../core/constants/API_KEYS';
import { ILatestPost } from '../interfaces/ILatestPost';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  showCreatPost = signal<boolean>(false);
  private readonly http = inject(HttpClient);
  allLatestPosts = signal<ILatestPost[] | null>(null);
  latestPostsLoading = signal<boolean>(false);
  latestPostsHasError = signal<boolean>(false);
  closeFormCreate() {
    this.showCreatPost.set(false);
  }
  openFormCreate() {
    this.showCreatPost.set(true);
  }
  showSuccessModal = signal(false);

  openSuccess() {
    this.showSuccessModal.set(true);
  }

  closeSuccess() {
    this.showSuccessModal.set(false);
  }
  createPost(postData: {}) {
    return this.http.post(API_KEYS.dashboard.creatPost, postData);
  }
  getLatestPosts(groupId: string) {
    // ?group_id=eq.{{GROUP_ID}}&order=created_at.desc&limit=3&offset=0
    this.latestPostsLoading.set(true);
    this.latestPostsHasError.set(false);

    return this.http
      .get<ILatestPost[]>(
        `${API_KEYS.dashboard.latestPosts}?group_id=eq.${groupId}&order=created_at.desc&limit=3&offset=0`,
      )
      .subscribe({
        next: (resp) => {
          // console.log(resp);
          this.latestPostsLoading.set(false);
          this.latestPostsHasError.set(false);
          this.allLatestPosts.set(resp);
        },
        error: (error) => {
          this.latestPostsLoading.set(false);
          this.latestPostsHasError.set(true);
          console.log(error);
        },
      });
  }
  likePosts(postId: string) {
    return this.http.post(API_KEYS.dashboard.likePost, {
      post_id: postId,
    });
  }
}
