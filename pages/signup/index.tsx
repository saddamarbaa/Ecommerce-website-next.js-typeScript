import Head from 'next/head'
import React from 'react'

import SignUpComponent from 'page-components/signup-page'

function SignUpScreen() {
  return (
    <>
      <Head>
        <title> Signup to the website</title>
      </Head>
      <meta name="description" content="LogIn to the website" />

      <SignUpComponent />
    </>
  )
}

export default SignUpScreen
