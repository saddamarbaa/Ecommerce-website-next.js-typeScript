export type UserType = {
  _id?: string;
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
  isDeleted?: boolean;
  address?: string;
  dateOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;
  emailVerificationLinkToken?: string;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
};

export type LoginRequestType = {
  email: string;
  password: string;
};

export type ForgetPasswordEmailRequestType = {
  email: string;
};

export type ResetPasswordRequestType = {
  email?: string;
  password: string;
  confirmPassword: string;
  acceptTerms?: boolean;
  userId?: string;
  token?: string;
};

export type VerifyEmailRequestType = {
  userId?: string;
  token?: string;
};

export interface _authPrototypeReducerState {
  loginUser: null | UserType;
  loginUserIsLoading: boolean;
  loginUserIsSuccess: boolean;
  loginUserIsError: boolean;
  loginMessage: string;

  confirmEmailIsLoading: boolean;
  confirmEmailIsSuccess: boolean;
  confirmEmailIsError: boolean;
  confirmEmailIsMessage: string;

  emailVerificationLinkToken: string;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
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

  updateProfileIsLoading: boolean;
  updateProfileIsSuccess: boolean;
  updateProfileIsError: boolean;
  updateProfileMessage: string;
}

export interface AuthResponseType {
  data: {
    user: UserType;
  };
  success: string;
  error: string;
  message: string;
  status: boolean;
}
