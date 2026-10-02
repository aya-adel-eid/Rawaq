import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-group',
  imports: [ReactiveFormsModule],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.css',
})
export class FormGroupComponent {
  private readonly fb = inject(FormBuilder);
  today = new Date().toLocaleDateString('en-CA');
  formGroup: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    description: [null, [Validators.maxLength(1000)]],
    no_of_students: [1, [Validators.required, Validators.min(1)]],
    category: [null, [Validators.maxLength(100)]],
    start_date: [
      null,
      (c: AbstractControl) => (c.value && c.value < this.today ? { past: true } : null),
    ],
    duration_in_days: [0, Validators.min(0)],
  });
  count = signal<number>(1);
  increase() {
    this.count.update((v) => v + 1);
  }
  decrease() {
    if (this.count() > 1) {
      this.count.update((v) => v - 1);
    }
  }
  submit() {
    console.log(this.formGroup.value);
  }
}
