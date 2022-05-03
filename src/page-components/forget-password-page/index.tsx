import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { ReducerType } from '@/global-states';
import { forgetPassword, restforgetPassword } from '@/global-states/actions';
import LogInComponent from '@/pages/login/index';
import {
  _authPrototypeReducerState as ReducerState,
  ForgetPasswordEmailRequestType as forgetPasswordEmailType,
} from '@/types';
import { forgotPasswordSchemaValidation } from '@/utils';

// props from connect mapDispatchToProps
interface MapDispatchProps {
  restforgetPassword: () => void;
  forgetPassword: (email: forgetPasswordEmailType) => void;
}

// props from connect mapStateToProps
interface MapStateProps {
  authState: ReducerState;
}

type PropsType = MapDispatchProps & MapStateProps;

function ForgetPasswordPageComponent({ restforgetPassword, forgetPassword, authState }: PropsType) {
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [logIn, setLogIn] = useState<boolean>(false);

  const {
    forgetPasswordIsLoading,
    forgetPasswordIsSuccess,
    forgetPasswordIsError,
    forgetPasswordMessage,
  } = authState;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<forgetPasswordEmailType>({
    resolver: yupResolver(forgotPasswordSchemaValidation),
  });

  useEffect(() => {
    setLogIn(() => false);
    restforgetPassword();
  }, []);

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
    if (forgetPasswordIsSuccess) {
      const timer = setTimeout(() => {
        setShowAlert(() => false);
        setLogIn(() => true);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [forgetPasswordIsSuccess]);

  useEffect(() => {
    if (forgetPasswordIsSuccess || forgetPasswordIsError) {
      setShowAlert(() => true);
      if (forgetPasswordIsError) {
        const timer = setTimeout(() => {
          setShowAlert(() => false);
          setLogIn(() => false);
          restforgetPassword();
        }, 8000);
        return () => clearTimeout(timer);
      }
    }
  }, [forgetPasswordIsSuccess, forgetPasswordIsError]);

  if (logIn) {
    return <LogInComponent />;
  }

  const onSubmit = (data: forgetPasswordEmailType) => {
    const _data = { email: data.email };
    forgetPassword(_data);

    reset();
  };

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className=" mx-auto w-[90%]  md:min-w-[30rem] md:max-w-[30rem]">
        <div
          className=" mt-[2rem] min-h-[10rem] w-full  rounded-[6px] pb-[2rem]"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {forgetPasswordIsLoading && (
            <div className=" flex items-center justify-center pt-4 ">
              <CircularProgress color="secondary" />
            </div>
          )}

          {showAlert && (forgetPasswordIsError || forgetPasswordIsSuccess) && (
            <Alert
              variant="filled"
              severity={forgetPasswordIsError ? 'error' : 'success'}
              onClose={() => setShowAlert(false)}
            >
              {forgetPasswordMessage}
            </Alert>
          )}
          <section>
            <div className="title border-[#dadde1 border-b p-[1rem] text-center ">
              <h1 className="mb-[8px] text-[1.1rem] font-bold text-[#1c1e21] md:text-[1.5rem]">
                Forgot your password?{' '}
              </h1>

              <p className="text-[15px] text-gray-500">
                Don&apos;t fret! Just type in your email and we will send you a code to reset your
                password
              </p>
            </div>

            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="mt-8 px-[2rem]">
              <div className="control">
                {!errors.email && <label htmlFor="email"> Your email</label>}

                {errors.email && <p className="error">{errors.email.message} </p>}

                <input
                  type="text"
                  id="email"
                  className={` ${errors.email ? 'is-invalid' : 'input custom-input'}`}
                  {...register('email')}
                />
              </div>
              <div className="flex flex-col  justify-between space-y-8  lg:flex-row lg:items-center lg:justify-between  lg:space-y-0 lg:space-x-5">
                <button
                  type="submit"
                  className="block h-[2.7rem]   rounded-[4px] bg-[#00695c] py-[8px] px-[1.3rem] font-bold text-white transition duration-150 hover:bg-green-800 "
                >
                  Rest Password
                </button>
                <button
                  type="button"
                  onClick={() => setLogIn(true)}
                  className="block h-[2.7rem]   rounded-[4px]  border border-[#42b72a] bg-[#42b72a] py-[8px] px-[1.3rem] text-[1rem]  font-bold  text-white transition duration-150 hover:border-[#256818] hover:bg-[#256818] "
                >
                  Back to Login?
                </button>
              </div>
            </form>
          </section>
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
  restforgetPassword,
  forgetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordPageComponent);
