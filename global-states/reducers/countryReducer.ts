import { LIST } from 'constants/actionTypes';

import { AnyAction } from 'redux';
import { _countryReducerState as ReducerState } from 'types';

const initialState: ReducerState = {
  list: [],
  listIsLoading: false,
  listIsSuccess: false,
  listIsError: false,
  listMessage: '',
};

export default function actionReducer(state = initialState, action: AnyAction) {
  switch (action?.type) {
    case LIST:
      return {
        ...state,
        list: action.payload,
        listIsLoading: false,
        listIsSuccess: true,
        listIsError: false,
        listMessage: 'Success',
      };
    default:
      return state;
  }
}
