import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { AdminLoyautComponent } from './shared/components/admin-loyaut/admin-loyaut.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ImageComponent } from './image/image.component';
import { FilterComponent } from './filter/filter.component';
import { UserComponent } from './user/user.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AdminLoyautComponent, LoginPageComponent, ImageComponent, FilterComponent, UserComponent],
  imports: [
    CommonModule,
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
  ]
})
export class AdminModule { }
