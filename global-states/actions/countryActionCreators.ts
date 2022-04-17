import { LIST } from 'constants/actionTypes';

import { CountryType } from 'types';

export const updateLists =
  (payload: CountryType[]) => async (dispatch: any) => {
    dispatch({ type: LIST, payload });
  };
