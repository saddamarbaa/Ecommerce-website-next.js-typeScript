import { Action } from 'redux';

import { AuthResponseType } from './_prototype';

export enum AuthenticationActionType {
  AUTH_LOGIN_LOADING = 'AUTH_LOGIN_LOADING',
  AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED',
  AUTH_LOGIN_REST = 'AUTH_LOGIN_REST',
  AUTH_FORGET_PASSWORD_LOADING = 'AUTH_FORGET_PASSWORD_LOADING',
  AUTH_FORGET_PASSWORD_SUCCESS = 'AUTH_FORGET_PASSWORD_SUCCESS',
  AUTH_FORGET_PASSWORD_FAILED = 'AUTH_FORGET_PASSWORD_FAILED',
  AUTH_FORGET_PASSWORD_REST = 'AUTH_FORGET_PASSWORD_REST',
  AUTH_REST_PASSWORD_LOADING = 'AUTH_REST_PASSWORD_LOADING',
  AUTH_REST_PASSWORD_SUCCESS = 'AUTH_REST_PASSWORD_SUCCESS',
  AUTH_REST_PASSWORD_FAILED = 'AUTH_REST_PASSWORD_FAILED',
  AUTH_REST_PASSWORD_REST = 'AUTH_REST_PASSWORD_REST',
  AUTH_CONFIRM_EMAIL_LOADING = 'AUTH_CONFIRM_EMAIL_LOADING',
  AUTH_CONFIRM_EMAIL_SUCCESS = 'AUTH_CONFIRM_EMAIL_SUCCESS',
  AUTH_CONFIRM_EMAIL_FAILED = 'AUTH_CONFIRM_EMAIL_FAILED',
  AUTH_CONFIRM_EMAIL_REST = 'AUTH_CONFIRM_EMAIL_REST',
  AUTH_SIGINUP_LOADING = 'AUTH_SIGINUP_LOADING ',
  AUTH_SIGINUP_SUCCESS = 'AUTH_SIGINUP_SUCCESS',
  AUTH_SIGINUP_FAILED = 'AUTH_SIGINUP_FAILED',
  AUTH_SIGINUP_REST = 'AUTH_SIGINUP_REST',
  IS_AUTHENTICATED_SUCCESS = 'IS_AUTHENTICATED_SUCCESS',
  REMOVE_AUTHENTICATED_USER = 'REMOVE_AUTHENTICATED_USER',
  IS_ADMIN = 'IS_ADMIN',
  HYDRATE = 'HYDRATE',
  AUTH_UPDATE_PROFILE_LOADING = 'AUTH_UPDATE_PROFILE_LOADING ',
  AUTH_UPDATE_PROFILE_SUCCESS = 'AUTH_UPDATE_PROFILE_SUCCESS',
  AUTH_UPDATE_PROFILE_FAILED = 'AUTH_UPDATE_PROFILE_FAILED',
  AUTH_UPDATE_PROFILE_REST = 'AUTH_UPDATE_PROFILE_REST',
}

export interface actionAuthLoginIsPending extends Action {
  type: AuthenticationActionType.AUTH_LOGIN_LOADING;
}

export interface actionAuthLoginIsSuccess extends Action {
  type: AuthenticationActionType.AUTH_LOGIN_SUCCESS;
  payload: AuthResponseType;
}

export interface actionAuthLoginIsError extends Action {
  type: AuthenticationActionType.AUTH_LOGIN_FAILED;
  payload: AuthResponseType;
}

export interface actionAuthLoginIsRest extends Action {
  type: AuthenticationActionType.AUTH_LOGIN_REST;
}

export interface actionAuthUpdateProfileIsPending extends Action {
  type: AuthenticationActionType.AUTH_UPDATE_PROFILE_LOADING;
}

export interface actionAuthUpdateProfileIsSuccess extends Action {
  type: AuthenticationActionType.AUTH_UPDATE_PROFILE_SUCCESS;
  payload: AuthResponseType;
}

export interface actionAuthUpdateProfileIsError extends Action {
  type: AuthenticationActionType.AUTH_UPDATE_PROFILE_FAILED;
  payload: AuthResponseType;
}

