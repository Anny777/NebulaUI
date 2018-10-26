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
    this.auth.login(this.email, this.pass).subscribe(
      isAuth => this.isLoading = false,
      err => {this.isLoading = false; console.log(err); alert(err.error.error_description)});
  }
}
