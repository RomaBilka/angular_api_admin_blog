import { Component, OnInit } from '@angular/core';
import {Image} from '../../image/image';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ImageService} from '../../image/image.service';
import {FilterService} from '../../filter/filter.service';

import {MatSelectModule} from '@angular/material/select';
import {Filter} from '../../filter/filter';


@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit {

  public errorMessage: string;
  public imageData: Image;
  public imageForm: FormGroup;
  public pageData = {filters: null};
  public uploaded = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private image: ImageService,
    private filter: FilterService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getData();
    this.getImage();
  }

  private getImage() {
    this.activatedRoute.params.forEach((params: Params) => {
      const id = params.id;
      if (id) {
        this.image.getImage(id).subscribe(
          image => {
            this.imageData = image;
            this.imageForm.patchValue(this.imageData);
          },
          error => this.errorMessage = error
        );
      }
      else {
        this.imageData = new Image({name: '', order: 0, status: 0});
        this.imageForm.patchValue(this.imageData);
      }
    });
  }
  public getData(): void{
    this.filter.getFilters().subscribe(filters => {
      this.pageData.filters = filters;
    });
  }
  public deleteImage(): void{
    this.imageData.name = '';
    this.imageForm.patchValue(this.imageData);
  }

  public uploadImage(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.uploaded = true;
      const file: File = fileList[0];
      this.image.uploadImage(file).subscribe(image => {
        this.imageData.name = image.name;
        this.imageForm.patchValue(this.imageData);
        this.uploaded = false;
      });
    }
  }

  public addFilter(): void{
    const control = new FormControl('', Validators.required);
    (this.imageForm.get('filters') as FormArray).push(control);
  }
  public onSubmit(imageForm: FormGroup): void {
    this.imageData.name = imageForm.value.name;
    this.imageData.order = parseInt(imageForm.value.order);
    this.imageData.status = imageForm.value.status ? 1 : 0;

    const filters = [];
    imageForm.value.filters.forEach(f => filters.push(new Filter({id: f})));
    this.imageData.filters = filters;

    if (this.imageData.id) {
      this.image.updateImage(this.imageData)
        .subscribe(
          () => this.goBack(),
          error => this.errorMessage = error
        );
    } else {
      this.image.addImage(this.imageData)
        .subscribe(
          () => this.goBack(),
          error => this.errorMessage = error
        );
    }
  }
  private goBack() {
    this.router.navigate(['/images'], {relativeTo: this.activatedRoute});
  }

  public checkError(element: string, errorType: string) {
    return this.imageForm.get(element).hasError(errorType) &&
      this.imageForm.get(element).touched;
  }

  private buildForm() {
    this.imageForm = this.formBuilder.group({
      name: ['', Validators.required],
      order: [0],
      status: [0],
      filters: new FormControl()
    });
  }

}
