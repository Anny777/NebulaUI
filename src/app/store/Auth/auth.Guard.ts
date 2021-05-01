import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IAuthState } from './auth.Reducer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router, private store: Store<{ auth: IAuthState }>) { }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(s => s.auth)
      .pipe(
        tap(authState => {
          if (!authState.accessToken) {
            this.router.navigate(['login']);
          }
        }))
      .pipe(
        switchMap(s => this.userIsInRole(route.data?.roles)))
      .pipe(
        tap(isInRole => {
          if (!isInRole) {
            this.router.navigate(['login']);
          }
        })
      );
  }

  public userIsInRole(roles: Array<string>): Observable<boolean> {
    return this.store.select(s => s.auth.roles).pipe(
      switchMap(userRoles => {
        return this.checkRoles(userRoles, roles);
      })
    );
  }

  public checkRoles(userRoles: Array<string>, roles: Array<string>): Observable<boolean> {
    if (!userRoles || userRoles.length < 1) {
      return of(false);
    }

    let isInRole: boolean = false;
    roles.forEach(role => {
      if (userRoles.indexOf(role) > -1) {
        isInRole = true;
      }
    });

    return of(isInRole);
  }
}
