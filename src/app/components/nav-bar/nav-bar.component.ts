import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAuthState } from 'src/app/store/Auth/auth.Reducer';
import { logout, restoreSession } from 'src/app/store/Auth/auth.Actions';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isVolumeOn: boolean = true;
  isAuthenticated$: Observable<boolean>;
  userName$: Observable<string>;
  isLoadingLogin$: Observable<boolean>;
  constructor(private store: Store<{ auth: IAuthState }>, private guard: AuthGuardService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select((s) => !!s.auth.accessToken);
    this.userName$ = this.store.select((s) => s.auth.userName);
    this.isLoadingLogin$ = this.store.select((s) => s.auth.isLoadingLogin);
    this.store.dispatch(restoreSession());
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
