import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  age: number = 0;
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  register(): void {
    this.userService.register(this.username, this.email, this.age, this.password)
      .subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/user-list']);
          this.userService.login(this.username, this.password)
            .subscribe(
              (response) => {
                console.log('Login successful after registration', response);
              },
              (error) => {
                console.error('Login error after registration', error);
              }
            );
        },
        (error) => {
          // Handle registration error
          console.error('Registration error', error);
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Ошибка при регистрации пользователя';
          }
        }
      );
  }
}
