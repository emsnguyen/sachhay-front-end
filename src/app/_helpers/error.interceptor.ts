import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from '../_service/token-storage.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private tokenStorageService: TokenStorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.tokenStorageService.logout();
                window.location.href="login";
            }

            const error = err.error.errors || err.error.message;
            return throwError(error);
        }))
    }
}
