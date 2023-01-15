import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { authorizationRoles, days, months } from '@/constants';
import {
  getIndividualUser,
  ReducerType,
  restGetIndividualUser,
  restUpdateUser,
  updateUser,
} from '@/global-states';
import { _usersPrototypeReducerState as ReducerState, UserType } from '@/types';
import { getCurrentYear, getYearsIntBetween, updateUserSchemaValidation } from '@/utils';

// props passed in to the component
interface OwnProps {
  userId: string | string[] | undefined;
}

// props from connect mapDispatchToProps
interface MapDispatchProps {
  getIndividualUser: (userId: string | string[], isAdmin?: boolean) => void;
  updateUser: (finalData: any, userId: string | string[], isAdmin?: boolean) => void;
  restUpdateUser: () => void;
  restGetIndividualUser: () => void;
}

// props from connect mapStateToProps
interface MapStateProps {
  listState: ReducerState;
}

type PropsType = OwnProps & MapDispatchProps & MapStateProps;

export const defaultValues: UserType = {
  surname: '',
  name: '',
  email: '',
  role: '',
  acceptTerms: true,
  gender: '',
};

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
  const [files, setFiles] = useState<any>([]);
  const splicedDate =
    individualUser && individualUser?.dateOfBirth && individualUser?.dateOfBirth.split('-');

  const [userData, setUserData] = useState<any>({
    name: individualUser?.name,
    surname: individualUser?.surname,
    email: individualUser?.email,
    dateOfBirth: individualUser?.dateOfBirth,
    gender: individualUser?.gender,
    role: individualUser?.role,
    month: splicedDate ? splicedDate[0] : '01',
    day: splicedDate ? splicedDate[1] : '01',
    year: splicedDate ? splicedDate[2] : getCurrentYear(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserType>({
    defaultValues,
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
    restGetIndividualUser();
    restUpdateUser();

    if (userId) {
      getIndividualUser(userId, true);
    }
  }, [userId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (updateUserIsSuccess) {
        setShowAlert(() => false);
        restGetIndividualUser();
        restUpdateUser();
        router.back();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [userId, updateUserIsSuccess]);

  useEffect(() => {
    // profileImage
    if (getIndividualUserIsSuccess && individualUser) {
      const splicedDate = individualUser?.dateOfBirth && individualUser?.dateOfBirth.split('-');
      reset({
        name: individualUser?.name,
        surname: individualUser?.surname,
        email: individualUser?.email,
        dateOfBirth: individualUser?.dateOfBirth,
        gender: individualUser?.gender,
        role: individualUser?.role,
      });

      setUserData(() => ({
        name: individualUser?.name,
        surname: individualUser?.surname,
        email: individualUser?.email,
        dateOfBirth: individualUser?.dateOfBirth,
        gender: individualUser?.gender,
        role: individualUser?.role,
        month: splicedDate ? splicedDate[0] : '01',
        day: splicedDate ? splicedDate[1] : '01',
        year: splicedDate ? splicedDate[2] : getCurrentYear(),
      }));

      setFiles(() => [{ img: individualUser.profileImage }]);
    }

    if (updateUserIsSuccess || updateUserIsError || getIndividualUserIsError) {
      setShowAlert(() => true);
    }
  }, [
    getIndividualUserIsSuccess,
    updateUserIsSuccess,
    updateUserIsError,
    getIndividualUserIsError,
  ]);

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
    const formData = new FormData();
    formData.append('name', data?.name);
    formData.append('surname', data?.surname);
    formData.append('email', data?.email);
    formData.append('gender', data?.gender);
    formData.append('dateOfBirth', `${data?.month}-${data.day}-${data?.year}`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formData.append('acceptTerms', data?.acceptTerms || true);
    if (data?.role) formData.append('role', data?.role);

    if (data.profileImage) formData.append('profileImage', data.profileImage[0]);

    if (userId) updateUser(formData, userId, true);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState: UserType) => ({ ...prevState, gender: e.target.value }));
  };

  const TransformFileData = (file: Blob) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFiles(() => [{ file, img: reader.result }]);
      };
    }
  };

  const handleUploadFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      const file = event?.target?.files && event?.target?.files[0];
      TransformFileData(file);
    }
  };

  const removeFileHandler = () => {
    setValue('profileImage', null, { shouldValidate: true });
    setFiles(() => []);
  };

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className="md:min-w[32rem] mx-auto  w-[90%] md:max-w-[35rem]">
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
                    {errors.name && <p className="error">{errors.name?.message}</p>}
                    <input
                      id="firstName"
                      className={` ${errors.name ? 'is-invalid' : 'input custom-input'}`}
                      placeholder={errors.name ? '' : 'Name'}
                      {...register('name')}
                      value={userData.firstName}
                      onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="control">
                    {errors.surname && <p className="error">{errors.surname?.message}</p>}
                    <input
                      id="surname"
                      {...register('surname')}
                      placeholder={errors.surname ? '' : 'Surname'}
                      className={` ${errors.surname ? 'is-invalid' : 'input custom-input'}`}
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
                    className="form-control"
                    // onChange={handleUploadFileHandler}
                    id="filePicker"
                    style={{ visibility: 'hidden', display: 'none' }}
                    type="file"
                    accept="image/*"
                    {...register('profileImage', {
                      onChange: handleUploadFileHandler,
                      // onBlur: (e) => {},
                    })}
                    // multiple
                  />
                  <div className=" flex  flex-wrap space-y-2 space-x-2">
                    {files.length > 0 &&
                      files?.map((e: any) => (
                        <div className="shadow-none transition-shadow duration-300 ease-in-out hover:shadow-sm ">
                          <img
                            className="h-36 w-36 rounded object-contain"
                            src={e.img}
                            alt="error!"
                          />
                          <div className="mt-1 text-center">
                            <DeleteIcon
                              style={{
                                fontSize: '20px',
                                color: 'red',
                                margin: 'auto',
                                cursor: 'pointer',
                              }}
                              onClick={removeFileHandler}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
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
                        {authorizationRoles.map((item: any, index: number) => (
                          <option selected={index === 0} value={item.value}>
                            {item.label}
                          </option>
                        ))}
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
                  <div className="day-container select">
                    <select
                      id="day"
                      className="select-css"
                      {...register('day')}
                      value={userData.day}
                      onChange={(e) => setUserData({ ...userData, day: e.target.value })}
                    >
                      {days.map((_day, index) => (
                        <option
                          key={uuidv4()}
                          defaultValue={userData.day}
                          value={days[index].value}
                        >
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
