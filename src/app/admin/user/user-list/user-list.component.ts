import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../user/user';
import {UserService} from '../../user/user.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] =  ['name', 'login', 'delete'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.getList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getList(){
    this.user.getUsers().subscribe(users => {
      this.dataSource.data = users;
    });
  }
  public deleteUser(id: number){
    this.user.deleteUser(id).subscribe( () => {
      this.ngOnInit();
    });
  }

}
