import { Injectable } from '@angular/core';
import {LoginUser, Token } from '../interfaces';
import {catchError, tap} from 'rxjs/operators';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Subject, throwError} from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private api: ApiService, private tokenStore: TokenService) { }
  public  error$: Subject<string> = new Subject<string>();

  public isAuthenticated(): boolean {
    return !!this.tokenStore.token;
  }

  public login(loginUser: LoginUser){
    this.api.login( loginUser ).pipe(
      tap((response: Token) => { this.tokenStore.token = response.token; }),
      catchError(this.handleError.bind(this))
    ).subscribe();
  }

  public logout(): void{
    sessionStorage.clear();
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
