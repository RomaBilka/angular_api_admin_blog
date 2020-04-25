import { Injectable } from '@angular/core';
import {LoginUser, Token } from '../interfaces';
import {catchError, tap} from 'rxjs/operators';
import { ApiService } from './api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Subject, throwError} from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private api: ApiService) { }
  public  error$: Subject<string> = new Subject<string>();
  login(loginUser: LoginUser){
    this.api.login( loginUser ).pipe(
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    ).subscribe();
  }
  setToken(response: Token): void{
    sessionStorage.setItem('token', response.token);
  }
  logout(): void{
    sessionStorage.clear();
  }
  get token(): string{
    return sessionStorage.getItem('token');
  }
  private handleError(error: HttpErrorResponse){
    switch (error.status) {
      case 422:
        this.error$.next('Не вірний логін або пароль');
        break;
      default:
        this.error$.next('Сталася помилка');
        break;
    }
    return throwError(error);
  }
}
