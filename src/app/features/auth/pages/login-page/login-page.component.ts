import { Component } from '@angular/core';
import { SignInFormComponent } from '../../components/sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-login-page',
  imports: [SignInFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {}
