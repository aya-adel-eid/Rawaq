import { Component, input } from '@angular/core';
export type BadgeStatus = 'active' | 'pending' | 'declined' | 'submitted';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  label = input<string>();
  status = input<BadgeStatus>('active');
}
