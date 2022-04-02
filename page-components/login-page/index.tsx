import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { connect } from 'react-redux'
import { Alert } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

/* eslint-disable import/no-cycle */
import SignUpComponent from 'page-components/signup-page'
import ForgetPasswordComponent from 'pages/forget-password'
import { LoginSchemaValidation } from 'utils'

import { UserType } from 'types'
import { LogIn, restLoginState } from 'global-states/actions'
import { ReducerType } from 'global-states'

function LogInPageComponent(props?: any) {
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [signIn, setSignIn] = useState<boolean>(false)
  const [forgetPassword, setForgetPassword] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const {
    loginUser,
    loginUserIsLoading,
    loginUserIsSuccess,
    loginUserIsError,
    loginMessage,
  } = props.authState

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserType>({
    resolver: yupResolver(LoginSchemaValidation),
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
    props?.restLoginState()
  }, [])

  useEffect(() => {
    if (loginUserIsSuccess) {
      reset()
      router.push('/')
    }

    if (loginUserIsSuccess || loginUserIsError) {
      setShowAlert(() => true)
      let timer:any
      if (loginUserIsSuccess) {
        timer = setTimeout(() => {
          setShowAlert(() => false)
          props?.restLoginState()
        }, 5000)
      } else {
        timer = setTimeout(() => {
          setShowAlert(() => false)
          props?.restLoginState()
        }, 9000)
      }

      return () => clearTimeout(timer)
    }
  }, [loginUserIsSuccess, loginUserIsError])

  useEffect(() => {
    const redirectToSignUp = () => {
      if (signIn) {
        return <SignUpComponent />
      }
    }

    redirectToSignUp()
  }, [signIn])

  useEffect(() => {
    const redirectToForgetPassword = () => {
      if (forgetPassword) {
        return <ForgetPasswordComponent />
      }
    }

    redirectToForgetPassword()
  }, [forgetPassword])

  if (signIn) {
    return <SignUpComponent />
  }

  if (forgetPassword) {
    return <ForgetPasswordComponent />
  }

  const onSubmit = (data: UserType) => {
    // console.log(JSON.stringify(data, null, 2));

    const finalData = {
      email: data.email,
      password: data.password,
    }

    props.LogIn(finalData)
  }

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className=" mx-auto w-[90%]  md:max-w-[30rem] md:min-w-[30rem]">

        <div
          className=" w-full rounded-[6px]  mt-[2rem] min-h-[10rem]"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {loginUserIsLoading && (
          <div className=" flex items-center justify-center pt-[0.6rem]  ">
            <CircularProgress color="secondary" />
          </div>
          )}
          { showAlert && (loginUserIsSuccess || loginUserIsError) && (
          <div
            className="w-full rounded-[6px]"
            style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
          >
            <Alert
              variant="filled"
              severity={loginUserIsError ? 'error' : 'success'}
              onClose={() => props?.restLoginState()}
            >
              {loginMessage}
            </Alert>
          </div>
          )}
          <div className=" p-5 py-[2rem]">
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

                <div className="control">
                  {!errors.password && <label htmlFor="password">Password (6 or more characters)</label>}
                  <p className="error">{errors.password?.message} </p>
                  <input
                    id="password"
                    className={` ${errors.password ? 'is-invalid' : 'custom-input'}`}
                    type="password"
                    {...register('password')}
                  />
                </div>

                <div className="actions">
                  <button className="py-[8px] px-[16px] mx-auto block w-full bg-[#00695c] hover:bg-green-800 transition duration-150 rounded-[4px] text-white font-bold h-[2.7rem]  ">
                    Log In
                  </button>
                </div>
              </form>

              <p className="option">Or</p>

              <div className="flex flex-col  justify-between lg:flex-row lg:justify-between lg:space-x-5 lg:items-center">
                <button
                  className="order-last lg:order-first py-[8px] px-[16px] mx-auto block    rounded-[4px]  font-bold h-[2.7rem]  rest-btn w-full"
                  onClick={() => setForgetPassword(true)}
                >
                  Forget Password ?
                </button>

                <button
                  className=" py-[8px] px-[16px] mx-auto block    rounded-[4px]  font-bold mt-[1.5rem] bg-[#42b72a]  transition duration-150 text-white text-[1rem] border border-[#42b72a]  hover:border-[#256818] hover:bg-[#256818] h-[2.7rem] w-full"
                  onClick={() => setSignIn(true)}
                >
                  Create New Account
                </button>
              </div>
            </section>
          </div>
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
  )
}

const mapStateToProps = (state: ReducerType) => ({
  authState: state.auth,
})

const mapDispatchToProps = {
  LogIn, restLoginState,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogInPageComponent)
