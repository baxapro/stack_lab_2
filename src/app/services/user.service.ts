// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { User } from '../models/user.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';
  private currentUserSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string | null>(null)
  }


  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, email: string, age: number, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, email, age, password }).pipe(
      catchError(this.handleError)
    );;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)   .pipe(
      catchError(this.handleError)
    );
  }
  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }
  setCurrentUser(username: string): void {
    this.currentUserSubject.next(username);
  }
  public getCurrentUser(): Observable<string | null> {
    return this.currentUserSubject;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Произошла ошибка на сервере';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Произошла ошибка: ${error.error.message}`;
    } else {
      errorMessage = `Код ошибки: ${error.status}, текст ошибки: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  editUser(userId: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, userData).pipe(
      catchError(this.handleError)
    );
  }
}
