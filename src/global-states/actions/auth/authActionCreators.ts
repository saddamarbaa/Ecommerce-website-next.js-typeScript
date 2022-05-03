import { Dispatch } from 'redux';

import {
  AuthenticationActionType,
  ForgetPasswordEmailRequestType,
  LoginRequestType,
  ResetPasswordRequestType,
  UserType,
  VerifyEmailRequestType,
} from '@/types';
import { apiRequests, getHostUrl } from '@/utils';

// AUTH
export const signUp = (user: UserType) => async (dispatch: Dispatch) => {
  dispatch({ type: AuthenticationActionType.AUTH_SIGINUP_LOADING });

  try {
    const response = await apiRequests({
      method: 'post',
      url: `${getHostUrl()}/auth/signup`,
      data: user,
    });
    dispatch({ type: AuthenticationActionType.AUTH_SIGINUP_SUCCESS, payload: response });
  } catch (error: any) {
    dispatch({
      type: AuthenticationActionType.AUTH_SIGINUP_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const verifyEmail = (data: VerifyEmailRequestType) => async (dispatch: Dispatch) => {
  dispatch({ type: AuthenticationActionType.AUTH_REST_PASSWORD_LOADING });
  try {
    const response = await apiRequests({
      method: 'get',
      url: `${getHostUrl()}/auth/verify-email/${data.userId}/${data.token}`,
    });
    dispatch({ type: AuthenticationActionType.AUTH_REST_PASSWORD_SUCCESS, payload: response });
  } catch (error: any) {
    dispatch({
      type: AuthenticationActionType.AUTH_REST_PASSWORD_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const LogIn = (user: LoginRequestType) => async (dispatch: Dispatch) => {
  dispatch({ type: AuthenticationActionType.AUTH_LOGIN_LOADING });
  try {
    const response = await apiRequests({
      method: 'post',
      url: `${getHostUrl()}/auth/login`,
      data: user,
    });
    dispatch({ type: AuthenticationActionType.AUTH_LOGIN_SUCCESS, payload: response });
  } catch (error: any) {
    dispatch({
      type: AuthenticationActionType.AUTH_LOGIN_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const removeAuthenticatedUser = () => async (dispatch: Dispatch) => {
  dispatch({
    type: AuthenticationActionType.REMOVE_AUTHENTICATED_USER,
  });
};

export const forgetPassword =
  (email: ForgetPasswordEmailRequestType) => async (dispatch: Dispatch) => {
    dispatch({ type: AuthenticationActionType.AUTH_FORGET_PASSWORD_LOADING });
    try {
      const response = await apiRequests({
        method: 'post',
        url: `${getHostUrl()}/auth/forget-password`,
        data: email,
      });
      dispatch({ type: AuthenticationActionType.AUTH_FORGET_PASSWORD_SUCCESS, payload: response });
    } catch (error: any) {
      dispatch({
        type: AuthenticationActionType.AUTH_FORGET_PASSWORD_FAILED,
        payload: { error: error?.data?.message || error.statusText || error },
      });
    }
  };

export const restPassword = (data: ResetPasswordRequestType) => async (dispatch: Dispatch) => {
  dispatch({ type: AuthenticationActionType.AUTH_REST_PASSWORD_LOADING });
  try {
    const response = await apiRequests({
      method: 'post',
      url: `${getHostUrl()}/auth/reset-password/${data.userId}/${data.token}`,
      data,
    });
    dispatch({ type: AuthenticationActionType.AUTH_REST_PASSWORD_SUCCESS, payload: response });
  } catch (error: any) {
    dispatch({
      type: AuthenticationActionType.AUTH_REST_PASSWORD_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const restVerifyEmail = () => async (dispatch: Dispatch) => {
  dispatch({ type: AuthenticationActionType.AUTH_CONFIRM_EMAIL_REST });
};

export const restPasswordRest = () => async (dispatch: Dispatch) => {
  dispatch({ type: AuthenticationActionType.AUTH_REST_PASSWORD_REST });
};

export const restforgetPassword = () => async (dispatch: Dispatch) => {
  dispatch({ type: AuthenticationActionType.AUTH_FORGET_PASSWORD_REST });
};

export const restLoginState = () => async (dispatch: Dispatch) => {
  dispatch({ type: AuthenticationActionType.AUTH_LOGIN_REST });
};

export const restSignUpState = () => async (dispatch: Dispatch) => {
  dispatch({ type: AuthenticationActionType.AUTH_SIGINUP_REST });
};
