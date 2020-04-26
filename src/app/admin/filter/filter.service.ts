import { Injectable } from '@angular/core';
import {ApiService} from '../shared/services/api.service';
import {Filter} from './filter';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class FilterService {

  constructor(private api: ApiService) { }

  public getFilters(): Observable<Filter[]>{
    return this.api.getFilters().pipe(
      map(this.extractFilters)
    );
  }
  public deleteFilter(id: number): Observable<any>{
    return this.api.deleteFilter(id).pipe();
  }
  private extractFilters(response: any) {
    const filters: Filter[] = [];
    for (let i = 0; i < response.length; i++) {
      filters.push(new Filter(response[i]));
    }
    return filters;
  }
}
