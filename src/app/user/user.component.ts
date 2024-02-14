import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService , private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          // Удаление пользователя из списка после успешного удаления
          this.users = this.users.filter(user => user._id !== userId);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  editUser(userId: string): void {
    this.router.navigate(['/edit-user', userId]); // Используем параметр userId
    console.log('Editing user with ID:', userId);
  }

}
