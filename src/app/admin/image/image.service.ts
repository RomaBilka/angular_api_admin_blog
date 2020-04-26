import { Injectable } from '@angular/core';
import {ApiService} from '../shared/services/api.service';
import {Image} from './image';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ImageService {

  constructor(private api: ApiService) { }

  public getImages(): Observable<Image[]>{
    return this.api.getImages().pipe(
      map(this.extractImages)
    );
  }
  public deleteImage(id: number){
    console.dir(id);
    return this.api.getImage(id).pipe(

    );
  }
  private extractImages(response: any) {
    const images: Image[] = [];
    for (let i = 0; i < response.length; i++) {
      images.push(new Image(response[i]));
    }
    return images;
  }
}
