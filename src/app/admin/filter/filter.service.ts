import { Injectable } from '@angular/core';
import {ApiService} from '../shared/services/api.service';
import {Filter} from './filter';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../shared/services/auth.service';

@Injectable()
export class FilterService {

  constructor(private api: ApiService, private auth: AuthService) { }

  public getFilters(): Observable<Filter[]>{
    return this.api.getFilters().pipe(
      map(this.extractFilters),
      catchError(this.handleError.bind(this))
    );
  }
  public getFilter(id: number): Observable<Filter>{
    return this.api.getFilter(id).pipe(
      map((filter) => {
        return new Filter(filter);
      }),
      catchError(this.handleError.bind(this))
    );
  }
  public addFilter(filter: Filter): Observable<void>{
    return this.api.createFilter(filter).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  public updateFilter(filter: Filter): Observable<void>{
    return this.api.updateFilter(filter).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  public deleteFilter(id: number): Observable<any>{
    return this.api.deleteFilter(id).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  private extractFilters(response: any) {
    const filters: Filter[] = [];
    for (let i = 0; i < response.length; i++) {
      filters.push(new Filter(response[i]));
    }
    return filters;
  }
  private handleError(error: HttpErrorResponse){
    switch (error.status) {
      case 401:
        this.auth.logout();
        break;
      default:
        console.dir(error);
        break;
    }
    return throwError(error);
  }
}
