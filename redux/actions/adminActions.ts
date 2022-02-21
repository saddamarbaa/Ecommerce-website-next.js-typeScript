import {
  USER_LIST_FAILER,
  USER_LIST_SUCCESS,
  USER_LIST_LOADING,
  USER_POST_LOADING, USER_POST_SUCCESS,USER_POST_FAILER,USER_POST_REST,
  USER_DELETE_FAILER,
  USER_DELETE_SUCCESS,
  USER_DELETE_LOADING,
  USER_DELETE_REST,
   GET_INDIVIDUAL_USER_LOADING,
  GET_INDIVIDUAL_USER_SUCCESS,
  GET_INDIVIDUAL_USER_FAILER,
  GET_INDIVIDUAL_USER_REST,
   USER_UPDATE_LOADING,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILER,
  USER_UPDATE_REST,
} from '../../constants/ActionTypes';

import { UserType } from '../../types';
import apiRequests from '../../utils/api';

const getHostUrl = 'http://localhost:5000/api/v1';


  

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
      // eslint-disable-next-line prettier/prettier
      payload: { error: error?.data?.message || error.statusText },
    });
  }
};


export const restUser = () => async (dispatch: any) => { dispatch({ type: USER_POST_REST }) }

export const createUser = (user: UserType) => async (dispatch: any) => {
  dispatch({ type: USER_POST_LOADING });
  try {
    const response = await apiRequests({
      method: 'post',
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


export const restDeleteUser = () => async (dispatch: any) => { dispatch({ type: USER_DELETE_REST }) }


export const getIndividualUser = (id: string) => async (dispatch: any) => {
  dispatch({ type: GET_INDIVIDUAL_USER_LOADING });
  try {
    const response = await apiRequests({
      method: 'get',
      url: `${getHostUrl}/admin/users/${id}`,
    });
    dispatch({ type:  GET_INDIVIDUAL_USER_SUCCESS, payload: response });
  } catch (error: any) {
    dispatch({
      type:  GET_INDIVIDUAL_USER_FAILER,
      payload: { error: error?.data?.message || error.statusText },
    });
  }
};

export const restGetIndividualUser = () => async (dispatch: any) => { dispatch({ type: GET_INDIVIDUAL_USER_REST }) }


export const updateUser = (user: UserType, id:string) => async (dispatch: any) => {
dispatch({ type: USER_UPDATE_LOADING });
  try {
    const response = await apiRequests({
      method: 'patch',
      url: `${getHostUrl}/admin/users/${id}`,
      data: user,
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: response });
   
  } catch (error: any) {
    dispatch({
      type: USER_UPDATE_FAILER,
      payload: { error: error?.data?.message || error.statusText },
    });
  }
};

export const restUpdateUser = () => async (dispatch: any) => { dispatch({ type: USER_UPDATE_REST }) }