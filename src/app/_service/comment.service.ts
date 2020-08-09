import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../_models/comment';

const COMMENT_API = 'http://sachhay.homestead.me/api/comments/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }
  create(comment:Comment):Observable<any> {
    return this.http.post(COMMENT_API, comment, httpOptions);
  }
  update(id:number,comment:Comment) {
    return this.http.put(COMMENT_API+id, comment, httpOptions);
  }
  delete(id:number) {
    return this.http.delete(COMMENT_API+id, httpOptions);
  }
}
