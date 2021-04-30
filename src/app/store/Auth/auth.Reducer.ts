import { createReducer, on } from '@ngrx/store';
import { login, loginFail, loginSuccess, logout, restoreSession } from './auth.Actions';
import { Action } from '@ngrx/store/src/models';
import jwtDecode from 'jwt-decode';

export interface IAuthState {
  userName: string;
  isLoadingLogin: boolean,
  accessToken: string,
  tokenType: string,
  roles: string[],
  expires: string
}

const initialState: IAuthState = {
  userName: '',
  isLoadingLogin: false,
  accessToken: '',
  tokenType: '',
  roles: [],
  expires: ''
};

const _authReducer = createReducer(
  initialState,
  on(restoreSession, (state) => ({ ...state, isLoadingLogin: true })),
  on(login, (state, action) => ({ ...state, isLoadingLogin: true })),
  on(loginSuccess, (state, action) => OnLoginSuccess(state, action, initialState)),
  on(loginFail, (state, action) => ({ ...state, isLoadingLogin: false })),
  on(logout, (state, action) => ({ ...state, isLoadingLogin: true }))
);

function OnLoginSuccess(state: IAuthState, action: any, initialState: IAuthState) {
  if (!action.access_token) {
    return initialState;
  }
  console.log(action)
  var userData = jwtDecode<any>(action.access_token);
  return ({
    ...state,
    accessToken: action.access_token,
    tokenType: action.token_type,
    isLoadingLogin: false,
    roles: userData.roles,
    userName: userData.name,
    expires: userData.exp
  });
}

export function authReducer(state: IAuthState, action: Action): IAuthState {
  return _authReducer(state, action);
}
