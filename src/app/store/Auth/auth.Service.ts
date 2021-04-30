import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResult } from 'src/app/commands/LoginResult';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public client: HttpClient) {
  }

  public login(email: string, pass: string): Observable<LoginResult> {
    return this.client.post<LoginResult>(environment.host + "Account", { username: email, password: pass });
  }
}
