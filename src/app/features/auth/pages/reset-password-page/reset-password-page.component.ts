import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reset-password-page',
  imports: [ButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css',
})
export class ResetPasswordPageComponent {
  private readonly fb = inject(FormBuilder);
  showPassword = signal(false);
  confirmPass = signal(false);
  resetForm = this.fb.group(
    {
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
    },
    { validators: this.passwordMatchValidator },
  );
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }
}
