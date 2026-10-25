import { Component, computed, inject, input, signal } from '@angular/core';
import { ILatestPost } from '../../interfaces/ILatestPost';
import { InitialsPipePipe } from '../../../../shared/pipes/initials-pipe-pipe';
import { PostService } from '../../service/post.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/service/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { IAllComments } from '../../interfaces/IAllComments';
type CommentsStatus = 'idle' | 'loading' | 'success' | 'error';
@Component({
  selector: 'app-post-card',
  imports: [InitialsPipePipe, ReactiveFormsModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  variant = input<'feed' | 'details'>('details');
  post = input<ILatestPost>();
  private readonly toaster = inject(ToastrService);
  private readonly postService = inject(PostService);
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  isCommenting = signal(true);

  commentForm = this.fb.group({
    content: [null, [Validators.required]],
  });
  userId = computed(() => this.authService.userData()?.id ?? null);
  pending = false;
  liked = signal<boolean | null>(null);

  isLiked = computed(() => this.liked() ?? !!this.post()?.is_liked);

  likesCount = computed(() => {
    const base = this.post()?.likes_count ?? 0;
    const original = !!this.post()?.is_liked;
    return base + (this.isLiked() === original ? 0 : this.isLiked() ? 1 : -1);
  });
  private readonly addedComments = signal(0);

  commentCount = computed(() => (this.post()?.comments_count ?? 0) + this.addedComments());

  onCommentAdded() {
    this.addedComments.update((n) => n + 1);
  }

  toggleLike(postId: string) {
    const userId = this.userId();
    if (!userId || this.pending) return;

    this.pending = true;
    const wasLiked = this.isLiked();

    const request$ = wasLiked
      ? this.postService.unlikePost(postId, userId)
      : this.postService.likePosts(postId);

    request$.subscribe({
      next: () => {
        this.liked.set(!wasLiked);
        this.pending = false;
      },
      error: () => {
        this.pending = false;
        this.toaster.error('Could not update like, please try again');
      },
    });
  }
  addComment(postId: string) {
    this.isCommenting.set(false);
    this.onCommentAdded();
    this.postService.addComment(postId, this.commentForm.value.content!).subscribe({
      next: (resp) => {
        this.isCommenting.set(true);
        this.commentForm.reset();
        this.getAllComments(postId);
        console.log(resp);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.isCommenting.set(true);
      },
    });
  }
  //

  showComments = signal(false);
  commentsStatus = signal<CommentsStatus>('idle');
  comments = signal<IAllComments[]>([]);

  toggleComments() {
    const next = !this.showComments();
    this.showComments.set(next);

    // الطلب بيتعمل فقط أول مرة القسم يتفتح
    if (next && this.commentsStatus() === 'idle') {
      this.getAllComments(this.post()!.id);
    }
  }

  getAllComments(postId: string) {
    this.commentsStatus.set('loading');

    this.postService.getAllComments(postId).subscribe({
      next: (resp) => {
        this.comments.set(resp);
        this.commentsStatus.set('success');
      },
      error: () => {
        this.commentsStatus.set('error');
      },
    });
  }
}
