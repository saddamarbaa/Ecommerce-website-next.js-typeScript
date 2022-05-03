import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

import { ReducerType } from '@/global-states';
import { restVerifyEmail, verifyEmail } from '@/global-states/actions';
import {
  _authPrototypeReducerState as ReducerState,
  VerifyEmailRequestType as VerifyEmailType,
} from '@/types';

interface OwnProps {
  userId: string | undefined;
  token: string | undefined;
}

interface MapDispatchProps {
  restVerifyEmail: () => void;
  verifyEmail: (data: VerifyEmailType) => void;
}

interface MapStateProps {
  authState: ReducerState;
}

type PropsType = OwnProps & MapDispatchProps & MapStateProps;

function VerfiyEmailPageComponent({
  userId,
  token,
  authState,
  restVerifyEmail,
  verifyEmail,
}: PropsType) {
  const router = useRouter();
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [logIn, setLogIn] = useState<boolean>(false);

  const {
    confirmEmailIsLoading,
    confirmEmailIsSuccess,
    confirmEmailIsError,
    confirmEmailIsMessage,
  } = authState;

  useEffect(() => {
    setLogIn(() => false);
    restVerifyEmail();
  }, []);

  useEffect(() => {
    if (userId && token) {
      const finalData = {
        userId,
        token,
      };
      verifyEmail(finalData);
    }
  }, [userId, token]);

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
    if (confirmEmailIsSuccess) {
      const timer = setTimeout(() => {
        setShowAlert(() => false);
        setLogIn(() => true);
        restVerifyEmail();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [confirmEmailIsSuccess]);

  useEffect(() => {
    if (confirmEmailIsSuccess || confirmEmailIsError) {
      setShowAlert(() => true);
      if (confirmEmailIsError) {
        const timer = setTimeout(() => {
          setShowAlert(() => false);
          setLogIn(() => false);
          restVerifyEmail();
        }, 30000);
        return () => clearTimeout(timer);
      }
    }
  }, [confirmEmailIsSuccess, confirmEmailIsError]);

  if (logIn) {
    router.replace('/login');
  }

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className=" mx-auto w-[90%]  md:min-w-[20rem] md:max-w-[30rem]">
        <div
          className="  mt-[2rem] w-full  rounded-[6px] "
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {confirmEmailIsLoading && (
            <div className=" flex items-center justify-center pt-4 ">
              <CircularProgress color="secondary" />
            </div>
          )}
          {showAlert && (confirmEmailIsError || confirmEmailIsSuccess) && (
            <Alert
              variant="filled"
              severity={confirmEmailIsError ? 'error' : 'success'}
              onClose={() => setShowAlert(false)}
            >
              {confirmEmailIsMessage}
            </Alert>
          )}

          {!userId && !token && !confirmEmailIsError && !confirmEmailIsSuccess && (
            <Alert variant="filled" severity="error">
              Auth Failed (Invalid Credentials)
            </Alert>
          )}

          {userId && token}
          <section>
            <div className="title   p-[1rem] text-center ">
              <div className="mt-[2rem]  flex justify-center">
                <button
                  type="button"
                  onClick={() => setLogIn(true)}
                  className="block h-[2.7rem]   rounded-[4px]  border border-[#42b72a] bg-[#42b72a] py-[8px] px-[1.3rem] text-[1rem]  font-bold  text-white transition duration-150  hover:border-[#256818] hover:bg-[#256818] "
                >
                  Back to Login?
                </button>
              </div>
            </div>
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
  restVerifyEmail,
  verifyEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerfiyEmailPageComponent);
