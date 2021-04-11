import { createReducer, on } from '@ngrx/store';
import { login, loginFail, loginSuccess, logout } from './auth.Actions';
import { Action } from '@ngrx/store/src/models';

export interface IAuthState {
  isLoadingLogin: boolean,
  accessToken: string,
  tokenType: string,
  logout: boolean
}

const initialState: IAuthState = {
  isLoadingLogin: false,
  accessToken: '',
  tokenType: '',
  logout: false
};

const _authReducer = createReducer(
  initialState,
  on(login, (state, action) => ({ ...state, isLoadingLogin: true })),
  on(loginSuccess, (state, action) => ({ ...state, accessToken: action.access_token, tokenType: action.token_type, isLoadingLogin: false })),
  on(loginFail, (state, action) => ({ ...state, isLoadingLogin: false })),
  on(logout, (state, action) => ({ ...state, logout: true }))
);

export function authReducer(state: IAuthState, action: Action): IAuthState {
  return _authReducer(state, action);
  // switch (action.type) {
  //   case UserActions.getUser:
  //     return { ...state, isLoadingGetUser: true };
  //   case UserActions.getUserSuccess:
  //     return { ...state, user: action.payload, isLoadingGetUser: false };
  //   case UserActions.getUserFail:
  //     return { ...state, isLoadingGetUser: true };
  //   case UserActions.login:
  //     return { ...state, isLoadingLogin: false };
  //   case UserActions.loginSuccess:
  //     return { ...state, user: action.payload, isLoadingLogin: false };
  //   case UserActions.loginFail:
  //     return { ...state, isLoadingLogin: true };
  //   case UserActions.logout:
  //     return { ...state, logout: true };
  //   default:
  //     return state;
  // }

}
