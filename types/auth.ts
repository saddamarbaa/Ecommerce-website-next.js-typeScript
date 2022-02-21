export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  gender: string;
  month: string;
  day: number;
  year: string;
  acceptTerms: boolean;
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
  isADmin: boolean;

  forgetPasswordIsLoading: boolean;
  forgetPasswordIsSuccess: boolean;
  forgetPasswordIsError: boolean;
  forgetPasswordMessage: string;

  restPasswordIsLoading: boolean;
  restPasswordIsSuccess: boolean;
  restPasswordIsError: boolean;
  restPasswordMessage: string;
}
