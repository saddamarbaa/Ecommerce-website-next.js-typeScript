import type { AppProps } from 'next/app';
import Head from 'next/head';
import ProgressBar from '@badrap/bar-of-progress';
import React, { useEffect } from 'react';
import Router from 'next/router';

import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store/configureStore';
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
  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');

    // 	const userId = localStorage.getItem("userId");
    // 	const remainingMilliseconds =
    // 		new Date(expiryDate).getTime() - new Date().getTime();
    // 	this.setState({ isAuth: true, token: token, userId: userId });
    // 	this.setAutoLogout(remainingMilliseconds);

    // logoutHandler = () => {
    // 	this.setState({ isAuth: false, token: null });
    // 	localStorage.removeItem("token");
    // 	localStorage.removeItem("expiryDate");
    // 	localStorage.removeItem("userId");
    // };
  }, []);

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
