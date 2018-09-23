import { Injectable, Input } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private access_token: string;
  private token_type: string;
  constructor(private client: HttpClient, private config: ConfigService) { }
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
      .subscribe(c => { this.saveSession(c.access_token, c.token_type); success(c); }, c => error(c));
  }

  public saveSession(at: string, tt: string) {
    this.access_token = at;
    this.token_type = tt;
  }

  public get<T>(url: string, success?: (v: T) => void, error?: (v: T) => void) {
    this.client.get<T>(this.config.host + url, { headers: this._addAuth() })
      .subscribe(c => success(c), c => error(c));
  }

  public post<T>(url: string, body?: any, success?: (v: T) => void, error?: (v: T) => void) {
    this.client.post<T>(this.config.host + url, body, { headers: this._addAuth() })
      .subscribe(c => success(c), c => error(c));
  }

  private _addAuth(h?: HttpHeaders): HttpHeaders {
    if (!h) {
      h = new HttpHeaders();
    }

    return h.set('Authorization', (this.token_type ? this.token_type : '') + ' ' + (this.access_token ? this.access_token : ''));
  }
}
