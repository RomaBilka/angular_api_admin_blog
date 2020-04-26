import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginUser, Token} from '../interfaces';
import {Observable} from 'rxjs';
import { TokenService } from './token.service';
import { Image } from '../../image/image';
import { User } from '../../user/user';
import { Filter } from '../../filter/filter';
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

  public createImage(image: Image): Observable<any> {
    const headers = this.Headers;
    return this.http.post(this.BASE_URL + 'image/', image, {headers});
  }

  public updateImage(image: Image): Observable<any> {
    const headers = this.Headers;
    return this.http.put(this.BASE_URL + 'image/', image, {headers});
  }

  public deleteImage(id: number): Observable<any>{
    const headers = this.Headers;
    return this.http.delete(this.BASE_URL + 'image/' + id, {headers});
  }

  public getFilters(): Observable<any>{
    const headers = this.Headers;
    return this.http.get(this.BASE_URL + 'filters', {headers});
  }

  public getFilter(id: number): Observable<any> {
    const headers = this.Headers;
    return this.http.get(this.BASE_URL + 'filter/' + id, {headers});
  }

  public createFilter(filter: Filter): Observable<any> {
    const headers = this.Headers;
    return this.http.post(this.BASE_URL + 'filter/', filter, {headers});
  }

  public updateFilter(filter: Filter): Observable<any> {
    const headers = this.Headers;
    return this.http.put(this.BASE_URL + 'filter/', filter, {headers});
  }

  public deleteFilter(id: number): Observable<any>{
    const headers = this.Headers;
    return this.http.delete(this.BASE_URL + 'flter/' + id, {headers});
  }

  public getUsers(): Observable<any>{
    const headers = this.Headers;
    return this.http.get(this.BASE_URL + 'users', {headers});
  }

  public getUser(id: number): Observable<any> {
    const headers = this.Headers;
    return this.http.get(this.BASE_URL + 'user/' + id, {headers});
  }

  public createUser(user: User): Observable<any> {
    const headers = this.Headers;
    return this.http.post(this.BASE_URL + 'image/', user, {headers});
  }

  public updateUser(user: User): Observable<any> {
    const headers = this.Headers;
    return this.http.put(this.BASE_URL + 'image/', user, {headers});
  }

  public deleteUser(id: number): Observable<any>{
    const headers = this.Headers;
    return this.http.delete(this.BASE_URL + 'user/' + id, {headers});
  }

  public get Headers(): HttpHeaders{
    const headers = new HttpHeaders({
      Authorization: 'bearer ' + this.tokenStore.token,
    });
    return headers;
  }


}
