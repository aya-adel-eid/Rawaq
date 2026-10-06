import { Component } from '@angular/core';

@Component({
  selector: 'app-join-requests-card',
  imports: [],
  templateUrl: './join-requests-card.component.html',
  styleUrl: './join-requests-card.component.css',
})
export class JoinRequestsCardComponent {
  columns = [
    { label: 'Student', align: 'text-left' },
    { label: 'Group Name', align: 'text-left' },
    { label: 'Requested', align: 'text-left' },
    { label: 'Actions', align: 'text-right' },
  ];
}
