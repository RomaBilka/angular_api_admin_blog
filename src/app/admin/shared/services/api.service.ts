import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginUser, Token} from '../interfaces';
import {Observable} from 'rxjs';
import { TokenService } from './token.service';
import { Image } from '../../image/image';

@Injectable()
export class ApiService {

  BASE_URL = 'http://localhost:3000/admin/';

  constructor(private http: HttpClient, private tokenStore: TokenService) { }

  login(loginUser: LoginUser): Observable<Token>
  {
    return this.http.post<Token>(this.BASE_URL + 'login', loginUser);
  }

  public getImages(): Observable<any>{
    const headers = this.Headers;
    return this.http.get(this.BASE_URL + 'images', {headers});
  }

  public getImage(id: number): Observable<any> {
    const headers = this.Headers;
    return this.http.get(this.BASE_URL + 'image/' + id, {headers});
  }

  public get Headers(): HttpHeaders{
    const headers = new HttpHeaders({
      Authorization: 'bearer ' + this.tokenStore.token,
    });
    return headers;
  }


}
