import { createAction, props } from "@ngrx/store";
import { ILoginCommand } from 'src/app/commands/ILoginCommand';
import { LoginResult } from 'src/app/commands/LoginResult';

export const restoreSession = createAction('[Auth] Restore session');

export const login = createAction('[Auth] Login', props<ILoginCommand>());
export const loginSuccess = createAction('[Auth] Login success', props<LoginResult>());
export const loginFail = createAction('[Auth] Logout fail', props<any>());

export const logout = createAction('[Auth] Logout');
