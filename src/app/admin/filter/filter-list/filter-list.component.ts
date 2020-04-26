import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Filter} from '../../filter/filter';
import {FilterService} from '../../filter/filter.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] =  ['name', 'order', 'status', 'delete'];
  dataSource = new MatTableDataSource<Filter>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private filter: FilterService) { }

  ngOnInit(): void {
    this.getList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getList(){
    this.filter.getFilters().subscribe(filters => {
      this.dataSource.data = filters;
    });
  }
  public deleteFilter(id: number){
    this.filter.deleteFilter(id).subscribe( () => {
      this.ngOnInit();
    });
  }

}
