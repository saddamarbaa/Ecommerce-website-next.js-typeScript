/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */

import React, { useState, useEffect, useRef } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Alert } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

/* eslint-disable import/no-cycle */
import LogInComponent from 'pages/login'
import { getYearsIntBetween, signupSchemaValidation } from 'utils'
import { UserType } from 'types'
import { signUp, restSignUpState } from 'global-states/actions'
import { ReducerType } from 'global-states'

export function SignUpPageComponent(props: any) {
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null)
  const [logIn, setLogIn] = useState<boolean>(false)
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  )
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const {
    signUpUser,
    signUpUserIsLoading,
    signUpUserIsSuccess,
    signUpUserIsError,
    signUpUserMessage,
    // eslint-disable-next-line no-unsafe-optional-chaining
  } = props?.authState

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserType>({
    resolver: yupResolver(signupSchemaValidation),
  })

  // Auto Scroll functionality
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    // Auto Scroll functionality
    autoScrollToBottomRef?.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    props.restSignUpState()
  }, [])

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (signUpUserIsSuccess || signUpUserIsError) {
      setShowAlert(() => true)
      const timer = setTimeout(() => {
        setShowAlert(() => false)
        props.restSignUpState()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [signUpUserIsError, signUpUserIsSuccess])

  useEffect(() => {
    if (signUpUserIsSuccess) {
      const timer = setTimeout(() => {
        setLogIn(() => true)
      }, 400)

      return () => clearTimeout(timer)
    }
    const redirectToLogin = () => {
      if (logIn) {
        props.restSignUpState()
        return <LogInComponent />
      }
    }
    redirectToLogin()
  }, [logIn, signUpUserIsSuccess])

  if (logIn) {
    return <LogInComponent />
  }

  const onSubmit = (data: UserType) => {
    const day = data?.day > 9 ? data.day : `0${data?.day}`
    const finalData = {
      firstName: data?.firstName,
      lastName: data?.firstName,
      email: data?.email,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      gender: data?.gender,
      dateOfBirth: `${data?.month}-${day}-${data?.year}`,
      acceptTerms: data?.acceptTerms,
    }

    props.signUp(finalData)
  }

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className=" mx-auto w-[90%]  md:max-w-[35rem] md:min-w[32rem]">
        <div
          className=" pb-[2rem] w-full rounded-[6px]  mt-[2rem] min-h-[10rem]"
          style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2) ' }}
        >
          {signUpUserIsLoading && (
          <div className=" flex items-center justify-center pt-[0.6rem]  ">
            <CircularProgress color="secondary" />
          </div>
          )}

          {showAlert && (signUpUserIsError || signUpUserIsSuccess) && (
          <div
            className="w-full rounded-[6px]  mt-[2rem]"
            style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
          >
            <Alert
              variant="filled"
              severity={signUpUserIsError ? 'error' : 'success'}
              onClose={() => props.restSignUpState()}
            >
              {signUpUserMessage}
            </Alert>
          </div>
          )}

          <section>
            <div className="title border-b border-[#dadde1 p-[0.7rem] text-center">
              <h1 className="text-[1.1rem] md:text-[1.5rem] text-[#1c1e21] mb-[8px] font-bold">
                Create a new account
              </h1>

              <p className="text-gray-500 text-[15px]">
                It quick and easy.
              </p>
            </div>

            <form
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              className="px-[2rem] mt-8"
            >
              <div className="md:flex md:items-center justify-between md:space-x-[1.3rem]">
                <div className="control ">
                  {errors.firstName && (
                  <p className="error">
                    {errors.firstName.message}
                  </p>
                  )}
                  <input
                    id="firstName"
                    className={` ${errors.firstName ? 'is-invalid' : 'input custom-input'}`}
                    placeholder={errors.firstName ? '' : 'First name'}
                    {...register('firstName')}
                  />
                </div>

                <div className="control">
                  {errors.lastName && (
                  <p className="error">
                    {errors.lastName?.message}
                  </p>
                  )}
                  <input
                    id="lastName"
                    {...register('lastName')}
                    placeholder={errors.lastName ? '' : 'Surname'}
                    className={` ${
										  errors.lastName
										    ? 'is-invalid'
										    : 'input custom-input'
                    }`}
                  />
                </div>
              </div>

              <div className="control">
                {errors.email && (
                <p className="error">{errors.email?.message} </p>
                )}
                <input
                  type="text"
                  id="email"
                  className={` ${
									  errors.email ? 'is-invalid' : 'input custom-input'
                  }`}
                  {...register('email')}
                  placeholder={errors.email ? '' : 'Email'}
                />
              </div>

              <div className="control">
                <p className="error">{errors.password?.message} </p>
                <input
                  type="password"
                  id="password"
                  className={` ${
									  errors.password ? 'is-invalid' : 'custom-input'
                  }`}
                  {...register('password')}
                  placeholder={errors.password ? '' : 'New Password'}
                />
              </div>

              <div className="control">
                <p className="error">
                  {errors.confirmPassword?.message}{' '}
                </p>
                <input
                  type="password"
                  id="confirmPassword"
                  className={` ${
									  errors.confirmPassword
									    ? 'is-invalid'
									    : 'custom-input'
                  }`}
                  {...register('confirmPassword')}
                  placeholder={
										errors.confirmPassword ? '' : 'Confirm Password'
									}
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
                  >
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
                  <select
                    id="day"
                    className="select-css"
                    {...register('day')}
                  >
                    {Array.from(Array(30).keys())?.map(
										  (day, index) => (
  <option
    key={index}
    defaultValue={0}
    value={index + 1}
  >
    {index + 1}
  </option>
										  ),
                    )}
                  </select>
                </div>

                <div className="year-container select">
                  <select
                    id="year"
                    className="select-css"
                    {...register('year')}
                  >
                    {getYearsIntBetween()
										  .slice(0)
										  .reverse()
										  .map((year, index) => (
  <option
    key={index}
    defaultValue={currentYear}
    value={year}
  >
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
                <div
                  className="control"
                  style={{ position: 'relative' }}
                >
                  <input
                    type="text"
                    id="Female"
                    placeholder="Female"
                  />

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

                <div
                  className="control"
                  style={{ position: 'relative' }}
                >
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

                <div
                  className="control"
                  style={{ position: 'relative' }}
                >
                  <input
                    type="text"
                    id="Custom"
                    placeholder="Custom"
                  />

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
                <span style={{ color: '#42b72a' }}>
                  {' '}
                  (saddams.com){' '}
                </span>
                <span className="text-[#0066c0] transition duration-[0.4s] cursor-pointer hover:underline ">
                  User Agreements,{'  '}
                </span>
                <span className="text-[#0066c0] transition duration-[0.4s] cursor-pointer hover:underline ">
                  Privacy Policy,{'  '}
                </span>
                and{'  '}
                <span className="text-[#0066c0] transition duration-[0.4s] cursor-pointer hover:underline ">
                  {' '}
                  Cookie Policy.
                </span>
                . You may receive SMS notifications from me and can opt
                out at any time.
              </p>

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

            <p className="option">Or</p>
            <div
              className="actions flex justify-center"
              onClick={() => setLogIn(true)}
            >
              <button
                className="py-[8px] px-[1.3rem] mx-auto block  bg-[#42b72a]  transition duration-150 rounded-[4px] text-white font-bold text-[1rem] border border-[#42b72a]  hover:border-[#256818] hover:bg-[#256818] h-[2.7rem]"
                onClick={() => setLogIn(true)}
              >
                Already have an account?
              </button>
            </div>
          </section>
        </div>

        <div className="flex justify-center mb-[8px] mt-[2rem] space-x-3">
          <span className="custom-span">Conditions of Use</span>
          <span className="custom-span"> Privacy Notice </span>
          <span className="custom-span"> Help </span>
        </div>
        <div className="flex justify-center mb-[8px]  space-x-3">
          <span className="text-[14.4px] text-[#555]">
            &copy; 2004-2021, saddamarbaa.com, Inc. or its affiliates
          </span>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: ReducerType) => ({
  authState: state.auth,
})

const mapDispatchToProps = {
  signUp,
  restSignUpState,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPageComponent)
