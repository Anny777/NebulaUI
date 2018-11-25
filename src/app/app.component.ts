import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { IUser } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Nebula';
  role: boolean = false;
  user: string = "";
  constructor(private auth: AuthService, private router: Router) { }
  private isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated;
    this.auth.authChanged.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      this.user = this.auth.userInfo.Email;
    });
    this.auth.getUserInfo(this.auth).subscribe();

  }
  public logout() {
    this.auth.logout(() => this.router.navigate(['/login']));
  }

  public userIsInRole(roles: Array<string>) {
    return this.auth.userIsInRole(roles);
  }
}

