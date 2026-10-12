import { Component, computed, inject, input } from '@angular/core';
import { ILatestPost } from '../../interfaces/ILatestPost';
import { InitialsPipePipe } from '../../../../shared/pipes/initials-pipe-pipe';
import { PostService } from '../../service/post.service';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-post-card',
  imports: [InitialsPipePipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  // 'feed': بادج جنب الاسم | 'details': نص تحت الاسم
  variant = input<'feed' | 'details'>('details');
  post = input<ILatestPost>();
  private readonly postService = inject(PostService);
  private readonly authService = inject(AuthService);
  userId = computed(() => this.authService.userData()?.id ?? null);
  likedPost(postID: string) {
    this.postService.likePosts(postID).subscribe({
      next: (resp) => {
        console.log(resp);
      },
    });
  }
}
