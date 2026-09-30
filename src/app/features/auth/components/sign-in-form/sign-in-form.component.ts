import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { STORED_KEY } from '../../../../core/constants/STORED_KEYS';
import { timer } from 'rxjs';

@Component({
  selector: 'app-sign-in-form',
  imports: [ButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css',
})
export class SignInFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly route = inject(Router);
  showPass = signal<boolean>(false);
  successMessage = signal<string>('');
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  signIn: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
  });
  submit() {
    this.successMessage.set('');
    this.errorMessage.set('');
    this.isLoading.set(true);
    if (this.signIn.invalid) {
      this.signIn.markAllAsDirty();
      return;
    }
    this.authService.signIn(this.signIn.value).subscribe({
      next: (resp) => {
        this.isLoading.set(false);
        localStorage.setItem(STORED_KEY.expireAt, String(resp.expires_at));
        this.authService.storeSession(
          {
            userToken: resp.access_token,
            refresh_token: resp.refresh_token,
            role: resp.user.identities[0].identity_data.account_type,
          },
          true,
        );

        this.successMessage.set('Signed in successfully! Redirecting....');
        this.errorMessage.set('');
        timer(3000).subscribe(() => this.route.navigateByUrl('/dashboard'));
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error.msg);
        this.successMessage.set('');
      },
    });
  }
}
