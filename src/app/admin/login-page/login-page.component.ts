import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginUser} from '../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()){
      this.router.navigate(['/', 'images']);
    }
    this.loginForm = new FormGroup(
      {
        login: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required])
      }
    );
  }
  login(loginForm: FormGroup): void{
    const data: LoginUser = {
      login: this.loginForm.value.login,
      password: this.loginForm.value.password
    };
    this.auth.login(data);

  }
  public checkError(element: string, errorType: string) {
    return this.loginForm.get(element).hasError(errorType) &&
      this.loginForm.get(element).touched;
  }
}
