import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { MaterialModule } from './material.module';

import { AdminLoyautComponent } from './shared/components/admin-loyaut/admin-loyaut.component';
import { LoginPageComponent } from './login-page/login-page.component';


import { ApiService } from './shared/services/api.service';
import { AuthService } from './shared/services/auth.service';
import { ImageService } from './image/image.service';
import { FilterService } from './filter/filter.service';
import { UserService } from './user/user.service';
import { AuthGuard } from './shared/services/auth.guard';

import { TokenService } from './shared/services/token.service';
import {ImageListComponent} from './image/image-list/image-list.component';
import {ImageFormComponent} from './image/image-form/image-form.component';
import {FilterFormComponent} from './filter/filter-form/filter-form.component';
import {FilterListComponent} from './filter/filter-list/filter-list.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserFormComponent} from './user/user-form/user-form.component';

@NgModule({
  declarations: [
    AdminLoyautComponent,
    LoginPageComponent,
    ImageListComponent,
    ImageFormComponent,
    FilterFormComponent,
    FilterListComponent,
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLoyautComponent, children: [
          {path: '', redirectTo: 'login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'images', component: ImageListComponent, canActivate: [AuthGuard]},
          {path: 'filters', component: FilterListComponent, canActivate: [AuthGuard]},
          {path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
          {path: 'image/:id', component: ImageFormComponent, canActivate: [AuthGuard]},
          {path: 'image', component: ImageFormComponent, canActivate: [AuthGuard]},
          {path: 'filter/:id', component: FilterFormComponent, canActivate: [AuthGuard]},
          {path: 'filter', component: FilterFormComponent, canActivate: [AuthGuard]},
          {path: 'user/:id', component: UserFormComponent, canActivate: [AuthGuard]},
          {path: 'user', component: UserFormComponent, canActivate: [AuthGuard]},
        ]
      }
    ]),
    MaterialModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ApiService,
    AuthService,
    TokenService,
    ImageService,
    FilterService,
    UserService,
    AuthGuard
  ]
})
export class AdminModule { }
