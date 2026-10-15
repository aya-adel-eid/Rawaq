import { Component, computed, inject, input, signal } from '@angular/core';
import { ILatestPost } from '../../interfaces/ILatestPost';
import { InitialsPipePipe } from '../../../../shared/pipes/initials-pipe-pipe';
import { PostService } from '../../service/post.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-post-card',
  imports: [InitialsPipePipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  variant = input<'feed' | 'details'>('details');
  post = input<ILatestPost>();
  private readonly toaster = inject(ToastrService);
  private readonly postService = inject(PostService);
  private readonly authService = inject(AuthService);
  userId = computed(() => this.authService.userData()?.id ?? null);

  liked = signal<boolean | null>(null);

  isLiked = computed(() => this.liked() ?? !!this.post()?.is_liked);

  likesCount = computed(() => {
    const base = this.post()?.likes_count ?? 0;
    const original = !!this.post()?.is_liked;
    return base + (this.isLiked() === original ? 0 : this.isLiked() ? 1 : -1);
  });

  likedPost(postID: string) {
    const prev = this.liked();
    this.liked.set(!this.isLiked());

    this.postService.likePosts(postID).subscribe({
      error: () => {
        this.toaster.error('Could not update like, please try again');
        this.liked.set(prev);
      },
    });
  }
}
