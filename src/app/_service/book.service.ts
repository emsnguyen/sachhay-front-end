import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
const BOOK_API = 'http://sachhay.homestead.me/api/books/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {}

  getOne(bookId: number): Observable < any > {
    return this.http.get(BOOK_API + bookId, httpOptions);
  }

  getAll(): Observable < any > {
    return this.http.get(BOOK_API, httpOptions);
  }

  create(formData: FormData): Observable < any > {
    return this.http.post(BOOK_API, formData);
  }

  update(bookId: number, formData: FormData): Observable < any > {
    let headers = new HttpHeaders();
    return this.http.post(BOOK_API + bookId + "?_method=PUT", formData, {
      headers
    });
  }

  delete(bookId: number): Observable < any > {
    return this.http.delete(BOOK_API + bookId, httpOptions);
  }

  search(q: string): Observable < any > {
    let params = {
      q
    };
    return this.http.get(BOOK_API + 'search', {params});
  }
}
