import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { RegisterFormComponent } from './features/auth/components/register-form/register-form.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';
import { SignInFormComponent } from './features/auth/components/sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterFormComponent, RegisterPageComponent, SignInFormComponent],
  templateUrl: './app.html',
})
export class App {
  ngOnInit(): void {
    initFlowbite();
  }
}
