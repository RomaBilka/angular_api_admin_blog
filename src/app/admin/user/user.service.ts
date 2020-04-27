import { Injectable } from '@angular/core';
import {ApiService} from '../shared/services/api.service';
import {User} from './user';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../shared/services/auth.service';

@Injectable()
export class UserService {

  constructor(private api: ApiService, private auth: AuthService) { }

  public getUsers(): Observable<User[]>{
    return this.api.getUsers().pipe(
      map(this.extractUsers),
      catchError(this.handleError.bind(this))
    );
  }
  public getUser(id: number): Observable<User>{
    return this.api.getUser(id).pipe(
      map((user) => {
        return new User(user);
      }),
      catchError(this.handleError.bind(this))
    );
  }
  public addUser(user: User): Observable<void>{
    return this.api.createUser(user).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  public updateUser(user: User): Observable<void>{
    return this.api.updateUser(user).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  public deleteUser(id: number): Observable<void>{
    return this.api.deleteUser(id).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  private extractUsers(response: any) {
    const users: User[] = [];
    for (let i = 0; i < response.length; i++) {
      users.push(new User(response[i]));
    }
    return users;
  }
  private handleError(error: HttpErrorResponse){
    switch (error.status) {
      case 401:
        this.auth.logout();
        break;
      default:
        console.dir(error);
        break;
    }
    return throwError(error);
  }
}
