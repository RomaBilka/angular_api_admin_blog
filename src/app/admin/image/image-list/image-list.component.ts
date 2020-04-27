import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {ImageService} from '../image.service';
import {Image} from '../image';
import {MatTableDataSource} from '@angular/material/table';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] =  ['image', 'name', 'order', 'status', 'delete'];
  dataSource = new MatTableDataSource<Image>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private image: ImageService) { }

  ngOnInit(): void {
    this.getList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getList(){
    this.image.getImages().subscribe(images => {
      this.dataSource.data = images;
    });
  }
  public deleteImage(id: number){
    this.image.deleteImage(id).subscribe( () => {
      this.ngOnInit();
    });
  }

}
