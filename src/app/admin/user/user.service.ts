import { Injectable } from '@angular/core';
import {ApiService} from '../shared/services/api.service';
import {User} from './user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private api: ApiService) { }

  public getFilters(): Observable<User[]>{
    return this.api.getUsers().pipe(
      map(this.extractUsers)
    );
  }
  public deleteFilter(id: number): Observable<any>{
    return this.api.deleteFilter(id).pipe();
  }
  private extractUsers(response: any) {
    const users: User[] = [];
    for (let i = 0; i < response.length; i++) {
      users.push(new User(response[i]));
    }
    return users;
  }
}
