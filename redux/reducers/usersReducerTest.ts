import { AnyAction } from 'redux';

import {
  USER_LIST_FAILER,
  USER_LIST_SUCCESS,
  USER_LIST_LOADING,
  USER_POST_LOADING,
  USER_POST_SUCCESS,
  USER_POST_FAILER,
  USER_POST_REST,
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
  USER_UPDATE_REST
} from '../../constants/ActionTypes';

const initialState = {
  list: {},
  listIsLoading: false,
  listIsSuccess: false,
  listIsError: false,
  listMessage: '',
  users: [],
  totalDocs: 0,

  postUserIsPending: false,
  postUserIsSuccess: false,
  postUserIsError: false,
  postUserMessage: '',

  deleteUseredUser: [],
  deleteUserIsPending: false,
  deleteUserIsSuccess: false,
  deleteUserIsError: false,
  deleteUserMessage: '',

  individualUser: [],
  getIndividualUserIsPending: false,
  getIndividualUserIsSuccess: false,
  getIndividualUserIsError: false,
  individualUserMessage: '',

  updatedUser: [],
  updateUserIsPending: false,
  updateUserIsSuccess: false,
  updateUserIsError: false
};

export default function actionReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case USER_LIST_LOADING:
      return {
        ...state,
        listIsLoading: true,
        listIsSuccess: false,
        listIsError: false,
        listMessage: 'PENDING'
      };
    case USER_LIST_SUCCESS:
      return {
        ...state,
        users: action.payload.data.users || [],
        totalDocs: action.payload.data.totalDocs || 0,
        list: action.payload || {},
        listIsLoading: false,
        listIsSuccess: true,
        listIsError: false,
        listMessage: action.payload.message || 'Success'
      };
    case USER_LIST_FAILER:
      return {
        ...state,
        users: [],
        list: {},
        listIsLoading: false,
        listIsSuccess: false,
        listIsError: true,
        listMessage: action.payload.message || action.payload.error || 'Error'
      };

    case USER_POST_LOADING:
      return {
        ...state,
        postUserIsPending: true,
        postUserIsSuccess: false,
        postUserIsError: false,
        postUserMessage: 'PENDING'
      };
    case USER_POST_SUCCESS:
      return {
        ...state,
        postUserIsPending: false,
        postUserIsSuccess: true,
        postUserIsError: false,
        postUserMessage: action.payload.message || 'Success'
      };
    case USER_POST_FAILER:
      return {
        ...state,
        postUserIsPending: false,
        postUserIsSuccess: false,
        postUserIsError: true,
        postUserMessage: action.payload.message || action.payload.error || 'Error'
      };
    case USER_POST_REST:
      return {
        ...state,
        postUserIsPending: false,
        postUserIsSuccess: false,
        postUserIsError: false,
        postUserMessage: ''
      };
    case USER_DELETE_LOADING:
      return {
        ...state,
        deleteUserIsPending: true,
        deleteUserIsSuccess: false,
        deleteUserIsError: false,
        deleteUserMessage: 'PENDING'
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        deleteUserIsPending: false,
        deleteUserIsSuccess: true,
        deleteUserIsError: false,
        deleteUserMessage: action.payload.message || 'Success'
      };
    case USER_DELETE_FAILER:
      return {
        ...state,
        deleteUserIsPending: false,
        deleteUserIsSuccess: false,
        deleteUserIsError: true,
        deleteUserMessage: action.payload.message || action.payload.error || 'Error'
      };
    case USER_DELETE_REST:
      return {
        ...state,
        deleteUserIsPending: false,
        deleteUserIsSuccess: false,
        deleteUserIsError: false,
        deleteUserMessage: ''
      };
    case GET_INDIVIDUAL_USER_LOADING:
      return {
        ...state,
        getIndividualUserIsLoading: true,
        getIndividualUserIsSuccess: false,
        getIndividualUserIsError: false,
        individualUserMessage: 'PENDING'
      };
    case GET_INDIVIDUAL_USER_SUCCESS:
      return {
        ...state,
        individualUser: action.payload.data.user || [],
        getIndividualUserIsLoading: false,
        getIndividualUserIsSuccess: true,
        getIndividualUserIsError: false,
        individualUserMessage: action.payload.message || 'Success'
      };
    case GET_INDIVIDUAL_USER_FAILER:
      return {
        ...state,
        individualUser: [],
        getIndividualUserIsLoading: false,
        getIndividualUserIsSuccess: false,
        getIndividualUserIsError: true,
        individualUserMessage: action.payload.message || action.payload.error || 'Error'
      };
    case GET_INDIVIDUAL_USER_REST:
      return {
        ...state,
        getIndividualUserIsLoading: false,
        getIndividualUserIsSuccess: false,
        getIndividualUserIsError: false
      };
    case USER_UPDATE_LOADING:
      return {
        ...state,
        getIndividualUserIsLoading: true,
        getIndividualUserIsSuccess: false,
        getIndividualUserIsError: false,
        individualUserMessage: 'PENDING'
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        updatedUser: action.payload.data.user || [],
        updateUserIsPending: false,
        updateUserIsSuccess: true,
        updateUserIsError: false,
        individualUserMessage: action.payload.message || 'Success'
      };
    case USER_UPDATE_FAILER:
      return {
        ...state,
        updatedUser: [],
        updateUserIsPending: false,
        updateUserIsSuccess: false,
        updateUserIsError: true,
        individualUserMessage: action.payload.message || action.payload.error || 'Error'
      };
    case USER_UPDATE_REST:
      return {
        ...state,
        updatedUser: [],
        updateUserIsPending: false,
        updateUserIsSuccess: false,
        updateUserIsError: false
      };
    default:
      return state;
  }
}
