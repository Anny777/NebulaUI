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
  isLoading: boolean = false;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  /**
   * login
   */
  public login() {
    this.isLoading = true;
    this.auth.login(this.email, this.pass, c => {
      this.isLoading = false;
      this.auth.get<any>(
        "api/Account/UserInfo",
        d => console.log(d),
        d => console.log(d));
    }, c => console.log(c));
  }
}
