import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Rating } from '../_models/rating';
import { Observable } from 'rxjs';

const RATING_API = 'http://sachhay.homestead.me/api/ratings/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http:HttpClient) { }
  create(rating:Rating):Observable<any> {
    return this.http.post(RATING_API, rating, httpOptions);
  }
  update(id:number,rating:Rating) {
    return this.http.put(RATING_API+id, rating, httpOptions);
  }
  delete(id:number) {
    return this.http.delete(RATING_API+id, httpOptions);
  }
}
