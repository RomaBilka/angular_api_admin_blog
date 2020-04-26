import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  public set token(token: string){
    sessionStorage.setItem('token', token);
  }
  public get token(): string{
    return sessionStorage.getItem('token');
  }

}
