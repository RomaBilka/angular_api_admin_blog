import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  public errorMessage: string;
  public userData: User;
  public userForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private user: UserService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getUser();
  }

  private getUser() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];
      if (id) {
        this.user.getUser(id).subscribe(
          user => {
            this.userData = user;
            this.userForm.patchValue(this.userData);
          },
          error => this.errorMessage = error
        );
      }
      else {
        this.userData = new User({name: '', login: ''});
        this.userForm.patchValue(this.userData);
      }
    });
  }

  public onSubmit(userForm: FormGroup) {
    this.userData.name = userForm.value.name;
    this.userData.login = userForm.value.login;
    this.userData.password = userForm.value.password;

    if (this.userData.id) {
      this.user.updateUser(this.userData)
        .subscribe(
          () => this.goBack(),
          error => this.errorMessage = error
        );
    } else {
        this.user.addUser(this.userData)
            .subscribe(
            () => this.goBack(),
            error => this.errorMessage = error
            );
    }
  }
  private goBack() {
    this.router.navigate(["/users"], {relativeTo: this.activatedRoute});
  }

  public checkError(element: string, errorType: string) {
    return this.userForm.get(element).hasError(errorType) &&
      this.userForm.get(element).touched;
  }

  private buildForm() {
    this.userForm = this.formBuilder.group({
      name: ["", Validators.required],
      login: ["", Validators.required],
      password: [""]
    });
  }
}
