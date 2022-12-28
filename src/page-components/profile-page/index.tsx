import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { days, months } from '@/constants';
import {
  getIndividualUser,
  ReducerType,
  restGetIndividualUser,
  restUpdateProfile,
  updateProfile,
} from '@/global-states';
import {
  _authPrototypeReducerState as AuthReducerState,
  _usersPrototypeReducerState as ReducerState,
  UserType,
} from '@/types';
import { getCurrentYear, getYearsIntBetween, updateUserSchemaValidation } from '@/utils';

// props passed in to the component
interface OwnProps {
  userId: string | string[] | undefined;
}

// props from connect mapDispatchToProps
interface MapDispatchProps {
  getIndividualUser: (userId: string | string[]) => void;
  updateProfile: (finalData: any, userId: string | string[]) => void;
  restUpdateProfile: () => void;
  restGetIndividualUser: () => void;
}

// props from connect mapStateToProps
interface MapStateProps {
  listState: ReducerState;
  authState: AuthReducerState;
}

type PropsType = OwnProps & MapDispatchProps & MapStateProps;

export function UpdateProfilePageComponent({
  updateProfile,
  authState,
  restUpdateProfile,
  userId,
}: PropsType) {
  const router = useRouter();

  const autoScrollToBottomRef = useRef<HTMLDivElement>(null);

  const {
    updateProfileIsLoading,
    updateProfileIsSuccess,
    updateProfileIsError,
    updateProfileMessage,
    loginUser,
  } = authState;
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const splicedDate = loginUser?.dateOfBirth && loginUser?.dateOfBirth.split('-');

  const [userData, setUserData] = useState<any>({
    name: loginUser?.name,
    surname: loginUser?.surname,
    email: loginUser?.email,
    dateOfBirth: loginUser?.dateOfBirth,
    gender: loginUser?.gender,
    role: loginUser?.role,
    month: splicedDate ? splicedDate[0] : '01',
    day: splicedDate ? splicedDate[1] : '01',
    year: splicedDate ? splicedDate[2] : getCurrentYear(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserType>({
    resolver: yupResolver(updateUserSchemaValidation),
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
    const timer = setTimeout(() => {
      if (updateProfileIsSuccess) {
        setShowAlert(() => false);
        restUpdateProfile();
        router.push('/');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [userId, updateProfileIsSuccess]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (updateProfileIsSuccess || updateProfileIsError) {
        setShowAlert(() => false);
        restGetIndividualUser();
        restUpdateProfile();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [updateProfileIsSuccess, updateProfileIsError]);

  const onSubmit = (data: UserType) => {
    const formData = new FormData();
    formData.append('name', data?.name);
    formData.append('surname', data?.surname);
    formData.append('email', data?.email);
    formData.append('password', data?.password || '');
    formData.append('confirmPassword', data?.confirmPassword || '');
    formData.append('gender', data?.gender);
    formData.append('dateOfBirth', `${data?.month}-${data.day}-${data?.year}`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formData.append('acceptTerms', data?.acceptTerms || true);

    if (data.profileImage && data.profileImage[0])
      formData.append('profileImage', data.profileImage[0]);
    if (userId) updateProfile(formData, userId);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState: UserType) => ({ ...prevState, gender: e.target.value }));
  };

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className="md:min-w[32rem] mx-auto  w-[90%] md:max-w-[35rem]">
        <div
          className=" mt-[2rem] min-h-[10rem] w-full  rounded-[6px] pb-[2rem]"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {showAlert && (updateProfileIsError || updateProfileIsSuccess) && (
            <div
              className="mt-[2rem] w-full  rounded-[6px]"
              style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
            >
              <Alert
                variant="filled"
                severity={updateProfileIsError ? 'error' : 'success'}
                onClose={() => setShowAlert(false)}
              >
                {updateProfileMessage}
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
                  {errors.name && <p className="error">{errors.name?.message}</p>}
                  <input
                    id="name"
                    className={` ${errors.name ? 'is-invalid' : 'input custom-input'}`}
                    placeholder={errors.name ? '' : 'Name'}
                    {...register('name')}
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  />
                </div>
                <div className="control">
                  {errors.surname && <p className="error">{errors.surname?.message}</p>}
                  <input
                    id="surname"
                    {...register('surname')}
                    placeholder={errors.surname ? '' : 'Surname'}
                    className={` ${errors.surname ? 'is-invalid' : 'input custom-input'}`}
                    value={userData.surname}
                    onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
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
                    value={userData.month}
                    onChange={(e) => setUserData({ ...userData, month: e.target.value })}
                  >
                    {months.map((_month, index) => (
                      <option
                        key={uuidv4()}
                        defaultValue={userData.month}
                        value={months[index].value}
                      >
                        {months[index].label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="month-container select">
                  <select
                    id="Month"
                    className="select-css-month"
                    {...register('day')}
                    value={userData.day}
                    onChange={(e) => setUserData({ ...userData, day: e.target.value })}
                  >
                    {days.map((_day, index) => (
                      <option key={uuidv4()} defaultValue={userData.day} value={days[index].value}>
                        {days[index].label}
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
                  disabled={updateProfileIsLoading}
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
      </div>
    </div>
  );
}

const mapStateToProps = (state: ReducerType) => ({
  listState: state.users,
  authState: state.auth,
});

const mapDispatchToProps = {
  getIndividualUser,
  restGetIndividualUser,
  updateProfile,
  restUpdateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfilePageComponent);
