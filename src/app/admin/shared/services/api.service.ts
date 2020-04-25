import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginUser, Token} from '../interfaces';
import {Observable} from 'rxjs';

@Injectable()
export class ApiService {

  BASE_URL = 'http://localhost:3000/admin/';

  constructor(private http: HttpClient) { }

  login(loginUser: LoginUser): Observable<Token>
  {
    return this.http.post<Token>(this.BASE_URL + 'login', loginUser);
  }
}
