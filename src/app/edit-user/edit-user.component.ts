// edit-user.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: string;
  user: User = { _id: '', username: '', email: '', age: 0, password: '' };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router // Импортируем Router
  ) {
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  onSubmit(): void {
    this.userService.editUser(this.userId, this.user).subscribe(
      () => {
        console.log('User updated successfully');
        // Редирект после успешного обновления
        this.router.navigate(['/user-list']); // Перенаправляем на страницу /user-list
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}
