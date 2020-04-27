import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-loyaut',
  templateUrl: './admin-loyaut.component.html',
  styleUrls: ['./admin-loyaut.component.css']
})
export class AdminLoyautComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) {

  }
  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }
}
