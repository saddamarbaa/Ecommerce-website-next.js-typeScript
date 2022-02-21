import React, { useState, useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { restVerifyEmail, verifyEmail } from '../../redux/actions';
import { ReducerType } from '../../redux/reducers/rootReducer';
import LogInComponent from '../../pages/login';

const VerfiyEmailPageComponent = (props: any) => {
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [logIn, setLogIn] = useState<boolean>(false);

  const { confirmEmailIsLoading, confirmEmailIsSuccess, confirmEmailIsError, confirmEmailIsMessage } = props.authState;


  useEffect(() => {
   setLogIn(() => false);
    props.restVerifyEmail();
  }, [])
  

  useEffect(() => {
    if (props.userId, props.token) {
      const finalData = {
        userId: props.userId,
        token: props.token
      };
      props.verifyEmail(finalData);
    }
  }, [props.userId, props.token]);

 
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
    if (confirmEmailIsSuccess) {
      const timer = setTimeout(() => {
        setShowAlert(() => false);
        setLogIn(() => true);
         props.restVerifyEmail();
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
          props.restVerifyEmail();
        }, 30000);
        return () => clearTimeout(timer);
      }
    }
  }, [confirmEmailIsSuccess, confirmEmailIsError]);

  if (logIn) {
    return <LogInComponent />;
  }

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className=" mx-auto w-[90%]  md:max-w-[30rem] md:min-w-[20rem]">
        <div
          className="  w-full rounded-[6px]  mt-[2rem] "
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
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
          <section>
            <div className="title   p-[1rem] text-center ">
              <div className="flex  justify-center mt-[2rem]">
                <button
                  onClick={() => setLogIn(true)}
                  className="py-[8px] px-[1.3rem]   block bg-[#42b72a]  transition duration-150 text-white text-[1rem] border border-[#42b72a]  hover:border-[#256818] hover:bg-[#256818] h-[2.7rem] duration-150 rounded-[4px] text-white font-bold h-[2.7rem] "
                >
                  Back to Login?
                </button>
              </div>
            </div>
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
  restVerifyEmail,
  verifyEmail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerfiyEmailPageComponent);
