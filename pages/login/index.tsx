import Head from 'next/head'
import React from 'react'

// eslint-disable-next-line import/no-cycle
import LogInPageComponent from 'page-components/login-page'

function LogInPage() {
  return (
    <>
      <Head>
        <title>Login to the website</title>
      </Head>
      <meta name="description" content="All Products" />
      <LogInPageComponent />
    </>
  )
}

export default LogInPageComponent
