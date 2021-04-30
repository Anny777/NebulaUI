import { Injectable } from "@angular/core";
import { AuthService } from "src/app/store/Auth/auth.Service";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { map, catchError, mergeMap, switchMap, switchMapTo, tap } from "rxjs/operators";
import { of } from "rxjs";
import { login, loginFail, loginSuccess, logout, restoreSession } from './auth.Actions';
import { AuthRepository } from './auth.Repository';
import { LoginResult } from 'src/app/commands/LoginResult';

@Injectable()
export class authEffects {
  constructor(private actions$: Actions, private authService: AuthService, private authRepository: AuthRepository) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(
        (c) => this.authService.login(c.username, c.password)
          .pipe(
            tap(a => this.authRepository.saveSession(a.access_token, a.token_type, a.getDecodedToken().exp)),
          )
          .pipe(
            map(user => loginSuccess(user)),
            catchError(error => of(loginFail(error)))
          ))));

  restoreSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(restoreSession),
      switchMap((c) => of(this.authRepository.getSession())
        .pipe(
          map(user => loginSuccess(user)),
          catchError(error => of(loginFail(error)))
        ))));

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap((c) => of(this.authRepository.resetSession)
        .pipe(
          map(user => loginSuccess(<LoginResult>{ access_token: '', token_type: '' })),
          catchError(error => of(loginFail(error)))
        ))));
}
