import Head from 'next/head'
import React from 'react'

// eslint-disable-next-line import/no-cycle
import ForgetPasswordPageComponent from 'page-components/forget-password-page'

function ChangePasswordScreen() {
  return (
    <>
      <Head>
        <title> Forgot your password?</title>
      </Head>
      <meta name="description" content="change password" />

      <ForgetPasswordPageComponent />
    </>
  )
}

export default ChangePasswordScreen
