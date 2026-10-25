import { Component, inject, signal } from '@angular/core';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { PostService } from '../../service/post.service';
import { PostFormComponent } from '../post-form/post-form.component';
import { SuccessModelComponent } from '../../../../shared/components/success-model/success-model.component';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ShowErrorComponent } from '../../../../shared/components/show-error/show-error.component';
import { PostCardSkeletoneComponent } from '../../components/post-card-skeletone/post-card-skeletone.component';
@Component({
  selector: 'app-group-posts-page',
  imports: [
    PostCardComponent,
    PostFormComponent,
    SuccessModelComponent,
    InfiniteScrollDirective,
    ShowErrorComponent,
    PostCardSkeletoneComponent,
  ],
  templateUrl: './group-posts-page.component.html',
  styleUrl: './group-posts-page.component.css',
})
export class GroupPostsPageComponent {
  private readonly postService = inject(PostService);
  groupID = signal<string>('');
  hasMore = this.postService.hasMorePosts;
  private readonly activatedRoute = inject(ActivatedRoute);
  allLatestPosts = this.postService.allLatestPosts;
  limit = signal<number>(2);

  iLoadingPosts = this.postService.latestPostsLoading;
  hasErrorLatestPosts = this.postService.latestPostsHasError;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => {
      this.groupID.set(p.get('groupId')!);
      this.getAllPosts();
    });
  }
  showFormCreate = this.postService.showCreatPost;
  openForm() {
    this.postService.openFormCreate();
  }
  showSuccess = this.postService.showSuccessModal;

  closeSuccess() {
    this.postService.closeSuccess();
  }
  onScroll() {
    if (this.iLoadingPosts() || !this.hasMore()) return; // امنع طلبات متكررة وقت التحميل

    this.limit.update((l) => l + 1);
    this.postService.getLatestPosts(this.groupID(), this.limit());
  }
  getAllPosts() {
    this.postService.getLatestPosts(this.groupID());
  }
}
