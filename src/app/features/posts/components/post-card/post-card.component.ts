import { Component, input } from '@angular/core';
import { ILatestPost } from '../../interfaces/ILatestPost';
import { InitialsPipePipe } from '../../../../shared/pipes/initials-pipe-pipe';

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
}
