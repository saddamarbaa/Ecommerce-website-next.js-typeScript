import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

import { ReducerType } from '@/global-states';
import OrderPageComponent from '@/page-components/order-page';
import Login from '@/pages/login';
import { _authPrototypeReducerState as ReducerState } from '@/types';

interface MapStateProps {
  auth: ReducerState;
}

type PropsType = MapStateProps;
function OrderPage({ auth }: PropsType) {
  const { isAuthenticated } = auth;

  useEffect(() => {
    const redirectToLogin = () => {
      if (!isAuthenticated) {
        return <Login />;
      }
    };

    redirectToLogin();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <Head>
        <title>Your orders</title>
      </Head>
      <meta name="description" content="order" />
      <OrderPageComponent />
    </>
  );
}

const mapStateToProps = (state: ReducerType) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
