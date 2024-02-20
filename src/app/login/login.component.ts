import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  passwordManagerService = inject(PasswordManagerService);
  router = inject(Router);

  isError: boolean = false;

  onSubmit(values: any) {
    this.passwordManagerService
      .login(values.email, values.password)
      .then(() => {
        this.router.navigate(['/site-list']);
      })
      .catch((err) => {
        this.isError = true;
      });
  }
}
