import { Component, input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  // 'feed': بادج جنب الاسم | 'details': نص تحت الاسم
  variant = input<'feed' | 'details'>('details');
}
