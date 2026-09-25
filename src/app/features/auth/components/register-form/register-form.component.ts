import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReusableInputComponent } from '../../../../shared/components/reusable-input/reusable-input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-register-form',
  imports: [ReusableInputComponent, ButtonComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private readonly fb = inject(FormBuilder);
  registerForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    data: this.fb.group({
      account_type: ['student', [Validators.required]], // 'teacher' | 'student'
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      avatar_url: [null, [Validators.pattern(/\.(jpeg|png|webp)$/i)]], // optional, e.g. after upload
    }),
  });
}
