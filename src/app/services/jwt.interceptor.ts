import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { Store } from '@ngrx/store';
import { IAuthState } from '../store/Auth/auth.Reducer';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store: Store<{ auth: IAuthState }>) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.select(s => s.auth.accessToken);
    const tokenType = this.store.select(s => s.auth.tokenType);
    request = request.clone({
      setHeaders: {
        Authorization: `${tokenType} ${token}`
      }
    });

    return next.handle(request).do(event => { }, err => {
      if (err instanceof HttpErrorResponse && err.status == 401) {
        this.router.navigate(['/login']);
      }
    });
  }
}
