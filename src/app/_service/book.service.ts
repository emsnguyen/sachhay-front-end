import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../_models/book';
const BOOK_API = 'http://sachhay.homestead.me/api/books/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  getOne(bookId:number):Observable<any> {
    return this.http.get(BOOK_API+ bookId, httpOptions);
  }

  getAll():Observable<any> {
    return this.http.get(BOOK_API, httpOptions);
  }

  create(book:Book):Observable<any> {
    return this.http.post(BOOK_API, httpOptions);
  }

  update(book:Book, bookId:number):Observable<any> {
    return this.http.put(BOOK_API+bookId, httpOptions);
  }

  delete(bookId:number):Observable<any> {
    return this.http.delete(BOOK_API+bookId, httpOptions);
  }
}
