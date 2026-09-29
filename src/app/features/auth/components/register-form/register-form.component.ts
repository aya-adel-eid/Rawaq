import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ReusableInputComponent } from '../../../../shared/components/reusable-input/reusable-input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { STORED_KEY } from '../../../../core/constants/STORED_KEYS';
import { timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  imports: [ReusableInputComponent, ButtonComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly route = inject(Router);
  successMessage = signal<string>('');
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  avaterError = signal<string>('');
  selectedAvatarFile: File | null = null;
  avatarPreviewUrl: string | null = null;

  registerForm: FormGroup = this.fb.group(
    {
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirm_password: [null],
      data: this.fb.group({
        account_type: ['student', [Validators.required]], // 'teacher' | 'student'
        first_name: [null, [Validators.required]],
        last_name: [null, [Validators.required]],
        avatar_url: [null, [Validators.pattern(/\.(jpeg|png|webp)$/i)]],
      }),
    },
    { validators: this.passwordMatchValidator },
  );

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirm_password')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onAvatarSelected(event: Event): void {
    this.avaterError.set('');
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const maxSize = 500 * 1024; // 500KB
    if (file.size > maxSize) {
      this.avaterError.set('File too large, max 500KB');
      return;
    }

    this.selectedAvatarFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (this.selectedAvatarFile) {
      this.authService.uploadImage(this.selectedAvatarFile).subscribe({
        next: (avatarUrl) => {
          this.registerForm.get('data.avatar_url')?.setValue(avatarUrl);
          this.submitRegisterForm();
        },
        error: (err) => {
          console.error('Avatar upload failed', err);
        },
      });
    } else {
      this.submitRegisterForm();
    }
  }

  submitRegisterForm(): void {
    this.successMessage.set('');
    this.errorMessage.set('');
    this.isLoading.set(true);
    this.authService.signup(this.registerForm.value).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        sessionStorage.setItem(STORED_KEY.userToken, res.access_token);
        sessionStorage.setItem(STORED_KEY.role, res.user.identities[0].identity_data.account_type);
        sessionStorage.setItem(STORED_KEY.refresh_token, res.refresh_token);
        sessionStorage.setItem(STORED_KEY.rememberMeExpiry, String(res.expires_at));
        this.successMessage.set('Account created successfully!.');
        this.errorMessage.set('');
        timer(3000).subscribe(() => this.route.navigateByUrl('/dashboard'));
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.successMessage.set('');
        this.errorMessage.set(err.error.msg);
      },
    });
  }
}
