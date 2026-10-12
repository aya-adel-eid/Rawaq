import { Component, output } from '@angular/core';

@Component({
  selector: 'app-success-model',
  imports: [],
  templateUrl: './success-model.component.html',
  styleUrl: './success-model.component.css',
})
export class SuccessModelComponent {
  close = output<void>();
}
