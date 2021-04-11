import { createAction, props } from "@ngrx/store";
import { ILoginCommand } from 'src/app/commands/ILoginCommand';
import { ILoginResult } from 'src/app/commands/ILoginResult';

export const login = createAction('[User] Login', props<ILoginCommand>());
export const loginSuccess = createAction('[User] Login success', props<ILoginResult>());
export const loginFail = createAction('[User] Logout fail', props<any>());

export const logout = createAction('[User] Logout');
