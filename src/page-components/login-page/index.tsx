import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

import { LogIn, ReducerType, restLoginState } from '@/global-states';
import SignUpComponent from '@/page-components/signup-page';
import ForgetPasswordComponent from '@/pages/forget-password';
import { _authPrototypeReducerState as ReducerState, LoginRequestType as LoginType } from '@/types';
import { LoginSchemaValidation } from '@/utils';

interface MapDispatchProps {
  restLoginState: () => void;
  LogIn: (data: LoginType) => void;
}

interface MapStateProps {
  authState: ReducerState;
}

type PropsType = MapDispatchProps & MapStateProps;

function LogInPageComponent({ LogIn, restLoginState, authState }: PropsType) {
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [signIn, setSignIn] = useState<boolean>(false);
  const [forgetPassword, setForgetPassword] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { loginUserIsLoading, loginUserIsSuccess, loginUserIsError, loginMessage } = authState;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(LoginSchemaValidation),
  });

  // Auto Scroll functionality
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // Auto Scroll functionality
    autoScrollToBottomRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    restLoginState();
  }, []);

  useEffect(() => {
    if (loginUserIsSuccess) {
      reset();
      router.push('/');
    }

    if (loginUserIsSuccess || loginUserIsError) {
      setShowAlert(() => true);
      let timer: any;
      if (loginUserIsSuccess) {
        timer = setTimeout(() => {
          setShowAlert(() => false);
          restLoginState();
        }, 5000);
      } else {
        timer = setTimeout(() => {
          setShowAlert(() => false);
          restLoginState();
        }, 9000);
      }

      return () => clearTimeout(timer);
    }
  }, [loginUserIsSuccess, loginUserIsError]);

  useEffect(() => {
    const redirectToSignUp = () => {
      if (signIn) {
        return <SignUpComponent />;
      }
    };

    redirectToSignUp();
  }, [signIn]);

  useEffect(() => {
    const redirectToForgetPassword = () => {
      if (forgetPassword) {
        return <ForgetPasswordComponent />;
      }
    };

    redirectToForgetPassword();
  }, [forgetPassword]);

  if (signIn) {
    return <SignUpComponent />;
  }

  if (forgetPassword) {
    return <ForgetPasswordComponent />;
  }

  const onSubmit = (data: LoginType) => {
    // console.log(JSON.stringify(data, null, 2));

    const finalData = {
      email: data.email,
      password: data.password,
    };

    LogIn(finalData);
  };

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className=" mx-auto w-[90%]  md:min-w-[30rem] md:max-w-[30rem]">
        <div
          className=" mt-[2rem] min-h-[10rem]  w-full rounded-[6px]"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {loginUserIsLoading && (
            <div className=" flex items-center justify-center pt-[0.6rem]  ">
              <CircularProgress color="secondary" />
            </div>
          )}
          {showAlert && (loginUserIsSuccess || loginUserIsError) && (
            <div
              className="w-full rounded-[6px]"
              style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
            >
              <Alert
                variant="filled"
                severity={loginUserIsError ? 'error' : 'success'}
                onClose={() => restLoginState()}
              >
                {loginMessage}
              </Alert>
            </div>
          )}
          <div className=" p-5 py-[2rem]">
            <section>
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div className="control">
                  {!errors.email && <label htmlFor="email"> Email</label>}
                  {errors.email && <p className="error">{errors.email.message} </p>}
                  <input
                    type="text"
                    id="email"
                    className={` ${errors.email ? 'is-invalid' : 'input custom-input'}`}
                    {...register('email')}
                  />
                </div>
                <div className="control">
                  {!errors.password && (
                    <label htmlFor="password">Password (6 or more characters)</label>
                  )}
                  <p className="error">{errors.password?.message} </p>
                  <input
                    id="password"
                    className={` ${errors.password ? 'is-invalid' : 'custom-input'}`}
                    type="password"
                    {...register('password')}
                  />
                </div>

                <div className="actions">
                  <button
                    type="submit"
                    className="mx-auto block h-[2.7rem] w-full rounded-[4px] bg-[#00695c] py-[8px] px-[16px] font-bold text-white transition duration-150 hover:bg-green-800  "
                  >
                    Log In
                  </button>
                </div>
              </form>

              <p className="option">Or</p>

              <div className="flex flex-col  justify-between lg:flex-row lg:items-center lg:justify-between lg:space-x-5">
                <button
                  type="button"
                  className="rest-btn order-last mx-auto block h-[2.7rem] w-full    rounded-[4px]  py-[8px] px-[16px]  font-bold lg:order-first"
                  onClick={() => setForgetPassword(true)}
                >
                  Forget Password ?
                </button>
                <button
                  type="button"
                  className=" mx-auto mt-[1.5rem] block h-[2.7rem]    w-full  rounded-[4px] border border-[#42b72a]  bg-[#42b72a] py-[8px] px-[16px] text-[1rem] font-bold text-white  transition duration-150 hover:border-[#256818] hover:bg-[#256818]"
                  onClick={() => setSignIn(true)}
                >
                  Create New Account
                </button>
              </div>
            </section>
          </div>
        </div>

        <div className="mb-[8px] mt-[2rem] flex justify-center space-x-3">
          <span className="custom-span">Conditions of Use</span>
          <span className="custom-span"> Privacy Notice </span>
          <span className="custom-span"> Help </span>
        </div>
        <div className="mb-[8px] flex justify-center  space-x-3">
          <span className="text-[14.4px] text-[#555]">
            &copy; 2004-2021, saddamarbaa.com, Inc. or its affiliates
          </span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: ReducerType) => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  LogIn,
  restLoginState,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInPageComponent);
