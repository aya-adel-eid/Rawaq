import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-form-group',
  imports: [],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.css',
})
export class FormGroupComponent {
  count = signal<number>(1);
  increase() {
    this.count.update((v) => v + 1);
  }
  decrease() {
    if (this.count() > 1) {
      this.count.update((v) => v - 1);
    }
  }
}
