export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
  acceptTerms: boolean;
  gender: string;
  month?: string;
  day?: number;
  year?: string;
  familyName?: string;
  mobileNumber?: string;
  bio?: string;
  favoriteAnimal?: string;
  nationality?: string;
  companyName?: string;
  profileImage?: any;
  jobTitle?: string;
  status?: string;
  isVerified?: boolean;
  address?: string;
  dateOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string | undefined | any;
};

export type LoginType = {
  email: string;
  password: string;
};

export type forgetPasswordEmailType = {
  email: string;
};

export type ResetPasswordType = {
  email?: string;
  password: string;
  confirmPassword: string;
  acceptTerms?: boolean;
  userId?: string;
  token?: string;
};

export interface _authPrototypeReducerState {
  loginUser: any;
  loginUserIsLoading: boolean;
  loginUserIsSuccess: boolean;
  loginUserIsError: boolean;
  loginMessage: string;

  confirmEmailIsLoading: boolean;
  confirmEmailIsSuccess: boolean;
  confirmEmailIsError: boolean;
  confirmEmailIsMessage: string;

  signUpUser: any;
  signUpUserIsLoading: boolean;
  signUpUserIsSuccess: boolean;
  signUpUserIsError: boolean;
  signUpUserMessage: string;

  isAuthenticated: boolean;
  isADmin: boolean | string;

  forgetPasswordIsLoading: boolean;
  forgetPasswordIsSuccess: boolean;
  forgetPasswordIsError: boolean;
  forgetPasswordMessage: string;

  restPasswordIsLoading: boolean;
  restPasswordIsSuccess: boolean;
  restPasswordIsError: boolean;
  restPasswordMessage: string;
}
