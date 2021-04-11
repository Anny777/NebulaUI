import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated1()) {
      this.router.navigate(['login']);
      return false;
    }

    const expectedRole = route.data.roles;
    if (!this.auth.isUserInRole(expectedRole)) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
