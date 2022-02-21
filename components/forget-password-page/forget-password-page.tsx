import React, { useState, useEffect, useRef } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { forgetPasswordEmailType } from '../../types';
import { forgetPassword, restforgetPassword } from '../../redux/actions';
import { ReducerType } from '../../redux/reducers/rootReducer';
import LogInComponent from '../../pages/login';

const ForgetPasswordPageComponent = (props: any) => {
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [logIn, setLogIn] = useState<boolean>(false);

  const {
    forgetPasswordIsLoading,
    forgetPasswordIsSuccess,
    forgetPasswordIsError,
    forgetPasswordMessage
  } = props.authState;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<forgetPasswordEmailType>({
    resolver: yupResolver(validationSchema)
  });

   useEffect(() => {
    setLogIn(() => false);
      props.restforgetPassword();
  }, []);

 useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
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
          props.restforgetPassword();
        }, 8000);
        return () => clearTimeout(timer);
      }
    }
  }, [forgetPasswordIsSuccess, forgetPasswordIsError]);

  if (logIn) {
    return <LogInComponent />;
  }

  const onSubmit = (data: forgetPasswordEmailType) => {
    props.forgetPassword({ email: data.email });

    reset();
  };

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className=" mx-auto w-[90%]  md:max-w-[30rem] md:min-w-[30rem]">
        <div
          className=" pb-[2rem] w-full rounded-[6px]  mt-[2rem] min-h-[10rem]"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
        >
          {forgetPasswordIsLoading && (
            <div className=" flex items-center justify-center pt-4 ">
              <CircularProgress color="secondary" />
            </div>
          )}

            
          { showAlert && (forgetPasswordIsError ||forgetPasswordIsSuccess) && (
            <Alert
              variant="filled"
              severity={forgetPasswordIsError ? 'error' : 'success'}
              onClose={() => setShowAlert(false)}
            >
              {forgetPasswordMessage}
            </Alert>
          )}
          <section>
            <div className="title border-b border-[#dadde1 p-[1rem] text-center ">
              <h1 className="text-[1.1rem] md:text-[1.5rem] text-[#1c1e21] mb-[8px] font-bold">
                Forgot your password?{' '}
              </h1>

              <p className="text-gray-500 text-[15px]">
                Don't fret! Just type in your email and we will send you a code to reset your password
              </p>
            </div>

            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="px-[2rem] mt-8">
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
              <div className="flex flex-col  justify-between lg:flex-row lg:justify-between lg:space-x-5 lg:items-center">
                {' '}
                <button className="py-[8px] px-[1.3rem]   block bg-[#00695c] hover:bg-green-800 transition duration-150 rounded-[4px] text-white font-bold h-[2.7rem] ">
                  Rest Password
                </button>
                <button
                  onClick={() => setLogIn(true)}
                  className="py-[8px] px-[1.3rem]   block bg-[#42b72a]  transition duration-150 text-white text-[1rem] border border-[#42b72a]  hover:border-[#256818] hover:bg-[#256818] h-[2.7rem] duration-150 rounded-[4px] text-white font-bold h-[2.7rem] "
                >
                  Back to Login?
                </button>

              
              </div>
            </form>
          </section>
        </div>

        <div className="flex justify-center mb-[8px] mt-[2rem] space-x-3">
          <span className="custom-span">Conditions of Use</span>
          <span className="custom-span"> Privacy Notice </span>
          <span className="custom-span"> Help </span>
        </div>
        <div className="flex justify-center mb-[8px]  space-x-3">
          <span className="text-[14.4px] text-[#555]">&copy; 2004-2021, saddamarbaa.com, Inc. or its affiliates</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReducerType) => {
  return {
    authState: state.auth
  };
};

const mapDispatchToProps = {
  restforgetPassword,
  forgetPassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgetPasswordPageComponent);
