import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ILoginCommand } from '../../commands/ILoginCommand';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public accessToken: string;
  public tokenType: string;
  public userName: string;
  public authChanged: EventEmitter<boolean> = new EventEmitter();
  public isAuthenticated: boolean = false;

  private userRoles: string[];

  constructor(public client: HttpClient) {
    this.accessToken = this._getCookie('access_token');
    this.tokenType = this._getCookie('token_type');
    this.authChanged.subscribe(i => this.isAuthenticated = i);
  }

  public login(email: string, pass: string): Observable<any> {
    return this.getToken({ username: email, password: pass })
  }

  public logout() {
    document.cookie = "access_token=; path=/; expires=" + new Date(0).toUTCString();
    document.cookie = "token_type=; path=/; expires=" + new Date(0).toUTCString();
    this.authChanged.emit(false);
  }

  private saveSession(at: string, tt: string) {
    this.accessToken = at;
    this.tokenType = tt;
    var decodedToken = jwtDecode<any>(at);
    this.userName = decodedToken.name;
    this.userRoles = decodedToken.roles;
    document.cookie = `access_token=${this.accessToken}; path=/; expires=${decodedToken.exp}`;
    document.cookie = `token_type=${this.tokenType}; path=/; expires=${decodedToken.exp}`;
  }

  private _getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  private getToken(command: ILoginCommand): Observable<any> {
    return this.client.post<any>(environment.host + "Account", command)
      .pipe(
        map(c => {
          if (c.access_token) {
            this.saveSession(c.access_token, c.token_type);
          }

          return c.response;
        })
      )
  }

  public userIsInRole(roles: Array<string>) {
    if (!this.userRoles || this.userRoles.length < 1) {
      return false;
    }

    let result = false;
    roles.forEach(role => {
      if (this.userRoles.indexOf(role) > -1) {
        result = true;
      }
    });

    return result;
  }
}
