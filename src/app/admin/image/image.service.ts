import { Injectable } from '@angular/core';
import {ApiService} from '../shared/services/api.service';
import {Image} from './image';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../shared/services/auth.service';

@Injectable()
export class ImageService {

  constructor(private api: ApiService, private auth: AuthService) { }

  public getImages(): Observable<Image[]>{
    return this.api.getImages().pipe(
      map(this.extractImages),
      catchError(this.handleError.bind(this))
    );
  }
  public getImage(id: number): Observable<Image>{
    return this.api.getImage(id).pipe(
      map((image) => {
        return new Image(image);
      }),
      catchError(this.handleError.bind(this))
    );
  }
  public addImage(image: Image): Observable<void>{
    return this.api.createImage(image).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  public updateImage(image: Image): Observable<void>{
    return this.api.updateImage(image).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  public deleteImage(id: number): Observable<void>{
    return this.api.deleteImage(id).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public uploadImage(file): Observable<File>{
    return this.api.uploadImage(file).pipe(
      map((image: File) => {
        return image;
      }),
      catchError(this.handleError.bind(this))
    );
  }

  private extractImages(response: any) {
    const images: Image[] = [];
    for (let i = 0; i < response.length; i++) {
      images.push(new Image(response[i]));
    }
    return images;
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
