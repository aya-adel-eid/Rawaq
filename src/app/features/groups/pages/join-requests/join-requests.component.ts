import { Component } from '@angular/core';
import { JoinRequestsCardComponent } from '../../components/join-requests-card/join-requests-card.component';

@Component({
  selector: 'app-join-requests',
  imports: [JoinRequestsCardComponent],
  templateUrl: './join-requests.component.html',
  styleUrl: './join-requests.component.css',
})
export class JoinRequestsComponent {}
