import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Book } from '../_models/book';
import { catchError, tap } from 'rxjs/operators';
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

  create(formData:FormData):Observable<any> {
    let headers = new HttpHeaders();
        /** In Angular 5, including the header Content-Type can invalidate your request */
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(BOOK_API, formData, { headers});
  }

  update(book:Book, bookId:number):Observable<any> {
    return this.http.put(BOOK_API+bookId, book, httpOptions);
  }

  delete(bookId:number):Observable<any> {
    return this.http.delete(BOOK_API+bookId, httpOptions);
  }
}
