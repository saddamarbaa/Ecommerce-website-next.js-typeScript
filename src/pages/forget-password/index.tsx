import React from 'react';
import Head from 'next/head';

import ForgetPasswordPageComponent from '@/page-components/forget-password-page';

function ForgetPasswordScreen() {
  return (
    <>
      <Head>
        <title> Forgot your password?</title>
      </Head>
      <meta name="description" content="change password" />

      <ForgetPasswordPageComponent />
    </>
  );
}

export default ForgetPasswordScreen;
