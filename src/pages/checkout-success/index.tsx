import React from 'react';
import Head from 'next/head';

import CheckoutSuccessPageComponent from '@/page-components/admin-page/checkout-success-page';

function LogInScreen() {
  return (
    <>
      <Head>
        <title>checkout success</title>
      </Head>
      <meta name="description" content="checkout-success" />
      <CheckoutSuccessPageComponent />
    </>
  );
}

export default LogInScreen;
