import { UserType } from '../../auth';

export interface _usersPrototypeReducerState {
  list: object;
  listIsLoading: boolean;
  listIsSuccess: boolean;
  listIsError: boolean;
  listMessage: string;
  users: UserType[];
  totalDocs: number;
  lastPage: number;

  emailVerificationLinkToken: string;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  postUserIsPending: boolean;
  postUserIsSuccess: boolean;
  postUserIsError: boolean;
  postUserMessage: string;

  deleteUserIsPending: boolean;
  deleteUserIsSuccess: boolean;
  deleteUserIsError: boolean;
  deleteUserMessage: string;

  individualUser: UserType | null;
  getIndividualUserIsPending: boolean;
  getIndividualUserIsSuccess: boolean;
  getIndividualUserIsError: boolean;
  getIndividualUserIsMessage: string;

  updatedUser: UserType | null;
  updateUserIsPending: boolean;
  updateUserIsSuccess: boolean;
  updateUserIsError: boolean;
  updateUserMessage: string;
}

export type UpdateUserParamReq = {
  user: UserType;
  id: string;
};

export interface UsersResponseType {
  data: {
    totalDocs: number;
    totalPages: number;
    lastPage: number;
    count: number;
    currentPage: number;
    users: UserType[];
  };
  success: string;
  error: string;
  message: string;
  status: boolean;
}

export interface UserResponseType {
  data: {
    user: UserType;
  };
  success: string;
  error: string;
  message: string;
  status: boolean;
}

export default _usersPrototypeReducerState;
