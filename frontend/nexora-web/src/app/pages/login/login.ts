import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private router = inject(Router);
  private authService = inject(AuthService);

  email = '';
  password = '';
  errorMessage = '';

  signIn() {

    this.errorMessage = '';

    this.authService.login(this.email, this.password)
      .subscribe({

        next: (response) => {

          this.authService.saveToken(response.token);

          this.router.navigate(['/dashboard']);
        },

        error: () => {

          this.errorMessage = 'Invalid email or password';
        }
      });
  }
}