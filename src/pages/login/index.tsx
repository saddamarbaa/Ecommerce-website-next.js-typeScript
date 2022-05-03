import React from 'react';
import Head from 'next/head';

import LogInPageComponent from '@/page-components/login-page';

function LogInScreen() {
  return (
    <>
      <Head>
        <title>Login to the website</title>
      </Head>
      <meta name="description" content="All Products" />
      <LogInPageComponent />
    </>
  );
}

export default LogInScreen;
