import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password-page',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css',
})
export class ForgotPasswordPageComponent {}
