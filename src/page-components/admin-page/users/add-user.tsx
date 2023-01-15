import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { authorizationRoles, months } from '@/constants';
import { createUser, ReducerType, resGetUserList, restCreateUser } from '@/global-states';
import { _usersPrototypeReducerState as ReducerState, UserType } from '@/types';
import { getCurrentYear, getYearsIntBetween, signupSchemaValidation } from '@/utils';

// props from connect mapDispatchToProps
interface MapDispatchProps {
  createUser: (finalData: any) => void;
  resGetUserList: () => void;
  restCreateUser: () => void;
}

// props from connect mapStateToProps
interface MapStateProps {
  listState: ReducerState;
}

type PropsType = MapDispatchProps & MapStateProps;

export function AdminAddUser({ restCreateUser, createUser, resGetUserList, listState }: PropsType) {
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<any>([]);
  const { postUserIsPending, postUserIsSuccess, postUserIsError, postUserMessage } = listState;
  const router = useRouter();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserType>({
    resolver: yupResolver(signupSchemaValidation),
  });

  useEffect(() => {
    restCreateUser();
  }, []);

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
    if (postUserIsSuccess || postUserIsError) {
      setShowAlert(() => true);
    }
  }, [postUserIsSuccess, postUserIsError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (postUserIsSuccess) {
        setShowAlert(() => false);
        resGetUserList();
        restCreateUser();
        router.push('/admin/users/users-ui');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [postUserIsSuccess]);

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
    if (data?.role) {
      formData.append('role', data.role);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formData.append('acceptTerms', data?.acceptTerms || true);

    createUser(formData);
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
      <div className=" md:min-w[32rem] mx-auto  w-[90%] md:max-w-[35rem]">
        <div
          className=" mt-[2rem] min-h-[10rem] w-full  rounded-[6px] pb-[2rem]"
          style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
        >
          <div>
            {showAlert && (
              <Alert
                variant="filled"
                severity={postUserIsError ? 'error' : 'success'}
                onClose={() => setShowAlert(false)}
              >
                {postUserMessage}
              </Alert>
            )}
          </div>

          <section>
            <div className="title border-[#dadde1 border-b p-[0.7rem] text-center">
              <h1 className="mb-[8px] text-[1.1rem] font-bold text-[#1c1e21] md:text-[1.5rem]">
                Add New User
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
              <div style={{ marginBottom: '1rem' }}>
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
                  <select id="Month" className="select-css-month" {...register('month')}>
                    {months.map((_month, index) => (
                      <option key={uuidv4()} value={months[index].value} selected={index === 0}>
                        {months[index].label}
                      </option>
                    ))}
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

              <div className="actions">
                <button
                  type="submit"
                  className="mx-auto block h-[2.7rem] w-full rounded-[4px] bg-[#00695c] py-[8px] px-[16px] font-bold text-white transition duration-150 hover:bg-green-800 "
                >
                  Submit
                </button>
              </div>

              <div className="actions">
                <button
                  type="button"
                  disabled={postUserIsPending}
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
});

const mapDispatchToProps = {
  createUser,
  resGetUserList,
  restCreateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddUser);
