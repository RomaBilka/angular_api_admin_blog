import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { MaterialModule } from './material.module';

import { AdminLoyautComponent } from './shared/components/admin-loyaut/admin-loyaut.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ImageComponent } from './image/image.component';
import { FilterComponent } from './filter/filter.component';
import { UserComponent } from './user/user.component';

import { ApiService } from './shared/services/api.service';
import { AuthService } from './shared/services/auth.service';

@NgModule({
  declarations: [AdminLoyautComponent, LoginPageComponent, ImageComponent, FilterComponent, UserComponent],
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
          {path: 'image', component: ImageComponent},
          {path: 'filter', component: FilterComponent},
          {path: 'user', component: UserComponent},
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
    AuthService
  ]
})
export class AdminModule { }
