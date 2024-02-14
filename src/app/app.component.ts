import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'List';
  username: any;

  constructor(private authService: UserService) { }

  ngOnInit(): void {

    this.authService.getCurrentUser().subscribe(username => {
      this.username = username;
    });
  }
}
