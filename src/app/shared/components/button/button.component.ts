import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'outline' | 'icon'>('primary');
  type = input<'button' | 'submit'>('button');
  disabled = input<boolean>(false);
  clickEvent = output<void>();
  onClick() {
    this.clickEvent.emit();
  }
}
