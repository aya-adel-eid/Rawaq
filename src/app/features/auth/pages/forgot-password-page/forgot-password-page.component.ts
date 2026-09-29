import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-page',
  imports: [ButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css',
})
export class ForgotPasswordPageComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  submit() {
    console.log(this.form.value);
  }
}
