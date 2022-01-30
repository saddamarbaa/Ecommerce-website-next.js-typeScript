import {
  AUTH_LOADING,
  AUTH_FAILER,
  AUTH_SUCCESS,
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILER,
  USER_LIST_FAILER,
  USER_LIST_SUCCESS,
  USER_LIST_LOADING,
  USER_POST_LOADING, USER_POST_SUCCESS,USER_POST_FAILER,USER_POST_REST,
  USER_DELETE_FAILER,
  USER_DELETE_SUCCESS,
  USER_DELETE_LOADING
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

export const logOut = (payload: string) => async (dispatch: any) => {
  dispatch({
      type: USER_LIST_FAILER,
      payload: "error",
    });
  }


// Users
export const getUsers = (payload: string) => async (dispatch: any) => {

  dispatch({ type: USER_LIST_LOADING });
  try {
    const response = await apiRequests({
      method: 'get',
      url: `${getHostUrl}${payload}`,
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: response });
  } catch (error: any) {
    dispatch({
      type: USER_LIST_FAILER,
      payload: { error: error?.data?.message || error.statusText },
    });
  }
};


export const restUser = () => async (dispatch: any) => { dispatch({ type: USER_POST_REST }) }

export const createUser = (user: UserType) => async (dispatch: any) => {
  dispatch({ type: USER_POST_LOADING });
  try {
    const response = await apiRequests({
      method: 'Post',
      url: `${getHostUrl}/admin/users`,
      data: user,
    });
    dispatch({ type:  USER_POST_SUCCESS, payload: response });
  } catch (error: any) {
    dispatch({
      type: USER_POST_FAILER,
      payload: { error: error?.data?.message || error.statusText },
    });
  }
};



export const deleteUser = (id: string) => async (dispatch: any) => {
  dispatch({ type: USER_DELETE_LOADING });
  try {
    const response = await apiRequests({
      method: 'delete',
      url: `${getHostUrl}/admin/users/${id}`,
    });
    dispatch({ type:  USER_DELETE_SUCCESS, payload: response });
  } catch (error: any) {
    dispatch({
      type:  USER_DELETE_FAILER,
      payload: { error: error?.data?.message || error.statusText },
    });
  }
};



