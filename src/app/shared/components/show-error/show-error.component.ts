import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-show-error',
  imports: [],
  templateUrl: './show-error.component.html',
  styleUrl: './show-error.component.css',
})
export class ShowErrorComponent {
  title = input('Something went wrong');
  message = input("We couldn't load the groups. Please try again.");
  retry = output<void>();
}
