import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password-page',
  imports: [ButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css',
})
export class ForgotPasswordPageComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  successMsg = signal<string>('');
  errorMsg = signal<string>('');
  isLoading = signal<boolean>(false);
  form = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });
  submit() {
    this.errorMsg.set('');
    this.successMsg.set('');
    this.isLoading.set(true);
    if (this.form.invalid) {
      this.form.markAllAsDirty();
      return;
    }
    this.authService.forgotPassword(this.form.value).subscribe({
      next: () => {
        this.form.reset();
        this.errorMsg.set('');

        this.successMsg.set('Reset link sent successfully. Please check your email.');
        this.isLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.successMsg.set('');
        this.isLoading.set(false);

        this.errorMsg.set(error.error.msg);
      },
    });
  }
}
