import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { Store } from '@ngrx/store';
import { IAuthState } from '../store/Auth/auth.Reducer';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  token: string;
  tokenType: string;
  subscription: Subscription;

  constructor(private router: Router, private store: Store<{ auth: IAuthState }>) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.subscription = this.store.select(s => s.auth).subscribe(auth => {
      this.token = auth.accessToken;
      this.tokenType = auth.tokenType;
    });

    request = request.clone({
      setHeaders: {
        Authorization: `${this.tokenType} ${this.token}`
      }
    });

    return next.handle(request).do(event => { }, err => {
      if (err instanceof HttpErrorResponse && err.status == 401) {
        this.router.navigate(['/login']);
      }
    });
  }
}
