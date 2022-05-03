// import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import ProgressBar from '@badrap/bar-of-progress';
import { Layout } from 'components/layout';
import ContextProviderCollection from 'contexts/auth';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
// import { ThemeProvider } from 'next-themes';
import { PersistGate } from 'redux-persist/integration/react';

import 'tailwindcss/tailwind.css';
import 'styles/globals.css';

import { nextReduxWrapperTS as wrapper } from '@/global-states';

const progress = new ProgressBar({
  size: 3,
  color: '#3B82F6',
  className: 'bar-of-progress',
  delay: 80,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

export default wrapper.withRedux(({ Component, pageProps }: AppProps) => {
  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  const store = useStore();
  return (
    <>
      <Head>
        <title>Saddam Ecommerce</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Saddam Arbaa" />
        <meta
          name="description"
          content="Ecommerce website build with React + Next Js + TypeScript"
        />
      </Head>
      <PersistGate
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        persistor={store.__persistor}
        loading={<div>Loading...</div>}
      >
        <ContextProviderCollection>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {/* {isMounted && (
            <ThemeProvider attribute="class">
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          )} */}
        </ContextProviderCollection>
      </PersistGate>
    </>
  );
});
