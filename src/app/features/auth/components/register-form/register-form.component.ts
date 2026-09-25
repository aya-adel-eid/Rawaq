import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-register-form',
  imports: [ReusableInputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

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
        avatar_url: [null, [Validators.pattern(/\.(jpeg|png|webp)$/i)]], // optional, e.g. after upload
      }),
    },
    { validators: this.passwordMatchValidator },
  );

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirm_password')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onAvatarSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const maxSize = 500 * 1024; // 500KB
    if (file.size > maxSize) {
      console.error('File too large, max 500KB');
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
    // if (this.registerForm.invalid) {
    //   this.registerForm.markAllAsTouched();
    //   return;
    // }

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

  private submitRegisterForm(): void {
    const payload = this.registerForm.value;
    console.log('Final payload:', payload);

    this.authService.signup(payload, {}).subscribe({
      next: (res) => console.log('Registered successfully', res),
      error: (err) => console.error('Register failed', err),
    });
  }
}