export interface actionAuthUpdateProfileIsRest extends Action {
  type: AuthenticationActionType.AUTH_UPDATE_PROFILE_REST;
}
export interface actionForgotPasswordIsPending extends Action {
  type: AuthenticationActionType.AUTH_FORGET_PASSWORD_LOADING;
}

export interface actionForgotPasswordIsSuccess extends Action {
  type: AuthenticationActionType.AUTH_FORGET_PASSWORD_SUCCESS;
  payload: AuthResponseType;
}

export interface actionForgotPasswordIsError extends Action {
  type: AuthenticationActionType.AUTH_FORGET_PASSWORD_FAILED;
  payload: AuthResponseType;
}

export interface actionForgotPasswordIsRest extends Action {
  type: AuthenticationActionType.AUTH_FORGET_PASSWORD_REST;
}

export interface actionRestPasswordIsPending extends Action {
  type: AuthenticationActionType.AUTH_REST_PASSWORD_LOADING;
}

export interface actionRestPasswordIsSuccess extends Action {
  type: AuthenticationActionType.AUTH_REST_PASSWORD_SUCCESS;
  payload: AuthResponseType;
}

export interface actionRestPasswordIsError extends Action {
  type: AuthenticationActionType.AUTH_REST_PASSWORD_FAILED;
  payload: AuthResponseType;
}

export interface actionRestPasswordIsRest extends Action {
  type: AuthenticationActionType.AUTH_REST_PASSWORD_REST;
}

export interface actionConfirmEmailIsPending extends Action {
  type: AuthenticationActionType.AUTH_CONFIRM_EMAIL_LOADING;
}

export interface actionConfirmEmailIsSuccess extends Action {
  type: AuthenticationActionType.AUTH_CONFIRM_EMAIL_SUCCESS;
  payload: AuthResponseType;
}

export interface actionConfirmEmailIsError extends Action {
  type: AuthenticationActionType.AUTH_CONFIRM_EMAIL_FAILED;
  payload: AuthResponseType;
}

export interface actionConfirmEmailIsRest extends Action {
  type: AuthenticationActionType.AUTH_CONFIRM_EMAIL_REST;
}

export interface actionSignUpIsPending extends Action {
  type: AuthenticationActionType.AUTH_SIGINUP_LOADING;
}

export interface actionSignUpIsSuccess extends Action {
  type: AuthenticationActionType.AUTH_SIGINUP_SUCCESS;
  payload: AuthResponseType;
}

export interface actionSignUpIsError extends Action {
  type: AuthenticationActionType.AUTH_SIGINUP_FAILED;
  payload: AuthResponseType;
}

export interface actionSignUpIsRest extends Action {
  type: AuthenticationActionType.AUTH_SIGINUP_REST;
}

export interface actionIsAuthenticatedSuccess extends Action {
  type: AuthenticationActionType.IS_AUTHENTICATED_SUCCESS;
}

export interface actionRemoveAuthenticatedUser extends Action {
  type: AuthenticationActionType.REMOVE_AUTHENTICATED_USER;
}

export interface actionIsADmin extends Action {
  type: AuthenticationActionType.IS_ADMIN;
  payload: boolean | string;
}

export type AuthenticationAction =
  | actionAuthLoginIsPending
  | actionAuthLoginIsSuccess
  | actionAuthLoginIsError
  | actionAuthLoginIsRest
  | actionForgotPasswordIsPending
  | actionForgotPasswordIsSuccess
  | actionForgotPasswordIsError
  | actionForgotPasswordIsRest
  | actionRestPasswordIsPending
  | actionRestPasswordIsSuccess
  | actionRestPasswordIsError
  | actionRestPasswordIsRest
  | actionConfirmEmailIsPending
  | actionConfirmEmailIsSuccess
  | actionConfirmEmailIsError
  | actionConfirmEmailIsRest
  | actionSignUpIsPending
  | actionSignUpIsSuccess
  | actionSignUpIsError
  | actionSignUpIsRest
  | actionIsAuthenticatedSuccess
  | actionIsADmin
  | actionRemoveAuthenticatedUser
  | actionAuthUpdateProfileIsRest
  | actionAuthUpdateProfileIsError
  | actionAuthUpdateProfileIsSuccess
  | actionAuthUpdateProfileIsPending;
