import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_KEYS } from '../../../core/constants/API_KEYS';
import { ILatestPost } from '../interfaces/ILatestPost';
import { IAllComments } from '../interfaces/IAllComments';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  showCreatPost = signal<boolean>(false);
  private readonly http = inject(HttpClient);
  allLatestPosts = signal<ILatestPost[] | null>(null);
  latestPostsLoading = signal<boolean>(false);
  latestPostsHasError = signal<boolean>(false);
  hasMorePosts = signal(true);
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
  getLatestPosts(groupId: string, limit: number = 2) {
    // ?group_id=eq.{{GROUP_ID}}&order=created_at.desc&limit=3&offset=0
    this.latestPostsLoading.set(true);
    this.latestPostsHasError.set(false);

    return this.http
      .get<ILatestPost[]>(
        `${API_KEYS.dashboard.latestPosts}?group_id=eq.${groupId}&order=created_at.desc&limit=${limit}&offset=0`,
      )
      .subscribe({
        next: (resp) => {
          // console.log(resp);
          this.latestPostsLoading.set(false);
          this.latestPostsHasError.set(false);
          this.allLatestPosts.set(resp);
          this.hasMorePosts.set(resp.length >= limit);
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
  unlikePost(postId: string, userId: string) {
    // ?post_id=eq.POST_ID&user_id=eq.USER_ID
    return this.http.delete(
      `${API_KEYS.dashboard.unlikePost}?post_id=eq.${postId}&user_id=eq.${userId}`,
    );
  }
  addComment(postId: string, content: string) {
    return this.http.post(API_KEYS.dashboard.comment, {
      post_id: postId,
      content,
    });
  }
  getAllComments(postId: string) {
    return this.http.get<IAllComments[]>(
      `${API_KEYS.dashboard.displayComments}?post_id=eq.${postId}&order=created_at.desc`,
    );
  }
}
