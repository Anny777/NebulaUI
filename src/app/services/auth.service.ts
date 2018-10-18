import { Injectable, EventEmitter } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { userInfo } from '../model/userInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private access_token: string;
  private token_type: string;
  public authChanged: EventEmitter<boolean> = new EventEmitter();
  public userInfo: userInfo;
  public isAuthenticated: boolean = false;

  constructor(private client: HttpClient, private config: ConfigService) {
    this.access_token = this._getCookie('access_token');
    this.token_type = this._getCookie('token_type');
    this.authChanged.subscribe(i => this.isAuthenticated = i);
    if (!!this.access_token && !!this.token_type) {
      this.getUserInfo();
    }
  }

  public login(email: string, pass: string, success?: (v: any) => void, error?: (v: HttpErrorResponse) => void) {
    var p = new HttpParams()
      .set('grant_type', 'password')
      .set('username', email)
      .set('password', pass);
    this.client
      .post<any>(this.config.host + "Token", p)
      .subscribe(c => {
        this.saveSession(c.access_token, c.token_type, c.expires_in);
        this.getUserInfo();
        success(c);
      }, c => {
        error(c);
      });
  }

  public logout(cb) {
    document.cookie = "access_token=; path=/; expires=" + new Date(0).toUTCString();
    document.cookie = "token_type=; path=/; expires=" + new Date(0).toUTCString();
    this.userInfo = null;
    this.authChanged.emit(false);
    cb();
  }

  public saveSession(at: string, tt: string, ei: string) {
    console.log(ei);
    this.access_token = at;
    this.token_type = tt;
    document.cookie = 'access_token=' + this.access_token + '; path=/; expires=' + ei;
    document.cookie = 'token_type=' + this.token_type + '; path=/; expires=' + ei;
  }

  public get<T>(url: string, success?: (v: T) => void, error?: (v: T) => void) {
    this.client.get<T>(this.config.host + url, { headers: this._addAuth() })
      .subscribe(c => success(c), c => error(c));
  }

  public post<T>(url: string, body?: any, success?: (v: T) => void, error?: (v: T) => void) {
    this.client.post<any>(this.config.host + url, body, { headers: this._addAuth() })
      .subscribe(c => { success(c); }, c => error(c));
  }

  private _addAuth(h?: HttpHeaders): HttpHeaders {
    if (!h) {
      h = new HttpHeaders();
    }

    return h.set('Authorization', (this.token_type ? this.token_type : '') + ' ' + (this.access_token ? this.access_token : ''));
  }

  private _getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  public getUserInfo() {
    this.get<any>(
      "api/Account/UserInfo",
      d => {
        this.userInfo = d;
        this.authChanged.emit(true);
      },
      d => {
        this.authChanged.emit(false);
        console.log(d);
      }
    );
  }

  public userIsInRole(roles: Array<string>) {
    if(!this.userInfo){
      return false;
    }
   
    for (let index = 0; index < roles.length; index++) {
      const element = roles[index];
      if (this.userInfo.Roles.indexOf(element) > -1) {
        return true;
      };
      return false;
    
  }
  }
}
