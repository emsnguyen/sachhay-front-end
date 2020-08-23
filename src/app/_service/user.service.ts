import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const USER_URL = 'http://sachhay.homestead.me/api/users/';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllWithPaging(sortField: string, sortDirection: string, pageIndex: number, pageSize: number): Observable < any > {
    let params = {
      sortField,
      sortDirection,
      page: pageIndex.toString(),
      size: pageSize.toString()
    };
    return this.http.get(USER_URL, {
      params
    });
  }

  getAll(): Observable < any > {
    return this.http.get(USER_URL);
  }

  update(editUser: any): Observable < any > {
    return this.http.put(USER_URL + editUser.id, editUser);
  }

  delete(userId: number): Observable < any > {
    return this.http.delete(USER_URL + userId);
  }
}
