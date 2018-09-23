import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  pass: string;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  /**
   * login
   */
  public login() {

    this.auth.login(this.email, this.pass, c =>
      {
        this.auth.get<any>(
          "api/Account/UserInfo",
          d => console.log(d),
          d => console.log(d));
      }, c => console.log(c));
  }
}
