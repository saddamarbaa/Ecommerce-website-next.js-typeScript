import { Dispatch } from 'redux';

import { UsersActionType, UserType } from '@/types';
import { apiRequests, getHostUrl } from '@/utils';

export const getUsers = (payload: string) => async (dispatch: Dispatch) => {
  dispatch({ type: UsersActionType.GET_USER_LIST_LOADING });
  try {
    const response = await apiRequests({
      method: 'get',
      url: `${getHostUrl()}${payload}`,
    });
    dispatch({
      type: UsersActionType.GET_USER_LIST_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: UsersActionType.GET_USER_LIST_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const resGetUserList = () => async (dispatch: Dispatch) => {
  dispatch({ type: UsersActionType.GET_USER_LIST_REST });
};

export const createUser = (user: UserType) => async (dispatch: Dispatch) => {
  dispatch({ type: UsersActionType.POST_USER_LOADING });
  try {
    const response = await apiRequests({
      method: 'post',
      url: `${getHostUrl()}/admin/users`,
      data: user,
    });
    dispatch({
      type: UsersActionType.POST_USER_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: UsersActionType.POST_USER_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const restCreateUser = () => async (dispatch: Dispatch) => {
  dispatch({ type: UsersActionType.POST_USER_REST });
};

export const deleteUser = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: UsersActionType.DELETE_USER_LOADING });
  try {
    const response = await apiRequests({
      method: 'delete',
      url: `${getHostUrl()}/admin/users/${id}`,
    });
    dispatch({ type: UsersActionType.DELETE_USER_SUCCESS, payload: response });
  } catch (error: any) {
    dispatch({
      type: UsersActionType.DELETE_USER_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const restDeleteUser = () => async (dispatch: Dispatch) => {
  dispatch({ type: UsersActionType.DELETE_USER_REST });
};

export const getIndividualUser =
  (id: string | string[], isAdmin?: boolean) => async (dispatch: any) => {
    dispatch({ type: UsersActionType.GET_INDIVIDUAL_USER_LOADING });
    try {
      const response = await apiRequests({
        method: 'get',
        url: isAdmin ? `${getHostUrl()}/admin/users/${id}` : `${getHostUrl()}/auth/me`,
      });
      dispatch({
        type: UsersActionType.GET_INDIVIDUAL_USER_SUCCESS,
        payload: response,
      });
    } catch (error: any) {
      dispatch({
        type: UsersActionType.GET_INDIVIDUAL_USER_FAILED,
        payload: { error: error?.data?.message || error.statusText || error },
      });
    }
  };

export const restGetIndividualUser = () => async (dispatch: Dispatch) => {
  dispatch({ type: UsersActionType.GET_INDIVIDUAL_USER_REST });
};

export const updateUser =
  (user: UserType, id: string | string[], isAdmin?: boolean) => async (dispatch: Dispatch) => {
    dispatch({ type: UsersActionType.UPDATE_USER_LOADING });
    try {
      const response = await apiRequests({
        method: 'patch',
        url: isAdmin ? `${getHostUrl()}/admin/users/${id}` : `${getHostUrl()}/auth/${id}`,
        data: user,
      });
      dispatch({
        type: UsersActionType.UPDATE_USER_SUCCESS,
        payload: response,
      });
    } catch (error: any) {
      dispatch({
        type: UsersActionType.UPDATE_USER_FAILED,
        payload: { error: error?.data?.message || error.statusText || error },
      });
    }
  };

export const restUpdateUser = () => async (dispatch: Dispatch) => {
  dispatch({ type: UsersActionType.UPDATE_USER_REST });
};
