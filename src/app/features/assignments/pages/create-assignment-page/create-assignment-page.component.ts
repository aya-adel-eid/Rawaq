import { Component } from '@angular/core';
import { AssignmentSummaryComponent } from '../../components/assignment-summary/assignment-summary.component';
import { QuestionMapComponent } from '../../components/question-map/question-map.component';
import { QuestionCardComponent } from '../../components/question-card/question-card.component';
import { AssignmentInfoCardComponent } from '../../components/assignment-info-card/assignment-info-card.component';

@Component({
  selector: 'app-create-assignment-page',
  imports: [
    AssignmentSummaryComponent,
    QuestionMapComponent,
    QuestionCardComponent,
    AssignmentInfoCardComponent,
  ],
  templateUrl: './create-assignment-page.component.html',
  styleUrl: './create-assignment-page.component.css',
})
export class CreateAssignmentPageComponent {
  // static data للمعاينة بس
  singleOptions = [
    { text: 'A focus on minimalist design and cognitive ease', correct: false },
    { text: 'An educational environment prioritizing focus', correct: true },
  ];
  multipleOptions = [
    { text: 'Deep Teal Primary Color', correct: true },
    { text: '8px Multiple Grid System', correct: true },
  ];
}
