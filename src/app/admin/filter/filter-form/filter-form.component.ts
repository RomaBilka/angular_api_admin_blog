import { Component, OnInit } from '@angular/core';
import {Filter} from '../../filter/filter';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FilterService} from '../../filter/filter.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {

  public errorMessage: string;
  public filterData: Filter;
  public filterForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private filter: FilterService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getFilter();
  }

  private getFilter() {
    this.activatedRoute.params.forEach((params: Params) => {
      const id = params.id;
      if (id) {
        this.filter.getFilter(id).subscribe(
          filter => {
            this.filterData = filter;
            this.filterForm.patchValue(this.filterData);
          },
          error => this.errorMessage = error
        );
      }
      else {
        this.filterData = new Filter({name: '', order: 0, status: 0});
        this.filterForm.patchValue(this.filterData);
      }
    });
  }

  public onSubmit(filterForm: FormGroup) {
    this.filterData.name = filterForm.value.name;
    this.filterData.order = parseInt(filterForm.value.order);
    this.filterData.status = filterForm.value.status ? 1 : 0;

    if (this.filterData.id) {
      this.filter.updateFilter(this.filterData)
        .subscribe(
          () => this.goBack(),
          error => this.errorMessage = error
        );
    } else {
      this.filter.addFilter(this.filterData)
        .subscribe(
          () => this.goBack(),
          error => this.errorMessage = error
        );
    }
  }
  private goBack() {
    this.router.navigate(['/filters'], {relativeTo: this.activatedRoute});
  }

  public checkError(element: string, errorType: string) {
    return this.filterForm.get(element).hasError(errorType) &&
      this.filterForm.get(element).touched;
  }

  private buildForm() {
    this.filterForm = this.formBuilder.group({
      name: ['', Validators.required],
      order: [0, Validators.required],
      status: [0]
    });
  }

}
