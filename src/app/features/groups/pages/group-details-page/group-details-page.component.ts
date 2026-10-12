import { Component, inject } from '@angular/core';
import { PostCardComponent } from '../../../posts/components/post-card/post-card.component';
import { AssignmentsCardComponent } from '../../../assignments/components/assignments-card/assignments-card.component';
import { PostFormComponent } from '../../../posts/pages/post-form/post-form.component';
import { PostService } from '../../../posts/service/post.service';
type GroupTab = 'posts' | 'assignments' | 'members';
@Component({
  selector: 'app-group-details-page',
  imports: [PostCardComponent, AssignmentsCardComponent, PostFormComponent],
  templateUrl: './group-details-page.component.html',
  styleUrl: './group-details-page.component.css',
})
export class GroupDetailsPageComponent {
  private readonly postService = inject(PostService);
  showFormCreate = this.postService.showCreatPost;
  openForm() {
    this.postService.openFormCreate();
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
}
