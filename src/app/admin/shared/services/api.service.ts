import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginUser, Token, File} from '../interfaces';
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
    const headers = this.headers();
    return this.http.get(this.BASE_URL + 'images', {headers});
  }

  public getImage(id: number): Observable<any> {
    const headers = this.headers();
    return this.http.get(this.BASE_URL + 'image/' + id, {headers});
  }

  public createImage(image: Image): Observable<any> {
    const headers = this.headers();
    return this.http.post(this.BASE_URL + 'image', image, {headers});
  }

  public uploadImage(file): Observable<File> {
    const headers = this.headers();
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post<File>(this.BASE_URL + 'upload_image', formData, {headers});
  }

  public updateImage(image: Image): Observable<any> {
    const headers = this.headers();
    return this.http.put(this.BASE_URL + 'image', image, {headers});
  }

  public deleteImage(id: number): Observable<any>{
    const headers = this.headers();
    return this.http.delete(this.BASE_URL + 'image/' + id, {headers});
  }

  public getFilters(): Observable<any>{
    const headers = this.headers();
    return this.http.get(this.BASE_URL + 'filters', {headers});
  }

  public getFilter(id: number): Observable<any> {
    const headers = this.headers();
    return this.http.get(this.BASE_URL + 'filter/' + id, {headers});
  }

  public createFilter(filter: Filter): Observable<any> {
    const headers = this.headers();
    return this.http.post(this.BASE_URL + 'filter', filter, {headers});
  }

  public updateFilter(filter: Filter): Observable<any> {
    const headers = this.headers();
    return this.http.put(this.BASE_URL + 'filter', filter, {headers});
  }

  public deleteFilter(id: number): Observable<any>{
    const headers = this.headers();
    return this.http.delete(this.BASE_URL + 'filter/' + id, {headers});
  }

  public getUsers(): Observable<any>{
    const headers = this.headers();
    return this.http.get(this.BASE_URL + 'users', {headers});
  }

  public getUser(id: number): Observable<any> {
    const headers = this.headers();
    return this.http.get(this.BASE_URL + 'user/' + id, {headers});
  }

  public createUser(user: User): Observable<any> {
    const headers = this.headers();
    return this.http.post(this.BASE_URL + 'user', user, {headers});
  }

  public updateUser(user: User): Observable<any> {
    const headers = this.headers();
    return this.http.put(this.BASE_URL + 'user', user, {headers});
  }

  public deleteUser(id: number): Observable<any>{
    const headers = this.headers();
    return this.http.delete(this.BASE_URL + 'user/' + id, {headers});
  }

  public headers(data = {}): HttpHeaders{
    data['Authorization'] = 'bearer ' + this.tokenStore.token;
    const headers = new HttpHeaders(data);
    return headers;
  }


}
