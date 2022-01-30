import type { AppProps } from 'next/app';
import Head from 'next/head';
import ProgressBar from '@badrap/bar-of-progress';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store/configureStore';

import Login from './login';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';


const progress = new ProgressBar({
  size: 3,
  color: '#42b72a',
  className: 'bar-of-progress',
  delay: 80,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>();
  const isAuth = useSelector((state) => state?.auth.isAuth);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUser(() => localStorage.getItem('user'));
    }
  }, [user]);

  if (!isAuth && !user) {
    return <Login />;
  }

  return (
    <React.Fragment>
      <Layout>
        <Head>
          <title>Ecommerce website</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content="Saddam Arbaa" />
          <meta name="description" content="ecommerce website build with React + Next Js + TypeScript" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  );
}

export default wrapper.withRedux(MyApp);
