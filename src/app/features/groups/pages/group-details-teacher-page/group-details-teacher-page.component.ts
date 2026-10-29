import { Component, inject, signal } from '@angular/core';
import { PostService } from '../../../posts/service/post.service';
import { PostFormComponent } from '../../../posts/pages/post-form/post-form.component';
import { SuccessModelComponent } from '../../../../shared/components/success-model/success-model.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostCardComponent } from '../../../posts/components/post-card/post-card.component';
import { PostCardSkeletoneComponent } from '../../../posts/components/post-card-skeletone/post-card-skeletone.component';
import { IGroupTeacher } from '../../interfaces/IGroupTeacher';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-group-details-teacher-page',
  imports: [
    PostFormComponent,
    SuccessModelComponent,
    PostCardComponent,
    PostCardSkeletoneComponent,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './group-details-teacher-page.component.html',
  styleUrl: './group-details-teacher-page.component.css',
})
export class GroupDetailsTeacherPageComponent {
  private readonly postService = inject(PostService);
  showFormCreate = this.postService.showCreatPost;
  private readonly activatedRoute = inject(ActivatedRoute);
  allLatestPosts = this.postService.allLatestPosts;
  group = signal<IGroupTeacher | null>(null);

  iLoadingPosts = this.postService.latestPostsLoading;
  hasErrorLatestPosts = this.postService.latestPostsHasError;
  groupID = signal<string>('');
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => {
      this.groupID.set(p.get('groupId')!);
      this.getAllposts();
    });
    this.group.set(JSON.parse(localStorage.getItem('GroupItem')!));
  }
  openForm() {
    this.postService.openFormCreate();
  }
  showSuccess = this.postService.showSuccessModal;

  closeSuccess() {
    this.postService.closeSuccess();
  }
  getAllposts() {
    this.postService.getLatestPosts(this.groupID());
  }
}
