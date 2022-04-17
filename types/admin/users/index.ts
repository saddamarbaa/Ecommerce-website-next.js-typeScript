// eslint-disable-next-line import/no-cycle
import { UserType } from 'types';

export interface _adminUsersPrototypeReducerState {
  list: object;
  listIsLoading: boolean;
  listIsSuccess: boolean;
  listIsError: boolean;
  listMessage: string;
  users: any[];
  totalDocs: number;

  postUserIsPending: boolean;
  postUserIsSuccess: boolean;
  postUserIsError: boolean;
  postUserMessage: string;

  deleteUseredUser: [];
  deleteUserIsPending: boolean;
  deleteUserIsSuccess: boolean;
  deleteUserIsError: boolean;
  deleteUserMessage: string;

  individualUser: {
    firstName?: string;
    lastName?: string;
    email?: string;
    dateOfBirth?: string;
    gender?: string;
    role?: string;
    month?: string;
    day?: string;
    year?: string;
  };
  getIndividualUserIsPending: boolean;
  getIndividualUserIsSuccess: boolean;
  getIndividualUserIsError: boolean;
  getIndividualUserIsMessage: string;

  updatedUser: [];
  updateUserIsPending: boolean;
  updateUserIsSuccess: boolean;
  updateUserIsError: boolean;
  updateUserMessage: string;
}

export type UpdateUserParamReq = {
  user: UserType;
  id: string;
};
