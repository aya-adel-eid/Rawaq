import { Component, HostListener, signal } from '@angular/core';

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
  openMenuId = signal<string | null>(null);

  toggleMenu(id: string) {
    this.openMenuId.update((current) => (current === id ? null : id));
  }

  @HostListener('document:click')
  closeMenu() {
    this.openMenuId.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.openMenuId.set(null);
  }
}
