import { Component } from '@angular/core';
import { PostCardComponent } from '../../components/post-card/post-card.component';

@Component({
  selector: 'app-group-posts-page',
  imports: [PostCardComponent],
  templateUrl: './group-posts-page.component.html',
  styleUrl: './group-posts-page.component.css',
})
export class GroupPostsPageComponent {}
