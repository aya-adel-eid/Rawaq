import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { RegisterFormComponent } from './features/auth/components/register-form/register-form.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';
import { SignInFormComponent } from './features/auth/components/sign-in-form/sign-in-form.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './features/auth/pages/reset-password-page/reset-password-page.component';
import { ForgotPasswordPageComponent } from './features/auth/pages/forgot-password-page/forgot-password-page.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RegisterFormComponent,
    RegisterPageComponent,
    SignInFormComponent,
    LoginPageComponent,
    ResetPasswordPageComponent,
    ForgotPasswordPageComponent,
  ],
  templateUrl: './app.html',
})
export class App {
  ngOnInit(): void {
    initFlowbite();
  }
}
