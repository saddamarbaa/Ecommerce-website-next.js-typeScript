import {
  _usersPrototypeReducerState as UsersReducerState,
  UsersAction,
  UsersActionType,
} from 'types';

const initialState: UsersReducerState = {
  list: {},
  users: [],
  listIsLoading: false,
  listIsSuccess: false,
  listIsError: false,
  listMessage: '',
  totalDocs: 0,
  lastPage: 0,

  emailVerificationLinkToken: '',
  token: '',
  accessToken: '',
  refreshToken: '',
  postUserIsPending: false,
  postUserIsSuccess: false,
  postUserIsError: false,
  postUserMessage: '',

  deleteUserIsPending: false,
  deleteUserIsSuccess: false,
  deleteUserIsError: false,
  deleteUserMessage: '',

  individualUser: null,
  getIndividualUserIsPending: false,
  getIndividualUserIsSuccess: false,
  getIndividualUserIsError: false,
  getIndividualUserIsMessage: '',

  updatedUser: null,
  updateUserIsPending: false,
  updateUserIsSuccess: false,
  updateUserIsError: false,
  updateUserMessage: '',
};

export function userReducer(state = initialState, action: UsersAction) {
  switch (action?.type) {
    case UsersActionType.GET_USER_LIST_LOADING:
      return {
        ...state,
        listIsLoading: true,
        listIsSuccess: false,
        listIsError: false,
        listMessage: 'loading',
      };
    case UsersActionType.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        users: action.payload.data.users || [],
        totalDocs: action.payload.data.totalDocs || 0,
        lastPage: action.payload.data.lastPage || 0,
        list: action.payload || {},
        listIsLoading: false,
        listIsSuccess: true,
        listIsError: false,
        listMessage: action.payload.message || 'Success',
      };
    case UsersActionType.GET_USER_LIST_FAILED:
      return {
        ...state,
        users: [],
        list: {},
        listIsLoading: false,
        listIsSuccess: false,
        listIsError: true,
        totalDocs: 0,
        listMessage: action.payload.message || action.payload.error || 'Error',
      };
    case UsersActionType.GET_USER_LIST_REST:
      return {
        ...state,
        users: [],
        list: {},
        listIsLoading: false,
        listIsSuccess: false,
        listIsError: false,
        listMessage: '',
        totalDocs: 0,
      };
    case UsersActionType.GET_INDIVIDUAL_USER_LOADING:
      return {
        ...state,
        getIndividualUserIsPending: true,
        getIndividualUserIsSuccess: false,
        getIndividualUserIsError: false,
        getIndividualUserIsMessage: 'loading',
      };
    case UsersActionType.GET_INDIVIDUAL_USER_SUCCESS:
      return {
        ...state,
        individualUser: action.payload.data.user || null,
        getIndividualUserIsPending: false,
        getIndividualUserIsSuccess: true,
        getIndividualUserIsError: false,
        getIndividualUserIsMessage: action.payload.message || action.payload.error || 'Error',
      };
    case UsersActionType.GET_INDIVIDUAL_USER_FAILED:
      return {
        ...state,
        individualUser: null,
        getIndividualUserIsPending: false,
        getIndividualUserIsSuccess: false,
        getIndividualUserIsError: true,
        getIndividualUserIsMessage: action.payload.message || action.payload.error || 'Error',
      };
    case UsersActionType.GET_INDIVIDUAL_USER_REST:
      return {
        ...state,
        individualUser: null,
        getIndividualUserIsPending: false,
        getIndividualUserIsSuccess: false,
        getIndividualUserIsError: false,
        getIndividualUserIsMessage: '',
      };
    case UsersActionType.POST_USER_LOADING:
      return {
        ...state,
        postUserIsPending: true,
        postUserIsSuccess: false,
        postUserIsError: false,
        postUserMessage: 'PENDING',
      };
    case UsersActionType.POST_USER_SUCCESS:
      return {
        ...state,
        emailVerificationLinkToken: action.payload.data.user.emailVerificationLinkToken || '',
        token: action.payload.data.user.token || '',
        accessToken: action.payload.data.user.accessToken || '',
        refreshToken: action.payload.data.user.refreshToken || '',
        postUserIsPending: false,
        postUserIsSuccess: true,
        postUserIsError: false,
        postUserMessage: action.payload.message || 'Success',
      };
    case UsersActionType.POST_USER_FAILED:
      return {
        ...state,
        emailVerificationLinkToken: '',
        token: '',
        accessToken: '',
        refreshToken: '',
        postUserIsPending: false,
        postUserIsSuccess: false,
        postUserIsError: true,
        postUserMessage: action.payload.message || action.payload.error || 'Error',
      };
    case UsersActionType.POST_USER_REST:
      return {
        ...state,
        emailVerificationLinkToken: '',
        token: '',
        accessToken: '',
        refreshToken: '',
        postUserIsPending: false,
        postUserIsSuccess: false,
        postUserIsError: false,
        postUserMessage: '',
      };
    case UsersActionType.UPDATE_USER_LOADING:
      return {
        ...state,
        updateUserIsPending: true,
        updateUserIsSuccess: false,
        updateUserIsError: false,
        updateUserMessage: 'PENDING',
      };
    case UsersActionType.UPDATE_USER_SUCCESS:
      return {
        ...state,
        updatedUser: action.payload.data.user || null,
        updateUserIsPending: false,
        updateUserIsSuccess: true,
        updateUserIsError: false,
        updateUserMessage: action.payload.message || 'Success',
      };
    case UsersActionType.UPDATE_USER_FAILED:
      return {
        ...state,
        updatedUser: null,
        updateUserIsPending: false,
        updateUserIsSuccess: false,
        updateUserIsError: true,
        updateUserMessage: action.payload.message || action.payload.error || 'Error',
      };
    case UsersActionType.UPDATE_USER_REST:
      return {
        ...state,
        updatedUser: null,
        updateUserIsPending: false,
        updateUserIsSuccess: false,
        updateUserIsError: false,
        updateUserMessage: '',
      };
    case UsersActionType.DELETE_USER_LOADING:
      return {
        ...state,
        deleteUserIsPending: true,
        deleteUserIsSuccess: false,
        deleteUserIsError: false,
        deleteUserMessage: 'PENDING',
      };
    case UsersActionType.DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteUserIsPending: false,
        deleteUserIsSuccess: true,
        deleteUserIsError: false,
        deleteUserMessage: action.payload.message || 'Success',
      };
    case UsersActionType.DELETE_USER_FAILED:
      return {
        ...state,
        deleteUserIsPending: false,
        deleteUserIsSuccess: false,
        deleteUserIsError: true,
        deleteUserMessage: action.payload.message || action.payload.error || 'Error',
      };
    case UsersActionType.DELETE_USER_REST:
      return {
        ...state,
        deleteUserIsPending: false,
        deleteUserIsSuccess: false,
        deleteUserIsError: false,
        deleteUserMessage: '',
      };

    default:
      return state;
  }
}

export default userReducer;
