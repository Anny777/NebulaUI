import { Injectable } from "@angular/core";
import { AuthService } from "src/app/store/Auth/auth.Service";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { map, catchError, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { login, loginFail, loginSuccess } from './auth.Actions';

@Injectable()
export class authEffects {
  constructor(private actions$: Actions, private authService: AuthService) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((c) => this.authService.login(c.username, c.password)
        .pipe(
          map(user => loginSuccess(user)),
          catchError(error => of(loginFail(error)))
        ))));
}
