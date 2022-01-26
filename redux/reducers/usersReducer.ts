import { AnyAction } from 'redux';

import { USER_LIST, USER_POST } from '../../constants/ActionTypes';

const initialState = {
  list: [],
  listIsLoading: false,
  listIsSuccess: false,
  listIsError: false,
  listMessage: '',

  postUserIsPending: false,
  postUserIsSuccess: false,
  postUserIsError: false,
  postUserMessage: '',
};

export default function actionReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case `${USER_LIST}_PENDING`:
      return {
        ...state,
        listIsLoading: true,
        listIsSuccess: false,
        listIsError: false,
        listMessage: 'PENDING',
      };
    case `${USER_LIST}_FULFILLED`:
      return {
        ...state,
        list: action.payload?.result?.users || [],
        listIsLoading: false,
        listIsSuccess: true,
        listIsError: false,
        listMessage: 'Success',
      };
    case `${USER_LIST}_REJECTED`:
      return {
        ...state,
        list: [],
        listIsLoading: false,
        listIsSuccess: false,
        listIsError: true,
        listMessage: action?.payload?.response?.data?.error?.message || 'Error',
      };

    case `${USER_POST}_PENDING`:
      return {
        ...state,
        postUserIsPending: true,
        postUserIsSuccess: false,
        postUserIsError: false,
        postUserMessage: 'PENDING',
      };
    case `${USER_POST}_FULFILLED`:
      return {
        ...state,
        postUserIsPending: false,
        postUserIsSuccess: true,
        postUserIsError: false,
        postUserMessage: 'Success',
      };
    case `${USER_POST}_REJECTED`:
      return {
        ...state,
        postUserIsPending: false,
        postUserIsSuccess: false,
        postUserIsError: true,
        postUserMessage: action?.payload || 'Error',
      };

    case `${USER_POST}_REST`:
      return {
        ...state,
        postUserIsPending: false,
        postUserIsSuccess: false,
        postUserIsError: false,
        postUserMessage: '',
      };

    default:
      return state;
  }
}
