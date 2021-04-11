import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, concat } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public access_token: string;
  public token_type: string;
  public authChanged: EventEmitter<boolean> = new EventEmitter();
  public userInfo: IUser;
  public isAuthenticated: boolean = false;

  constructor(public client: HttpClient) {
    this.access_token = this._getCookie('access_token');
    this.token_type = this._getCookie('token_type');
    this.authChanged.subscribe(i => this.isAuthenticated = i);
  }

  public login(email: string, pass: string): Observable<any> {
    var p = new HttpParams()
      .set('grant_type', 'password')
      .set('username', email)
      .set('password', pass);

    return concat(this.getToken(p), this.getUserInfo(this))
  }

  public isAuthenticated1(): boolean {
    return !!this.access_token;
  }

  public logout(cb) {
    document.cookie = "access_token=; path=/; expires=" + new Date(0).toUTCString();
    document.cookie = "token_type=; path=/; expires=" + new Date(0).toUTCString();
    this.userInfo = null;
    this.authChanged.emit(false);
    cb();
  }

  private saveSession(at: string, tt: string, ei: string) {
    console.log(ei);
    this.access_token = at;
    this.token_type = tt;
    document.cookie = 'access_token=' + this.access_token + '; path=/; expires=' + ei;
    document.cookie = 'token_type=' + this.token_type + '; path=/; expires=' + ei;
  }

  private _getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  private getToken(data): Observable<any> {
    return this.client.post<any>(environment.host + "Token", data)
      .pipe(
        map(c => {
          if (c.access_token) {
            this.saveSession(c.access_token, c.token_type, c.expires_in);
          }

          return c.response;
        })
      )
  }

  public getUserInfo(a): Observable<IUser> {
    return this.client.get<IUser>(environment.host + "Account/UserInfo")
      .pipe(
        map(d => {
          a.userInfo = d;
          a.authChanged.emit(true);
          return d;
        }),
      )
  }

  public isUserInRole(roles: Array<string>) {
    if (!this.userInfo) {
      return false;
    }

    if (roles.indexOf(this.userInfo.Roles.toString()) > -1) {
      return true;
    }
    else
      return false;
  }
}
