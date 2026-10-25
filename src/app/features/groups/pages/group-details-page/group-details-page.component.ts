import { Component, inject, OnInit, signal } from '@angular/core';
import { PostCardComponent } from '../../../posts/components/post-card/post-card.component';
import { AssignmentsCardComponent } from '../../../assignments/components/assignments-card/assignments-card.component';
import { PostFormComponent } from '../../../posts/pages/post-form/post-form.component';
import { PostService } from '../../../posts/service/post.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostCardSkeletoneComponent } from '../../../posts/components/post-card-skeletone/post-card-skeletone.component';
import { ShowErrorComponent } from '../../../../shared/components/show-error/show-error.component';
import { SuccessModelComponent } from '../../../../shared/components/success-model/success-model.component';
import { IGroupStudent } from '../../interfaces/IGroupStudent';
import { InitialsPipePipe } from '../../../../shared/pipes/initials-pipe-pipe';
type GroupTab = 'posts' | 'assignments' | 'members';
@Component({
  selector: 'app-group-details-page',
  imports: [
    PostCardComponent,
    AssignmentsCardComponent,
    PostFormComponent,
    PostCardSkeletoneComponent,
    ShowErrorComponent,
    SuccessModelComponent,
    RouterLink,
    InitialsPipePipe,
  ],
  templateUrl: './group-details-page.component.html',
  styleUrl: './group-details-page.component.css',
})
export class GroupDetailsPageComponent implements OnInit {
  private readonly postService = inject(PostService);
  private readonly activatedRoute = inject(ActivatedRoute);
  allLatestPosts = this.postService.allLatestPosts;
  showFormCreate = this.postService.showCreatPost;
  iLoadingPosts = this.postService.latestPostsLoading;
  hasErrorLatestPosts = this.postService.latestPostsHasError;
  groupStudent = signal<IGroupStudent | null>(null);
  groupID = signal<string>('');
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => {
      this.groupID.set(p.get('groupId')!);
      this.getAllposts();
      this.groupStudent.set(JSON.parse(localStorage.getItem('GroupItem')!));
    });
  }
  openForm() {
    this.postService.openFormCreate();
  }
  showSuccess = this.postService.showSuccessModal;

  closeSuccess() {
    this.postService.closeSuccess();
  }
  tabs: {
    id: GroupTab;
    title: string;
    subtitle: string;
    iconBg: string;
    border: string;
    icon: string;
  }[] = [
    {
      id: 'posts',
      title: 'Posts',
      subtitle: 'Stay updated with class updates',
      iconBg: 'bg-[#006D7733] text-[#00535B]',
      border: 'border-l-[#00535B]',
      icon: 'postsGroup',
    },
    {
      id: 'assignments',
      title: 'Assignments',
      subtitle: 'Manage your submissions',
      iconBg: 'bg-[#FFDF964D] text-[#5E4700]',
      border: 'border-l-[#5E4700]',
      icon: 'assignments',
    },
    {
      id: 'members',
      title: 'Members',
      subtitle: 'Connect with classmates',
      iconBg: 'bg-[#E6E3D080] text-[#605F50]',
      border: 'border-l-[#605F50]',
      icon: 'groups',
    },
  ];
  getAllposts() {
    this.postService.getLatestPosts(this.groupID());
  }
}
