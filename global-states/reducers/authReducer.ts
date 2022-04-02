import { AnyAction } from 'redux'

import { saveUserInLocalStorage } from 'utils/functions/helpers'
import { _authPrototypeReducerState as ReducerState } from 'types'
import {
  IS_AUTHENTICATED_SUCCESS,
  AUTH_SIGINUP_LOADING,
  AUTH_SIGINUP_SUCCESS,
  AUTH_SIGINUP_FAILER,
  AUTH_SIGINUP_REST,
  AUTH_CONFIRM_EMAIL_LOADING,
  AUTH_CONFIRM_EMAIL_SUCCESS,
  AUTH_CONFIRM_EMAIL_FAILER,
  AUTH_CONFIRM_EMAIL_REST,
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILER,
  AUTH_LOGIN_REST,
  REMOVE_AUTHENTICATED_USER,
  FORGET_PASSWORD_LOADING,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILER,
  FORGET_PASSWORD_REST,
  REST_PASSWORD_LOADING,
  REST_PASSWORD_SUCCESS,
  REST_PASSWORD_FAILER,
  REST_PASSWORD_REST,
} from 'constants/actionTypes'

const initialState: ReducerState = {
  loginUser: {},
  loginUserIsLoading: false,
  loginUserIsSuccess: false,
  loginUserIsError: false,
  loginMessage: '',

  confirmEmailIsLoading: false,
  confirmEmailIsSuccess: false,
  confirmEmailIsError: false,
  confirmEmailIsMessage: '',

  signUpUser: {},
  signUpUserIsLoading: false,
  signUpUserIsSuccess: false,
  signUpUserIsError: false,
  signUpUserMessage: '',

  isAuthenticated: false,
  isADmin: false,

  forgetPasswordIsLoading: false,
  forgetPasswordIsSuccess: false,
  forgetPasswordIsError: false,
  forgetPasswordMessage: '',

  restPasswordIsLoading: false,
  restPasswordIsSuccess: false,
  restPasswordIsError: false,
  restPasswordMessage: '',
}

export default function actionReducer(state = initialState, action: AnyAction) {
  switch (action?.type) {
    case IS_AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      }
    case REMOVE_AUTHENTICATED_USER:
      return {
        ...state,
        isAuthenticated: false,
        isADmin: false,
      }
    case AUTH_SIGINUP_LOADING:
      return {
        ...state,
        signUpUserIsLoading: true,
        signUpUserIsSuccess: false,
        signUpUserIsError: false,
        signUpUserMessage: 'PENDING',
      }
    case AUTH_SIGINUP_SUCCESS:
      return {
        ...state,
        signUpUser: action.payload || {},
        signUpUserIsLoading: false,
        signUpUserIsSuccess: true,
        signUpUserIsError: false,
        signUpUserMessage: action.payload.message || 'Success',
      }
    case AUTH_SIGINUP_FAILER:
      return {
        ...state,
        signUpUser: {},
        signUpUserIsLoading: false,
        signUpUserIsSuccess: false,
        signUpUserIsError: true,
        signUpUserMessage: action.payload.message || action.payload.error || 'Error',
      }

    case AUTH_SIGINUP_REST:
      return {
        ...state,
        signUpUser: {},
        signUpUserIsLoading: false,
        signUpUserIsSuccess: false,
        signUpUserIsError: false,
        signUpUserMessage: '',
      }

    case AUTH_CONFIRM_EMAIL_LOADING:
      return {
        ...state,
        confirmEmailIsLoading: true,
        confirmEmailIsSuccess: false,
        confirmEmailIsError: false,
        confirmEmailIsMessage: 'PENDING',
      }
    case AUTH_CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        confirmEmailIsLoading: false,
        confirmEmailIsSuccess: true,
        confirmEmailIsError: false,
        confirmEmailIsMessage: action.payload.message || 'Success',
      }
    case AUTH_CONFIRM_EMAIL_FAILER:
      return {
        ...state,
        confirmEmailIsLoading: false,
        confirmEmailIsSuccess: false,
        confirmEmailIsError: true,
        confirmEmailIsMessage: action.payload.message || action.payload.error || 'Error',
      }
    case AUTH_CONFIRM_EMAIL_REST:
      return {
        ...state,
        confirmEmailIsLoading: false,
        confirmEmailIsSuccess: false,
        confirmEmailIsError: false,
        confirmEmailIsMessage: '',
      }

    case AUTH_LOGIN_LOADING:
      return {
        ...state,
        loginUserIsLoading: true,
        loginUserIsSuccess: false,
        loginUserIsError: false,
        loginMessage: 'PENDING',
      }
    case AUTH_LOGIN_SUCCESS:
      saveUserInLocalStorage(action.payload.data.user.token)
      return {
        ...state,
        isADmin: action.payload.data.user.role || false,
        loginUser: action.payload.data || {},
        loginUserIsLoading: false,
        loginUserIsSuccess: true,
        loginUserIsError: false,
        loginMessage: action.payload.message || 'Success',
        isAuthenticated: true,
      }
    case AUTH_LOGIN_FAILER:
      return {
        ...state,
        loginUser: {},
        loginUserIsLoading: false,
        loginUserIsSuccess: false,
        loginUserIsError: true,
        loginMessage: action.payload.message || action.payload.error || 'Error',
      }
    case AUTH_LOGIN_REST:
      console.log(state)
      return {
        ...state,
        loginUser: {},
        loginUserIsLoading: false,
        loginUserIsSuccess: false,
        loginUserIsError: false,
        loginMessage: '',
      }
    case FORGET_PASSWORD_LOADING:
      return {
        ...state,
        forgetPasswordIsLoading: true,
        forgetPasswordIsSuccess: false,
        forgetPasswordIsError: false,
        forgetPasswordMessage: 'PENDING',
      }
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        forgetPasswordIsLoading: false,
        forgetPasswordIsSuccess: true,
        forgetPasswordIsError: false,
        forgetPasswordMessage: action.payload.message || 'Success',
      }
    case FORGET_PASSWORD_FAILER:
      return {
        ...state,
        forgetPasswordIsLoading: false,
        forgetPasswordIsSuccess: false,
        forgetPasswordIsError: true,
        forgetPasswordMessage: action.payload.message || action.payload.error || 'Error',
      }
    case FORGET_PASSWORD_REST:
      return {
        ...state,
        forgetPasswordIsLoading: false,
        forgetPasswordIsSuccess: false,
        forgetPasswordIsError: false,
        forgetPasswordMessage: '',
      }

    case REST_PASSWORD_LOADING:
      return {
        ...state,
        restPasswordIsLoading: true,
        restPasswordIsSuccess: false,
        restPasswordIsError: false,
        restPasswordMessage: 'PENDING',
      }
    case REST_PASSWORD_SUCCESS:
      return {
        ...state,
        restPasswordIsLoading: false,
        restPasswordIsSuccess: true,
        restPasswordIsError: false,
        restPasswordMessage: action.payload.message || 'Success',
      }
    case REST_PASSWORD_FAILER:
      return {
        ...state,
        restPasswordIsLoading: false,
        restPasswordIsSuccess: false,
        restPasswordIsError: true,
        restPasswordMessage: action.payload.message || action.payload.error || 'Error',
      }
    case REST_PASSWORD_REST:
      return {
        ...state,
        restPasswordIsLoading: false,
        restPasswordIsSuccess: false,
        restPasswordIsError: false,
        restPasswordMessage: '',
      }

    default:
      return state
  }
}
