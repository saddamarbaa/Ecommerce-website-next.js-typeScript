import {
  _authPrototypeReducerState as AuthReducerState,
  AuthenticationAction,
  AuthenticationActionType,
} from 'types';
import { saveUserInLocalStorage } from 'utils';

const initialState: AuthReducerState = {
  loginUser: null,
  loginUserIsLoading: false,
  loginUserIsSuccess: false,
  loginUserIsError: false,
  loginMessage: '',

  emailVerificationLinkToken: '',
  token: '',
  accessToken: '',
  refreshToken: '',
  signUpUserIsLoading: false,
  signUpUserIsSuccess: false,
  signUpUserIsError: false,
  signUpUserMessage: '',

  isAuthenticated: false,
  isADmin: false,

  confirmEmailIsLoading: false,
  confirmEmailIsSuccess: false,
  confirmEmailIsError: false,
  confirmEmailIsMessage: '',

  forgetPasswordIsLoading: false,
  forgetPasswordIsSuccess: false,
  forgetPasswordIsError: false,
  forgetPasswordMessage: '',

  restPasswordIsLoading: false,
  restPasswordIsSuccess: false,
  restPasswordIsError: false,
  restPasswordMessage: '',
};

export function authReducer(
  state: AuthReducerState = initialState,
  action: AuthenticationAction
): AuthReducerState {
  switch (action?.type) {
    case AuthenticationActionType.IS_AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AuthenticationActionType.REMOVE_AUTHENTICATED_USER:
      return {
        ...state,
        isAuthenticated: false,
        isADmin: false,
      };
    case AuthenticationActionType.AUTH_SIGINUP_LOADING:
      return {
        ...state,
        signUpUserIsLoading: true,
        signUpUserIsSuccess: false,
        signUpUserIsError: false,
        signUpUserMessage: 'PENDING',
      };
    case AuthenticationActionType.AUTH_SIGINUP_SUCCESS:
      return {
        ...state,
        emailVerificationLinkToken: action.payload.data.user.emailVerificationLinkToken || '',
        token: action.payload.data.user.token || '',
        accessToken: action.payload.data.user.accessToken || '',
        refreshToken: action.payload.data.user.refreshToken || '',
        signUpUserIsLoading: false,
        signUpUserIsSuccess: true,
        signUpUserIsError: false,
        signUpUserMessage: action.payload.message || 'Success',
      };
    case AuthenticationActionType.AUTH_SIGINUP_FAILED:
      return {
        ...state,
        emailVerificationLinkToken: '',
        token: '',
        accessToken: '',
        refreshToken: '',
        signUpUserIsLoading: false,
        signUpUserIsSuccess: false,
        signUpUserIsError: true,
        signUpUserMessage: action.payload.message || action.payload.error || 'Error',
      };
    case AuthenticationActionType.AUTH_SIGINUP_REST:
      return {
        ...state,
        emailVerificationLinkToken: '',
        token: '',
        accessToken: '',
        refreshToken: '',
        signUpUserIsLoading: false,
        signUpUserIsSuccess: false,
        signUpUserIsError: false,
        signUpUserMessage: '',

        isAuthenticated: false,
        isADmin: false,
      };
    case AuthenticationActionType.AUTH_LOGIN_LOADING:
      return {
        ...state,
        loginUserIsLoading: true,
        loginUserIsSuccess: false,
        loginUserIsError: false,
        loginMessage: 'PENDING',
      };
    case AuthenticationActionType.AUTH_LOGIN_SUCCESS:
      saveUserInLocalStorage(action.payload.data?.user?.token || '');
      return {
        ...state,
        isADmin: action.payload.data?.user?.role || false,
        loginUser: action.payload.data.user || null,
        loginUserIsLoading: false,
        loginUserIsSuccess: true,
        loginUserIsError: false,
        loginMessage: action.payload.message || 'Success',
        isAuthenticated: true,
      };
    case AuthenticationActionType.AUTH_LOGIN_FAILED:
      return {
        ...state,
        loginUser: null,
        loginUserIsLoading: false,
        loginUserIsSuccess: false,
        loginUserIsError: true,
        loginMessage: action.payload.message || action.payload.error || 'Error',
        isAuthenticated: false,
        isADmin: false,
      };
    case AuthenticationActionType.AUTH_LOGIN_REST:
      return {
        ...state,
        loginUser: null,
        loginUserIsLoading: false,
        loginUserIsSuccess: false,
        loginUserIsError: false,
        loginMessage: '',
        isAuthenticated: false,
        isADmin: false,
      };
    case AuthenticationActionType.AUTH_CONFIRM_EMAIL_LOADING:
      return {
        ...state,
        confirmEmailIsLoading: true,
        confirmEmailIsSuccess: false,
        confirmEmailIsError: false,
        confirmEmailIsMessage: 'PENDING',
      };
    case AuthenticationActionType.AUTH_CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        confirmEmailIsLoading: false,
        confirmEmailIsSuccess: true,
        confirmEmailIsError: false,
        confirmEmailIsMessage: action.payload.message || 'Success',
      };
    case AuthenticationActionType.AUTH_CONFIRM_EMAIL_FAILED:
      return {
        ...state,
        confirmEmailIsLoading: false,
        confirmEmailIsSuccess: false,
        confirmEmailIsError: true,
        confirmEmailIsMessage: action.payload.message || action.payload.error || 'Error',
      };
    case AuthenticationActionType.AUTH_CONFIRM_EMAIL_REST:
      return {
        ...state,
        confirmEmailIsLoading: false,
        confirmEmailIsSuccess: false,
        confirmEmailIsError: false,
        confirmEmailIsMessage: '',
      };
    case AuthenticationActionType.AUTH_REST_PASSWORD_LOADING:
      return {
        ...state,
        restPasswordIsLoading: true,
        restPasswordIsSuccess: false,
        restPasswordIsError: false,
        restPasswordMessage: 'PENDING',
      };
    case AuthenticationActionType.AUTH_REST_PASSWORD_SUCCESS:
      return {
        ...state,
        restPasswordIsLoading: false,
        restPasswordIsSuccess: true,
        restPasswordIsError: false,
        restPasswordMessage: action.payload.message || 'Success',
      };
    case AuthenticationActionType.AUTH_REST_PASSWORD_FAILED:
      return {
        ...state,
        restPasswordIsLoading: false,
        restPasswordIsSuccess: false,
        restPasswordIsError: true,
        restPasswordMessage: action.payload.message || action.payload.error || 'Error',
      };
    case AuthenticationActionType.AUTH_REST_PASSWORD_REST:
      return {
        ...state,
        restPasswordIsLoading: false,
        restPasswordIsSuccess: false,
        restPasswordIsError: false,
        restPasswordMessage: '',
      };
    case AuthenticationActionType.AUTH_FORGET_PASSWORD_LOADING:
      return {
        ...state,
        forgetPasswordIsLoading: true,
        forgetPasswordIsSuccess: false,
        forgetPasswordIsError: false,
        forgetPasswordMessage: 'PENDING',
      };
    case AuthenticationActionType.AUTH_FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        forgetPasswordIsLoading: false,
        forgetPasswordIsSuccess: true,
        forgetPasswordIsError: false,
        forgetPasswordMessage: action.payload.message || 'Success',
      };
    case AuthenticationActionType.AUTH_FORGET_PASSWORD_FAILED:
      return {
        ...state,
        forgetPasswordIsLoading: false,
        forgetPasswordIsSuccess: false,
        forgetPasswordIsError: true,
        forgetPasswordMessage: action.payload.message || action.payload.error || 'Error',
      };
    case AuthenticationActionType.AUTH_FORGET_PASSWORD_REST:
      return {
        ...state,
        forgetPasswordIsLoading: false,
        forgetPasswordIsSuccess: false,
        forgetPasswordIsError: false,
        forgetPasswordMessage: '',
      };
    default:
      return state;
  }
}

export default authReducer;
