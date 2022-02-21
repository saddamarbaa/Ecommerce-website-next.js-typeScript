import type { AppProps } from 'next/app';
import Head from 'next/head';
import ProgressBar from '@badrap/bar-of-progress';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';


import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from 'react-redux';
import { useStore } from "react-redux";

import { ReducerType } from '../redux/reducers/rootReducer';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store/configureStoreTem';
import AuthProvider from '../contexts/auth/AuthContext'
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
  const store = useStore((state:any) => state);
 
 


  const isAuthenticated = useSelector((state:ReducerType) => state.auth.isAuthenticated );
  

  return (
    <React.Fragment>
      <AuthProvider>
        <PersistGate persistor={store.__persistor} loading={<div>Loading...</div>}>
          {/* {!isAuthenticated &&   < Login/>} */}
        
            <Layout>
              <Head>
                <title>Ecommerce website</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="author" content="Saddam Arbaa" />
                <meta name="description" content="ecommerce website build with React + Next Js + TypeScript" />
              </Head>
      
         
     <Component {...pageProps} />
           
            </Layout>
           </PersistGate>
         </AuthProvider>
    </React.Fragment>
  );
}

export default wrapper.withRedux(MyApp);
