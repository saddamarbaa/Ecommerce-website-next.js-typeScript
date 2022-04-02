import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { connect } from 'react-redux'
import { Alert } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { ResetPasswordType } from 'types'
import { restPassword, restPasswordRest } from 'global-states/actions'
import { ReducerType } from 'global-states'
import { updatePasswordSchemaValidation } from 'utils'

function ChangePasswordPageComponent(props: any) {
  const router = useRouter()
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [logIn, setLogIn] = useState<boolean>(false)
  const {
    restPasswordIsLoading, restPasswordIsSuccess, restPasswordIsError, restPasswordMessage,
  } = props.authState

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: yupResolver(updatePasswordSchemaValidation),
  })

  useEffect(() => {
    setLogIn(() => false)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    // Auto Scroll functionality
    autoScrollToBottomRef?.current?.scrollIntoView({
      behavior: 'smooth',
    })

    props.restPasswordRest()
  }, [])

  useEffect(() => {
    if (restPasswordIsSuccess) {
      const timer = setTimeout(() => {
        reset()
        setShowAlert(() => false)
        setLogIn(() => true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [restPasswordIsSuccess])

  useEffect(() => {
    if (restPasswordIsSuccess || restPasswordIsError) {
      setShowAlert(() => true)
      if (restPasswordIsError) {
        const timer = setTimeout(() => {
          setShowAlert(() => false)
          setLogIn(() => false)
          props.restPasswordRest()
        }, 8000)
        return () => clearTimeout(timer)
      }
    }
  }, [restPasswordIsError, restPasswordIsSuccess])

  if (logIn) {
    router.replace('/login')
  }

  const onSubmit = (data: ResetPasswordType) => {
    const finalData = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      userId: props.userId,
      token: props.token,
    }

    props.restPassword(finalData)
  }

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className=" mx-auto w-[90%]  md:max-w-[30rem] md:min-w-[30rem]">
        <div
          className=" pb-[2rem] w-full rounded-[6px]  mt-[2rem] min-h-[10rem]"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {restPasswordIsLoading && (
          <div className=" flex items-center justify-center pt-4 ">
            <CircularProgress color="secondary" />
          </div>
          )}

          {showAlert && (restPasswordIsError || restPasswordIsSuccess) && (
          <Alert
            variant="filled"
            severity={restPasswordIsError ? 'error' : 'success'}
            onClose={() => setShowAlert(false)}
          >
            {restPasswordMessage}
          </Alert>
          )}

          <section>
            <div className="title border-b border-[#dadde1 p-[0.7rem] text-center">
              <h1 className="text-[1.1rem] md:text-[1.5rem] text-[#1c1e21] mb-[8px] font-bold">
                Reset your password
              </h1>
            </div>

            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="px-[2rem] mt-8">
              <div className="control">
                {errors.email && <p className="error">{errors.email?.message} </p>}
                <input
                  type="text"
                  id="email"
                  className={` ${errors.email ? 'is-invalid' : 'input custom-input'}`}
                  {...register('email')}
                  placeholder={errors.email ? '' : 'Your email'}
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
                  placeholder={errors.confirmPassword ? '' : 'Confirm New Password'}
                />
              </div>

              <p className="error" style={{ marginBottom: '4px' }}>
                {errors.acceptTerms?.message}
              </p>
              <p className="text-[13px] text-gray-500">
                <input id="checkbox" type="checkbox" {...register('acceptTerms')} style={{ marginRight: '5px' }} />
                By clicking Sign Up, you agree to the
                <span style={{ color: '#42b72a' }}> (saddams.com) </span>
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
                . You may receive SMS notifications from me and can opt out at any time.
              </p>

              <div className="actions">
                <button className="py-[8px] px-[16px] mx-auto block w-full bg-[#00695c] hover:bg-green-800 transition duration-150 rounded-[4px] text-white font-bold h-[2.7rem] ">
                  Reset password
                </button>
              </div>
            </form>
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
  )
}

const mapStateToProps = (state: ReducerType) => ({
  authState: state.auth,
})

const mapDispatchToProps = {
  restPassword,
  restPasswordRest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordPageComponent)
