import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import {
  getIndividualUser,
  ReducerType,
  restGetIndividualUser,
  restUpdateUser,
  updateUser,
} from '@/global-states';
import { _usersPrototypeReducerState as ReducerState, UserType } from '@/types';
import {
  getCurrentYear,
  getYearsIntBetween,
  signupSchemaValidation as validationSchema,
} from '@/utils';

// props passed in to the component
interface OwnProps {
  userId: string | string[] | undefined;
}

// props from connect mapDispatchToProps
interface MapDispatchProps {
  getIndividualUser: (userId: string | string[] | undefined) => void;
  updateUser: (finalData: UserType, userId: string | string[] | undefined) => void;
  restUpdateUser: () => void;
  restGetIndividualUser: () => void;
}

// props from connect mapStateToProps
interface MapStateProps {
  listState: ReducerState;
}

type PropsType = OwnProps & MapDispatchProps & MapStateProps;

export function AdminEditUser({
  getIndividualUser,
  restGetIndividualUser,
  updateUser,
  restUpdateUser,
  listState,
  userId,
}: PropsType) {
  const router = useRouter();

  const autoScrollToBottomRef = useRef<HTMLDivElement>(null);
  const {
    individualUser,
    getIndividualUserIsPending,
    getIndividualUserIsSuccess,
    getIndividualUserIsError,
    getIndividualUserIsMessage,
    updateUserIsPending,
    updateUserIsSuccess,
    updateUserIsError,
    updateUserMessage,
  } = listState;

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [userData, setUserData] = useState<any>({
    firstName: individualUser?.firstName,
    lastName: individualUser?.lastName,
    email: individualUser?.email,
    dateOfBirth: individualUser?.dateOfBirth,
    gender: individualUser?.gender,
    role: individualUser?.role,
    month: '01',
    day: '01',
    year: getCurrentYear(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserType>({
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
    restGetIndividualUser();
    restUpdateUser();

    if (userId) {
      getIndividualUser(userId);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (updateUserIsSuccess) {
        setShowAlert(() => false);
        restUpdateUser();
        // router.push('/admin/users/users-ui');
        router.back();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [userId, updateUserIsSuccess]);

  useEffect(() => {
    if (getIndividualUserIsSuccess) {
      const splicedDate = individualUser?.dateOfBirth && individualUser?.dateOfBirth.split('-');
      setUserData(() => ({
        firstName: individualUser?.firstName,
        lastName: individualUser?.lastName,
        email: individualUser?.email,
        dateOfBirth: individualUser?.dateOfBirth,
        gender: individualUser?.gender,
        role: individualUser?.role,
        month: splicedDate && splicedDate[0],
        day: splicedDate && splicedDate[1],
        year: splicedDate && splicedDate[2],
      }));
    }

    if (updateUserIsSuccess || updateUserIsError || getIndividualUserIsError) {
      setShowAlert(() => true);
    }
  }, [updateUserIsSuccess, updateUserIsError, getIndividualUserIsError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (updateUserIsSuccess || updateUserIsError) {
        setShowAlert(() => false);
        restGetIndividualUser();
        restUpdateUser();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [updateUserIsSuccess, updateUserIsError]);

  const onSubmit = (data: UserType) => {
    const day = data?.day && data.day > 9 ? data.day : `0${data.day}`;
    const finalData = {
      firstName: data?.firstName,
      lastName: data?.firstName,
      email: data?.email,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      gender: data?.gender,
      role: data?.role,
      dateOfBirth: `${data?.month}-${day}-${data?.year}`,
      acceptTerms: data?.acceptTerms || true,
    };

    if (userId) {
      updateUser(finalData, userId);
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState: UserType) => ({ ...prevState, gender: e.target.value }));
  };

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className=" md:min-w[32rem] mx-auto  w-[90%] md:max-w-[35rem]">
        {getIndividualUserIsPending && (
          <div className=" flex items-center justify-center ">
            <CircularProgress color="secondary" />
          </div>
        )}

        {!getIndividualUserIsPending && (
          <div
            className=" mt-[2rem] min-h-[10rem] w-full  rounded-[6px] pb-[2rem]"
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            {getIndividualUserIsError && showAlert && (
              <div
                className="mt-[2rem] w-full  rounded-[6px]"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
              >
                <Alert variant="filled" severity="error" onClose={() => restGetIndividualUser()}>
                  {getIndividualUserIsMessage}
                </Alert>
              </div>
            )}

            {!getIndividualUserIsError && showAlert && (updateUserIsError || updateUserIsSuccess) && (
              <div
                className="mt-[2rem] w-full  rounded-[6px]"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
              >
                <Alert
                  variant="filled"
                  severity={getIndividualUserIsError || updateUserIsError ? 'error' : 'success'}
                  onClose={() => setShowAlert(false)}
                >
                  {updateUserMessage}
                </Alert>
              </div>
            )}

            <section>
              <div className="title border-[#dadde1 border-b p-[0.7rem] text-center">
                <h1 className="mb-[8px] text-[1.1rem] font-bold text-[#1c1e21] md:text-[1.5rem]">
                  Edit user with ID <span className="text-blue-500">{userId}</span>
                </h1>
              </div>

              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="mt-8 px-[2rem]">
                <div className="justify-between md:flex md:items-center md:space-x-[1.3rem]">
                  <div className="control ">
                    {errors.firstName && <p className="error">{errors.firstName?.message}</p>}
                    <input
                      id="firstName"
                      className={` ${errors.firstName ? 'is-invalid' : 'input custom-input'}`}
                      placeholder={errors.firstName ? '' : 'First name'}
                      {...register('firstName')}
                      value={userData.firstName}
                      onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="control">
                    {errors.lastName && <p className="error">{errors.lastName?.message}</p>}
                    <input
                      id="lastName"
                      {...register('lastName')}
                      placeholder={errors.lastName ? '' : 'Surname'}
                      className={` ${errors.lastName ? 'is-invalid' : 'input custom-input'}`}
                      value={userData.lastName}
                      onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
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
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </div>

                <div className="control">
                  <p className="error">{errors.password?.message} </p>
                  <input
                    type="password"
                    id="password"
                    className={` ${errors.password ? 'is-invalid' : 'custom-input'}`}
                    {...register('password')}
                    placeholder={errors.password ? '' : 'New Password Or the Old one '}
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
                      <select
                        id="Month"
                        className="select-css-month"
                        {...register('role')}
                        value={userData.role}
                        onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                      >
                        <option defaultValue={userData.role} value="user">
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
                    <select
                      id="Month"
                      className="select-css-month"
                      {...register('month')}
                      value={userData.Month}
                      onChange={(e) => setUserData({ ...userData, Month: e.target.value })}
                    >
                      <option defaultValue={userData.Month} value="01">
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
                    <select
                      id="day"
                      className="select-css"
                      {...register('day')}
                      value={userData.day}
                      onChange={(e) => setUserData({ ...userData, day: e.target.value })}
                    >
                      {Array.from(Array(30).keys())?.map((_day, index) => (
                        <option key={uuidv4()} defaultValue={userData.day} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="year-container select">
                    <select
                      id="year"
                      className="select-css"
                      {...register('year')}
                      value={userData.year}
                      onChange={(e) => setUserData({ ...userData, year: e.target.value })}
                    >
                      {getYearsIntBetween()
                        .slice(0)
                        .reverse()
                        .map((year) => (
                          <option key={uuidv4()} defaultValue={userData.year} value={year}>
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
                      checked={userData.gender === 'Female'}
                      onChange={(e) => handleGenderChange(e)}
                      className="cursor-pointer"
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
                      checked={userData.gender === 'male'}
                      onChange={(e) => handleGenderChange(e)}
                      className="cursor-pointer"
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
                      checked={userData.gender === 'custom'}
                      onChange={(e) => handleGenderChange(e)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div className="actions">
                  <button
                    disabled={updateUserIsPending || getIndividualUserIsPending}
                    type="submit"
                    className="mx-auto block h-[2.7rem] w-full rounded-[4px] bg-[#00695c] py-[8px] px-[16px] font-bold text-white transition duration-150 hover:bg-green-800 "
                  >
                    Update User
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
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state: ReducerType) => ({
  listState: state.users,
});

const mapDispatchToProps = {
  getIndividualUser,
  restGetIndividualUser,
  updateUser,
  restUpdateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditUser);
