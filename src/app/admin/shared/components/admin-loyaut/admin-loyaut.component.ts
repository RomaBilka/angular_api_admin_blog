import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-loyaut',
  templateUrl: './admin-loyaut.component.html',
  styleUrls: ['./admin-loyaut.component.css']
})
export class AdminLoyautComponent implements OnInit {

  constructor(
    private router: Router,
    public auth: AuthService
  ) {

  }
  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/', 'login']);
  }
}
