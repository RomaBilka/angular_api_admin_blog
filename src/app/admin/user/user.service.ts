import { Injectable } from '@angular/core';
import {ApiService} from '../shared/services/api.service';
import {User} from './user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private api: ApiService) { }

  public getUsers(): Observable<User[]>{
    return this.api.getUsers().pipe(
      map(this.extractUsers)
    );
  }
  public getUser(id: number): Observable<User>{
    return this.api.getUser(id).pipe(
      map((user) => {
        return new User(user);
      })
    );
  }
  public addUser(user: User): Observable<void>{
    return this.api.createUser(user).pipe();
  }
  public updateUser(user: User): Observable<void>{
    return this.api.updateUser(user).pipe();
  }
  public deleteUser(id: number): Observable<void>{
    return this.api.deleteUser(id).pipe();
  }
  private extractUsers(response: any) {
    const users: User[] = [];
    for (let i = 0; i < response.length; i++) {
      users.push(new User(response[i]));
    }
    return users;
  }
}
