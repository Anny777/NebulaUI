import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email:string;
pass:string;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
/**
 * login
 */
public login() {
  this.auth.login(this.email, this.pass).subscribe((result) => {
    console.log(result);
  })
}
}
