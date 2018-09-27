import { Injectable, Input } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private access_token: string;
  private token_type: string;
  constructor(private client: HttpClient, private config: ConfigService) {
    this.access_token = this._getCookie('access_token');
    this.token_type = this._getCookie('token_type');
  }
  /**
   * login
   */
  public login(email: string, pass: string, success?: (v: any) => void, error?: (v: HttpErrorResponse) => void) {
    console.log('login');
    var p = new HttpParams()
      .set('grant_type', 'password')
      .set('username', email)
      .set('password', pass);
    console.log(p);
    this.client
      .post<any>(this.config.host + "Token", p)
      .subscribe(c => { this.saveSession(c.access_token, c.token_type, c.expires_in); success(c); }, c => error(c));
  }

  public logout() {
    document.cookie = "access_token=; path=/; expires=" + new Date(0).toUTCString();
    document.cookie = "token_type=; path=/; expires=" + new Date(0).toUTCString();
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
}
