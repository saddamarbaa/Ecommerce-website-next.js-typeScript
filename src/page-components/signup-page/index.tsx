import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { v4 as uuidv4 } from 'uuid';

import { ReducerType } from '@/global-states';
import { restSignUpState, signUp } from '@/global-states/actions';
import LogInComponent from '@/pages/login';
import { _authPrototypeReducerState as ReducerState, UserType } from '@/types';
import { getCurrentYear, getYearsIntBetween, signupSchemaValidation } from '@/utils';

interface MapDispatchProps {
  restSignUpState: () => void;
  signUp: (finalData: any) => void;
}

interface MapStateProps {
  authState: ReducerState;
}

type PropsType = MapDispatchProps & MapStateProps;

export function SignUpPageComponent({ signUp, restSignUpState, authState }: PropsType) {
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null);
  const [logIn, setLogIn] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { signUpUserIsLoading, signUpUserIsSuccess, signUpUserIsError, signUpUserMessage } =
    authState;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserType>({
    resolver: yupResolver(signupSchemaValidation),
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
    restSignUpState();
  }, []);

  useEffect(() => {
    if (signUpUserIsSuccess || signUpUserIsError) {
      setShowAlert(() => true);
      const timer = setTimeout(() => {
        setShowAlert(() => false);
        restSignUpState();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [signUpUserIsError, signUpUserIsSuccess]);

  useEffect(() => {
    if (signUpUserIsSuccess) {
      const timer = setTimeout(() => {
        setLogIn(() => true);
      }, 4000);

      return () => clearTimeout(timer);
    }
    const redirectToLogin = () => {
      if (logIn) {
        restSignUpState();
        return <LogInComponent />;
      }
    };
    redirectToLogin();
  }, [logIn, signUpUserIsSuccess]);

  if (logIn) {
    return <LogInComponent />;
  }

  const onSubmit = (data: UserType) => {
    const day = data?.day && data.day > 9 ? data.day : `0${data.day}`;

    const formData = new FormData();
    formData.append('name', data?.name);
    formData.append('surname', data?.surname);
    formData.append('email', data?.email);
    formData.append('profileImage', data.profileImage[0]);
    formData.append('password', data?.password || '');
    formData.append('confirmPassword', data?.confirmPassword || '');
    formData.append('gender', data?.gender);
    formData.append('dateOfBirth', `${data?.month}-${day}-${data?.year}`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formData.append('acceptTerms', data?.acceptTerms || true);
    if (data?.role) {
      formData.append('role', data.role);
    }

    signUp(formData);
  };

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className=" md:min-w[32rem] mx-auto  w-[90%] md:max-w-[35rem]">
        <div
          className=" mt-[2rem] min-h-[10rem] w-full  rounded-[6px] pb-[2rem]"
          style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2) ' }}
        >
          {signUpUserIsLoading && (
            <div className=" flex items-center justify-center pt-[0.6rem]  ">
              <CircularProgress color="secondary" />
            </div>
          )}

          {showAlert && (signUpUserIsError || signUpUserIsSuccess) && (
            <div
              className="mt-[2rem] w-full  rounded-[6px]"
              style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
            >
              <Alert
                variant="filled"
                severity={signUpUserIsError ? 'error' : 'success'}
                onClose={() => restSignUpState()}
              >
                {signUpUserMessage}
              </Alert>
            </div>
          )}

          <section>
            <div className="title border-[#dadde1 border-b p-[0.7rem] text-center">
              <h1 className="mb-[8px] text-[1.1rem] font-bold text-[#1c1e21] md:text-[1.5rem]">
                Create a new account
              </h1>

              <p className="text-[15px] text-gray-500">It quick and easy.</p>
            </div>

            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="mt-8 px-[2rem]">
              <div className="justify-between md:flex md:items-center md:space-x-[1.3rem]">
                <div className="control ">
                  {errors.name && <p className="error">{errors.name.message}</p>}
                  <input
                    id="name"
                    className={` ${errors.name ? 'is-invalid' : 'input custom-input'}`}
                    placeholder={errors.name ? '' : 'Name'}
                    {...register('name')}
                  />
                </div>

                <div className="control">
                  {errors.surname && <p className="error">{errors.surname?.message}</p>}
                  <input
                    id="lastName"
                    {...register('surname')}
                    placeholder={errors.surname ? '' : 'Surname'}
                    className={` ${errors.surname ? 'is-invalid' : 'input custom-input'}`}
                  />
                </div>
              </div>

              <div className="control">
                {errors.email && <p className="error">{errors.email?.message} </p>}
                <input
                  type="text"
                  id="email"
                  className={` ${errors.email ? 'is-invalid' : 'input custom-input'}`}
                  {...register('email')}
                  placeholder={errors.email ? '' : 'Email'}
                />
              </div>

              <div className="control">
                {!errors.profileImage && (
                  <label
                    htmlFor="profileImage"
                    className={` ${errors.profileImage ? 'is-invalid' : 'custom-input'}`}
                    style={{
                      color: 'gray',
                      fontSize: '0.9rem',
                    }}
                  >
                    Profile Image
                  </label>
                )}
                <p className="error">{errors.profileImage?.message} </p>
                <label
                  id={`${errors.profileImage ? 'is-invalid' : 'filePicker-label'}`}
                  htmlFor="filePicker"
                >
                  <AttachFileIcon
                    style={{
                      fontSize: '1.3rem',
                      marginRight: '8px',
                      cursor: 'pointer',
                    }}
                  />
                </label>
                <input
                  id="filePicker"
                  style={{ visibility: 'hidden', display: 'none' }}
                  type="file"
                  {...register('profileImage')}
                />
              </div>

              <div className="control">
                <p className="error">{errors.password?.message} </p>
                <input
                  type="password"
                  id="password"
                  className={` ${errors.password ? 'is-invalid' : 'custom-input'}`}
                  {...register('password')}
                  placeholder={errors.password ? '' : 'New Password'}
                />
              </div>

              <div className="control">
                <p className="error">{errors.confirmPassword?.message} </p>
                <input
                  type="password"
                  id="confirmPassword"
                  className={` ${errors.confirmPassword ? 'is-invalid' : 'custom-input'}`}
                  {...register('confirmPassword')}
                  placeholder={errors.confirmPassword ? '' : 'Confirm Password'}
                />
              </div>

              <div
                style={{
                  color: 'gray',
                  marginTop: '6px',
                  fontSize: '0.9rem',
                }}
              >
                Date of birth ?
              </div>
              <div className="flex items-center justify-between space-x-[1.3rem]">
                <div className="month-container select">
                  <select id="Month" className="select-css-month" {...register('month')}>
                    <option defaultValue="01" value="01">
                      January
                    </option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September </option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12"> December</option>
                  </select>
                </div>

                <div className="day-container select">
                  <select id="day" className="select-css" {...register('day')}>
                    {Array.from(Array(30).keys())?.map((_day, index) => (
                      <option key={uuidv4()} defaultValue={0} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="year-container select">
                  <select id="year" className="select-css" {...register('year')}>
                    {getYearsIntBetween()
                      .slice(0)
                      .reverse()
                      .map((year) => (
                        <option key={uuidv4()} defaultValue={getCurrentYear()} value={year}>
                          {year}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div
                style={{
                  color: 'gray',
                  fontSize: '0.9rem',
                  marginTop: '1rem',
                }}
              >
                Gender ?
              </div>

              <div className="flex items-center justify-between space-x-[1.3rem]">
                <div className="control" style={{ position: 'relative' }}>
                  <input type="text" id="Female" placeholder="Female" />

                  <input
                    {...register('gender')}
                    type="radio"
                    value="Female"
                    id="Female"
                    placeholder="Female"
                    style={{
                      position: 'absolute',
                      right: '10px',
                      fontSize: '0.9rem',
                      width: '1rem',
                    }}
                  />
                </div>

                <div className="control" style={{ position: 'relative' }}>
                  <input type="text" id="Male" placeholder="Male" />

                  <input
                    {...register('gender')}
                    type="radio"
                    value="male"
                    id="Male"
                    placeholder="Male"
                    style={{
                      position: 'absolute',
                      right: '10px',
                      fontSize: '0.9rem',
                      width: '1rem',
                    }}
                  />
                </div>

                <div className="control" style={{ position: 'relative' }}>
                  <input type="text" id="Custom" placeholder="Custom" />

                  <input
                    {...register('gender')}
                    type="radio"
                    value="custom"
                    id="Custom"
                    placeholder="Custom"
                    style={{
                      position: 'absolute',
                      right: '10px',
                      fontSize: '0.9rem',
                      width: '1rem',
                    }}
                  />
                </div>
              </div>

              <p className="error" style={{ marginBottom: '4px' }}>
                {errors.acceptTerms?.message}
              </p>
              <p className="text-[13px] text-gray-500">
                <input
                  id="checkbox"
                  type="checkbox"
                  {...register('acceptTerms')}
                  style={{ marginRight: '5px' }}
                />
                By clicking Sign Up, you agree to the
                <span style={{ color: '#42b72a' }}> (saddams.com) </span>
                <span className="cursor-pointer text-[#0066c0] transition duration-[0.4s] hover:underline ">
                  User Agreements,{'  '}
                </span>
                <span className="cursor-pointer text-[#0066c0] transition duration-[0.4s] hover:underline ">
                  Privacy Policy,{'  '}
                </span>
                and{'  '}
                <span className="cursor-pointer text-[#0066c0] transition duration-[0.4s] hover:underline ">
                  {' '}
                  Cookie Policy.
                </span>
                . You may receive SMS notifications from me and can opt out at any time.
              </p>

              <div className="actions">
                <button
                  type="submit"
                  className="mx-auto block h-[2.7rem] w-full rounded-[4px] bg-[#00695c] py-[8px] px-[16px] font-bold text-white transition duration-150 hover:bg-green-800 "
                >
                  Sign Up
                </button>
              </div>

              <div className="actions">
                <button
                  type="button"
                  className="rest-btn mx-auto block h-[2.7rem] w-full   rounded-[4px]  py-[8px] px-[16px]  font-bold"
                  onClick={() => reset()}
                >
                  Reset?
                </button>
              </div>
            </form>

            <p className="option">Or</p>
            <div className="actions flex justify-center" onClick={() => setLogIn(true)}>
              <button
                type="button"
                className="mx-auto block h-[2.7rem] rounded-[4px]  border  border-[#42b72a] bg-[#42b72a] py-[8px] px-[1.3rem] text-[1rem] font-bold text-white transition  duration-150 hover:border-[#256818] hover:bg-[#256818]"
                onClick={() => setLogIn(true)}
              >
                Already have an account?
              </button>
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
  signUp,
  restSignUpState,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPageComponent);
