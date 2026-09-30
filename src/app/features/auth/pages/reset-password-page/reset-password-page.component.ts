import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { timer } from 'rxjs';

@Component({
  selector: 'app-reset-password-page',
  imports: [ButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css',
})
export class ResetPasswordPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  successMsg = signal<string>('');
  errorMsg = signal<string>('');
  accessToken!: string;
  showPassword = signal(false);
  confirmPass = signal(false);
  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      console.log(fragment);

      if (fragment) {
        const params = new URLSearchParams(fragment);
        this.accessToken = params.get('access_token') ?? '';
      }
    });
  }
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
  resetPass() {
    this.successMsg.set('');
    this.errorMsg.set('');
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsDirty();
      return;
    }
    const { ...password } = this.resetForm.value;
    console.log(password);

    this.authService.resetPassword(password, this.accessToken).subscribe({
      next: () => {
        this.errorMsg.set('');
        this.successMsg.set('Your password has been updated successfully. You can now log in');
        timer(3000).subscribe(() => {
          this.router.navigateByUrl('/sign-in');
        });
      },
      error: (error: HttpErrorResponse) => {
        this.errorMsg.set(error.error.msg);
        this.successMsg.set('');
      },
    });
  }
}
