import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private client: HttpClient, private config: ConfigService) { }
  /**
   * login
   */
  public login(email: string, pass: string): Observable<any> {
    const loginData = {
      'grant_type': 'password',
      'username': email,
      'password': pass
    };
    const ld = 'grant_type=password&username=bystrova_777@icloud.com&password=eNK746dWxNDtMjYk';
console.log(loginData);
    return this.client.post(this.config.host + "Token", ld)
  }
}
