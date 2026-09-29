import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  imports: [ButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css',
})
export class SignInFormComponent {
  private readonly fb = inject(FormBuilder);
  signIn: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
  });
  submit() {
    console.log(this.signIn.value);
  }
}
