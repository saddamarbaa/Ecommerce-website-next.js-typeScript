import { USER_LIST, USER_POST } from '../../constants/ActionTypes';
import * as apiRequest from '../../utils/api/axiosConfig';

// User
export const getUsers = () => async (dispatch: any) => {
  dispatch({ type: `${USER_LIST}_PENDING` });
  try {
    const response = await apiRequest.fetchUsers('/admin/users');
    dispatch({ type: `${USER_LIST}_FULFILLED`, payload: response.data });
  } catch (error) {
    dispatch({ type: `${USER_LIST}_REJECTED`, payload: error });
  }
};

export const createUser = (user: any) => async (dispatch: any) => {
  dispatch({ type: `${USER_POST}_PENDING` });
  try {
    const response = await apiRequest.createUser('/admin/users', user);
    dispatch({ type: `${USER_POST}_FULFILLED`, payload: response.data });
  } catch (error) {
    dispatch({
      type: `${USER_POST}_REJECTED`,
      payload: error?.message || 'BE error',
    });
  }
};

export const restPostUserState = () => async (dispatch: any) => {
  dispatch({ type: `${USER_POST}_REST` });
};
