import {
  AUTH_LOADING,
  AUTH_FAILER,
  AUTH_SUCCESS,
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILER,
  IS_AUTH,
  USER_LIST_FAILER,
  USER_LIST_SUCCESS,
  USER_LIST_LOADING,
  USER_POST,
} from '../../constants/ActionTypes';

import { UserType } from '../../types/user';

import apiRequests from '../../utils/api';

const getHostUrl = 'http://localhost:5000/api/v1';

// AUTH
export const signUp = (user: UserType) => async (dispatch: any) => {
  dispatch({ type: AUTH_LOADING });
  try {
    const response = await apiRequests({
      method: 'Post',
      url: `${getHostUrl}/users/signup`,
      data: user,
    });
    dispatch({ type: AUTH_SUCCESS, payload: response });
  } catch (error: any) {
    dispatch({
      type: AUTH_FAILER,
      payload: { error: error?.data?.message || error.statusText },
    });
  }
};

export const LogIn = (user: UserType) => async (dispatch: any) => {
  dispatch({ type: AUTH_LOGIN_LOADING });
  try {
    const response = await apiRequests({
      method: 'Post',
      url: `${getHostUrl}/users/login`,
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


