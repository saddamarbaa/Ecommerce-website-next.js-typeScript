import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

import { ReducerType } from '@/global-states';
// eslint-disable-next-line import/no-named-as-default
import HomePageComponent from '@/page-components/home-page/index';

function HomePage() {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <meta name="description" content="All Products" />
      <HomePageComponent />
    </>
  );
}

const mapStateToProps = (state: ReducerType) => ({
  store: state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
