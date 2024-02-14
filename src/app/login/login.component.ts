import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  login(): void {
    this.userService.login(this.username, this.password)
      .subscribe(
        (response) => {
          // Handle successful login response
          console.log('Login successful', response);
          // Redirect to /tasks on successful login
          this.router.navigate(['/tasks']);
        },
        (error) => {
          // Handle login error
          console.error('Login error', error);
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Ошибка при входе пользователя';
          }
        }
      );
  }
}
