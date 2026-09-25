import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { RegisterFormComponent } from './features/auth/components/register-form/register-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  ngOnInit(): void {
    initFlowbite();
  }
}
