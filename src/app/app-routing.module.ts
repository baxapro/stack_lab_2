import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { UserComponent } from './user/user.component'
import {EditUserComponent} from "./edit-user/edit-user.component";


const routes: Routes = [
  { path: '', redirectTo: '/user-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-list', component: UserComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
