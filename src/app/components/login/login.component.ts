import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../store/Auth/auth.Service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/Auth/auth.Actions';
import { ILoginCommand } from 'src/app/commands/ILoginCommand';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  pass: string;
  isLoading: boolean = false;
  public userInfo: IUser;

  constructor(private auth: AuthService, private router: Router, private store: Store<ILoginCommand>) { }

  ngOnInit() {
  }
  /**
   * login
   */
  public login() {
    this.store.dispatch(login({ username: this.email, password: this.pass }));
    // this.isLoading = true;
    // this.auth.login(this.email, this.pass).subscribe(
    //   isAuth => {
    //     this.isLoading = false;
    //     if (isAuth) {
    //       if (isAuth.Roles.indexOf("Cook") > -1) {
    //         this.router.navigate(['/kitchen']);
    //       }

    //       else if (isAuth.Roles.indexOf("Bartender") > -1) {
    //         this.router.navigate(['/bar']);
    //       }

    //       else
    //         this.router.navigate(['/']);
    //     }
    //   },
    //   err => { this.isLoading = false; console.log(err); });
  }
}
