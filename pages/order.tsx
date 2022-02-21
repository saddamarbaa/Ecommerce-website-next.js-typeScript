import { connect } from 'react-redux';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Fragment } from 'react';

import OrderPageComponent from '../components/order-page/order-page';
import { ReducerType } from '../redux/reducers/rootReducer';
import Login from './login';
const OrderPage = (props: any) => {
  const { isAuthenticated, isADmin } = props.auth;

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
    <Fragment>
      <Head>
        <title>LogIn to the website</title>
      </Head>
      <meta name="description" content="order" />

      <OrderPageComponent />
    </Fragment>
  );
};

const mapStateToProps = (state: ReducerType) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderPage);
