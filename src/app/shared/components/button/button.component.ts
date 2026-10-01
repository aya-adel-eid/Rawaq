import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  variant = input<'Primary' | 'secondary' | 'outline' | 'icon'>('Primary');
  type = input<'button' | 'submit'>('button');
  disabled = input<boolean>(false);
  clickEvent = output<void>();
  onClick() {
    this.clickEvent.emit();
  }
}
