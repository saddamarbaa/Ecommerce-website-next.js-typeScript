import React from 'react';
import { connect } from 'react-redux';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { nextReduxWrapperTS as wrapper, ReducerType } from '@/global-states';
import HomePageComponent from '@/page-components/home-page/index';
import { ProductsActionType } from '@/types';
import { apiRequests, getHostUrl } from '@/utils';

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

// This gets called on every request
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch({ type: ProductsActionType.GET_PRODUCTS_LOADING });
    try {
      const response = await apiRequests({
        method: 'get',
        url: `${getHostUrl()}/api/v1/products?page=1&limit=100&sortBy=createdAt&OrderBy=asc&filterBy=category&category=Computer`,
      });
      store.dispatch({
        type: ProductsActionType.GET_PRODUCTS_SUCCESS,
        payload: response,
      });
    } catch (error: any) {
      store.dispatch({
        type: ProductsActionType.GET_PRODUCTS_FAILED,
        payload: { error: error?.data?.message || error.statusText || error },
      });
    }

    // Pass data to the page via props
    return { props: { products: [] } };
  }
);

// you can also use Redux `useSelector` and other hooks instead of `connect()
const mapStateToProps = (state: ReducerType) => ({
  store: state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
