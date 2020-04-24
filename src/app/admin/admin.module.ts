import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { AdminLoyautComponent } from './shared/components/admin-loyaut/admin-loyaut.component';
import { LoginPageComponent } from './login-page/login-page.component';



@NgModule({
  declarations: [AdminLoyautComponent, LoginPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLoyautComponent, children: [

        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }
