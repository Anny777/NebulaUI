import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IAuthState } from 'src/app/store/Auth/auth.Reducer';
import { logout, restoreSession } from 'src/app/store/Auth/auth.Actions';
import { AuthGuard } from 'src/app/store/auth/auth.Guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  isVolumeOn: boolean = true;
  isAuthenticated$: Observable<boolean>;
  userName$: Observable<string>;
  redirectSubscription$: Subscription;
  isLoadingLogin$: Observable<boolean>;
  constructor(
    private store: Store<{ auth: IAuthState }>,
    private router: Router,
    private guard: AuthGuard) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select((s) => !!s.auth.accessToken);
    this.userName$ = this.store.select((s) => s.auth.userName);
    this.isLoadingLogin$ = this.store.select((s) => s.auth.isLoadingLogin);
    this.store.dispatch(restoreSession());
    this.redirectSubscription$ = this.store.select(s => s.auth).subscribe(authState => {
      if (authState.accessToken) {
        if (authState.roles.indexOf("Cook") > -1) {
          this.router.navigate(['/kitchen']);
        }

        else if (authState.roles.indexOf("Bartender") > -1) {
          this.router.navigate(['/bar']);
        }

        else
          this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.redirectSubscription$.unsubscribe();
  }

  public logout() {
    this.store.dispatch(logout());
  }

  toggleVolume(value: boolean) {
    this.isVolumeOn = value;
  }

  public userIsInRole(roles: Array<string>): Observable<boolean> {
    return this.guard.userIsInRole(roles);
  }
}