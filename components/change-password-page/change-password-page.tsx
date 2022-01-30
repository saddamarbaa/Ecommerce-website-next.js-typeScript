import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';

type UserSubmitForm = {
  email: string;
};

const ChangePasswordPageComponent: React.FunctionComponent = () => {
  const router = useRouter();

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
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
    // DB Call

    // onSucess
    // Rest Inputs
    router.push('/login');
    reset();
  };

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className=" mx-auto w-[90%]  md:max-w-[30rem] md:min-w-[30rem]">
        <div
          className=" p-5 py-[2rem] w-full rounded-[6px]  mt-[2rem] min-h-[10rem]"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
        >
          <section>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="control">
                {!errors.email && <label htmlFor="email"> Email</label>}

                {errors.email && <p className="error">{errors.email.message} </p>}

                <input
                  type="text"
                  id="email"
                  className={` ${errors.email ? 'is-invalid' : 'input custom-input'}`}
                  {...register('email')}
                />
              </div>

              <button className="py-[8px] px-[1.3rem]   block bg-[#00695c] hover:bg-green-800 transition duration-150 rounded-[4px] text-white font-bold h-[2.7rem] ">
                Rest Password
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPageComponent;
