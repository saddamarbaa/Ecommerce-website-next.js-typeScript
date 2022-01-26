import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { Alert } from '@mui/material';

import { getYearsIntBetween } from '../../utils/helpers';
import { createUser, restPostUserState } from '../../redux/actions';
import { ReducerType } from '../../redux/reducers/rootReducer';

type UserSubmitForm = {
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
};

const SignUpPageComponent: React.FunctionComponent = (props: any) => {
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const { postUserIsPending, postUserIsSuccess, postUserIsError, postUserMessage } = props?.listState;
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('FirstName is required')
      .min(3, 'FirstName must be at least 3 characters')
      .max(10, 'FirstName must not exceed 10 characters'),
    lastName: Yup.string()
      .required('LastName is required')
      .min(3, 'LastName must be at least 3 characters')
      .max(10, 'LastName must not exceed 10 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
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
    if (postUserIsSuccess) {
      props.restPostUserState();
      router.push('/admin/users');
    }
  }, [postUserIsSuccess]);

  const onSubmit = (data: UserSubmitForm) => {
    let day = data?.day > 9 ? data.day : `0${data?.day}`;
    const finalData = {
      firstName: data?.firstName,
      lastName: data?.firstName,
      email: data?.email,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      gender: data?.gender,
      role: data?.role,
      dateOfBirth: `${data?.month}-${day}-${data?.year}`,
    };

    props.createUser(finalData);
  };

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className=" mx-auto w-[90%]  md:max-w-[35rem] md:min-w[32rem]">
        <div>
          {postUserIsError && (
            <Alert onClose={() => {}} variant="filled" severity="error">
              {postUserMessage}
            </Alert>
          )}

          {postUserIsSuccess && (
            <Alert variant="filled" severity="success">
              {postUserMessage}
            </Alert>
          )}
        </div>

        <div
          className=" pb-[2rem] w-full rounded-[6px]  mt-[2rem] min-h-[10rem]"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <section>
            <div className="title border-b border-[#dadde1 p-[0.7rem] text-center">
              <h1 className="text-[1.1rem] md:text-[1.5rem] text-[#1c1e21] mb-[8px] font-bold">Add New User</h1>
            </div>

            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="px-[2rem] mt-8">
              <div className="md:flex md:items-center justify-between md:space-x-[1.3rem]">
                <div className="control ">
                  {errors.firstName && <p className="error">{errors.firstName?.message}</p>}
                  <input
                    id="firstName"
                    className={` ${errors.firstName ? 'is-invalid' : 'input custom-input'}`}
                    placeholder={errors.firstName ? '' : 'First name'}
                    {...register('firstName')}
                  />
                </div>

                <div className="control">
                  {errors.lastName && <p className="error">{errors.lastName?.message}</p>}
                  <input
                    id="lastName"
                    {...register('lastName')}
                    placeholder={errors.lastName ? '' : 'Surname'}
                    className={` ${errors.lastName ? 'is-invalid' : 'input custom-input'}`}
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
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    color: 'gray',
                    fontSize: '0.9rem',
                  }}
                >
                  User Role ?
                </div>
                <div className="flex items-center justify-between space-x-[1.3rem]">
                  <div className="month-container select">
                    <select id="Month" className="select-css-month" {...register('role')}>
                      <option defaultValue="user" value="user">
                        User
                      </option>
                      <option value="guide">Guide</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
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
                    {Array.from(Array(30).keys())?.map((day, index) => {
                      return (
                        <option key={index} defaultValue={0} value={index + 1}>
                          {index + 1}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="year-container select">
                  <select id="year" className="select-css" {...register('year')}>
                    {getYearsIntBetween()
                      .slice(0)
                      .reverse()
                      .map((year, index) => {
                        return (
                          <option key={index} defaultValue={currentYear} value={year}>
                            {year}
                          </option>
                        );
                      })}
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

              <div className="actions">
                <button className="py-[8px] px-[16px] mx-auto block w-full bg-[#00695c] hover:bg-green-800 transition duration-150 rounded-[4px] text-white font-bold h-[2.7rem] ">
                  Sign Up
                </button>
              </div>

              <div className="actions">
                <button
                  className="py-[8px] px-[16px] mx-auto block w-full   rounded-[4px]  font-bold h-[2.7rem]  rest-btn"
                  onClick={() => reset()}
                >
                  Reset?
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReducerType) => {
  return {
    listState: state.user,
  };
};

const mapDispatchToProps = {
  createUser,
  restPostUserState,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPageComponent);
