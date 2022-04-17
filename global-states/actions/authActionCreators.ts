import {
  AUTH_CONFIRM_EMAIL_FAILER,
  AUTH_CONFIRM_EMAIL_LOADING,
  AUTH_CONFIRM_EMAIL_REST,
  AUTH_CONFIRM_EMAIL_SUCCESS,
  AUTH_LOGIN_FAILER,
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_REST,
  AUTH_LOGIN_SUCCESS,
  AUTH_SIGINUP_FAILER,
  AUTH_SIGINUP_LOADING,
  AUTH_SIGINUP_REST,
  AUTH_SIGINUP_SUCCESS,
  FORGET_PASSWORD_FAILER,
  FORGET_PASSWORD_LOADING,
  FORGET_PASSWORD_REST,
  FORGET_PASSWORD_SUCCESS,
  REMOVE_AUTHENTICATED_USER,
  REST_PASSWORD_FAILER,
  REST_PASSWORD_LOADING,
  REST_PASSWORD_REST,
  REST_PASSWORD_SUCCESS,
  USER_LIST_FAILER,
} from '../../constants/actionTypes';
import {
  forgetPasswordEmailType,
  LoginType,
  ResetPasswordType,
  UserType,
} from '../../types';
import { apiRequests, getHostUrl } from '../../utils';

// AUTH
export const signUp = (user: UserType) => async (dispatch: any) => {
  dispatch({ type: AUTH_SIGINUP_LOADING });
  try {
    const response = await apiRequests({
      method: 'post',
      url: `${getHostUrl()}/auth/signup`,
      data: user,
    });
    dispatch({ type: AUTH_SIGINUP_SUCCESS, payload: response });
  } catch (error: any) {
    dispatch({
      type: AUTH_SIGINUP_FAILER,
      payload: { error: error?.data?.message || error.statusText },
    });
  }
};

export const verifyEmail =
  (data: ResetPasswordType) => async (dispatch: any) => {
    dispatch({ type: AUTH_CONFIRM_EMAIL_LOADING });
    try {
      const response = await apiRequests({
        method: 'get',
        url: `${getHostUrl()}/auth/verify-email/${data.userId}/${data.token}`,
      });
      dispatch({ type: AUTH_CONFIRM_EMAIL_SUCCESS, payload: response });
    } catch (error: any) {
      dispatch({
        type: AUTH_CONFIRM_EMAIL_FAILER,
        payload: { error: error?.data?.message || error.statusText },
      });
    }
  };

export const LogIn = (user: LoginType) => async (dispatch: any) => {
  dispatch({ type: AUTH_LOGIN_LOADING });
  try {
    const response = await apiRequests({
      method: 'post',
      url: `${getHostUrl()}/auth/login`,
      data: user,
    });
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: response });
  } catch (error: any) {
    dispatch({
      type: AUTH_LOGIN_FAILER,
      payload: { error: error?.data?.message || error.statusText },
    });
  }
};

export const logOut = () => async (dispatch: any) => {
  dispatch({
    type: USER_LIST_FAILER,
    payload: 'error',
  });
};

export const removeAuthenticatedUser = () => async (dispatch: any) => {
  dispatch({
    type: REMOVE_AUTHENTICATED_USER,
  });
};

export const forgetPassword =
  (email: forgetPasswordEmailType) => async (dispatch: any) => {
    dispatch({ type: FORGET_PASSWORD_LOADING });
    try {
      const response = await apiRequests({
        method: 'post',
        url: `${getHostUrl()}/auth/forget-password`,
        data: email,
      });
      dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: response });
    } catch (error: any) {
      dispatch({
        type: FORGET_PASSWORD_FAILER,
        payload: { error: error?.data?.message || error.statusText },
      });
    }
  };

export const restPassword =
  (data: ResetPasswordType) => async (dispatch: any) => {
    dispatch({ type: REST_PASSWORD_LOADING });
    try {
      const response = await apiRequests({
        method: 'post',
        url: `${getHostUrl()}/auth/reset-password/${data.userId}/${data.token}`,
        data,
      });
      dispatch({ type: REST_PASSWORD_SUCCESS, payload: response });
    } catch (error: any) {
      dispatch({
        type: REST_PASSWORD_FAILER,
        payload: { error: error?.data?.message || error.statusText },
      });
    }
  };

export const restVerifyEmail = () => async (dispatch: any) => {
  dispatch({ type: AUTH_CONFIRM_EMAIL_REST });
};

export const restPasswordRest = () => async (dispatch: any) => {
  dispatch({ type: REST_PASSWORD_REST });
};

export const restforgetPassword = () => async (dispatch: any) => {
  dispatch({ type: FORGET_PASSWORD_REST });
};

export const restLoginState = () => async (dispatch: any) => {
  dispatch({ type: AUTH_LOGIN_REST });
};

export const restSignUpState = () => async (dispatch: any) => {
  dispatch({ type: AUTH_SIGINUP_REST });
};
