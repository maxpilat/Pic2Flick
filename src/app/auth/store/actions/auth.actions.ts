import { createAction, props } from '@ngrx/store';

export enum AuthActionTypes {
  LoginRequest = '[Login] Login Request',
  LoginSuccess = '[Login] Login Success',
  LoginError = '[Login] Login Error',

  Logout = '[Login] Logout',
  LogoutSuccess = '[Login] Logout Success',
  LogoutError = '[Login] Logout Error',
}
