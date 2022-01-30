import { AnyAction } from 'redux';

import {
  AUTH_LOADING,
  AUTH_FAILER,
  AUTH_SUCCESS,
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILER,
  IS_AUTH,
} from '../../constants/ActionTypes';

import { saveUserInLocalStorage } from '../../utils/functions/helpers';

const initialState = {
  loginUser: {},
  loginUserIsLoading: false,
  loginUserIsSuccess: false,
  loginUserIsError: false,
  loginMessage: '',

  signUpUser: {},
  signUpUserIsLoading: false,
  signUpUserIsSuccess: false,
  signUpUserIsError: false,
  signUpUserMessage: '',

  isAuth: false,
};

export default function actionReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case IS_AUTH:
      return {
        ...state,
        isAuth: true,
      };
    case AUTH_LOADING:
      return {
        ...state,
        signUpUserIsLoading: true,
        signUpUserIsSuccess: false,
        signUpUserIsError: false,
        signUpUserMessage: 'PENDING',
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        signUpUser: action.payload || {},
        signUpUserIsLoading: false,
        signUpUserIsSuccess: true,
        signUpUserIsError: false,
        signUpUserMessage: action.payload?.message || 'Success',
      };
    case AUTH_FAILER:
      return {
        ...state,
        signUpUser: {},
        signUpUserIsLoading: false,
        signUpUserIsSuccess: false,
        signUpUserIsError: true,
        signUpUserMessage: action.payload?.message || action.payload?.error || 'Error',
      };

    case AUTH_LOGIN_LOADING:
      return {
        ...state,
        loginUserIsLoading: true,
        loginUserIsSuccess: false,
        loginUserIsError: false,
        loginMessage: 'PENDING',
      };
    case AUTH_LOGIN_SUCCESS:
      saveUserInLocalStorage(action.payload);
      return {
        ...state,
        loginUser: action.payload || {},
        loginUserIsLoading: false,
        loginUserIsSuccess: true,
        loginUserIsError: false,
        loginMessage: action.payload?.message || 'Success',
        isAuth: true,
      };
    case AUTH_LOGIN_FAILER:
      return {
        ...state,
        loginUser: {},
        loginUserIsLoading: false,
        loginUserIsSuccess: false,
        loginUserIsError: true,
        loginMessage: action.payload?.message || action.payload?.error || 'Error',
      };

    default:
      return state;
  }
}
