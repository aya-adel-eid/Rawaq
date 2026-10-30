import { Component, input } from '@angular/core';
export type QuestionType = 'single' | 'multiple' | 'text';
@Component({
  selector: 'app-question-card',
  imports: [],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css',
})
export class QuestionCardComponent {
  number = input.required<number>();
  type = input<QuestionType>('text');
  text = input('');
  grade = input(5);
  collapsed = input(false);
  options = input<{ text: string; correct: boolean }[]>([]);
}
