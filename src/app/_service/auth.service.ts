import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://sachhay.homestead.me/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  refreshToken():Observable<any> {
    return this.http.post(AUTH_API+ 'refresh', httpOptions);
  }

  constructor(private http:HttpClient) { }

  login(credentials):Observable<any> {
    return this.http.post(AUTH_API+ 'login', {
      username:credentials.username,
      password:credentials.password
    }, httpOptions);
  }

  register(user):Observable<any> {
    return this.http.post(AUTH_API+ 'register', {
      username:user.username,
      name:user.name,
      email:user.email,
      password:user.password
    }, httpOptions);
  }
}
