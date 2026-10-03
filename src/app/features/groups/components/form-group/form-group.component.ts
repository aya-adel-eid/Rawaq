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
  count = signal<number>(1);
  today = new Date().toLocaleDateString('en-CA');
  formGroup: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    description: [null, [Validators.maxLength(1000)]],
    no_of_students: [this.count(), [Validators.required, Validators.min(1)]],
    category: [null, [Validators.maxLength(100)]],
    start_date: [
      null,
      (c: AbstractControl) => (c.value && c.value < this.today ? { past: true } : null),
    ],
    duration_in_days: [0, Validators.min(0)],
  });

  increase() {
    const c = this.formGroup.get('no_of_students');
    c?.setValue((c.value ?? 1) + 1);
  }

  decrease() {
    const c = this.formGroup.get('no_of_students');
    c?.setValue(Math.max((c.value ?? 1) - 1, 1));
  }
  submit() {
    console.log(this.formGroup.value);
  }
}
