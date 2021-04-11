import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/store/Auth/auth.Service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  role: boolean = false;
  user: string = "";
  isVolumeOn: boolean = true;
  constructor(private auth: AuthService, private router: Router, private orderService: OrderService) { }
  private isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated;
    this.auth.authChanged.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      if (isAuth) {
        this.orderService.init();
        this.user = this.auth.userName;
      }
    });
    this.auth.userName;

  }
  public logout() {
    this.auth.logout();
  }

  toggleVolume(value: boolean)
  {
    this.isVolumeOn = value;
  }

  public userIsInRole(roles: Array<string>) {
    return this.auth.userIsInRole(roles);
  }

}
