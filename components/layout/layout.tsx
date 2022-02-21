import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Navbar from './navbar';
import Footer from './footer';

import Login from '../login-page/login';

const Layout: React.FunctionComponent = ({ children }) => {
  const [isProtectedRoute, setIsProtectedRoute] = useState(false);
  const [resetPasswordRoute, setResetPasswordRoute] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const router = useRouter();
  console.log(router.pathname);
  useEffect(() => {
    if (router.pathname.includes('/reset-password') || router.pathname.includes('/verify-email')) {
      setIsProtectedRoute(() => false);
      setResetPasswordRoute(() => true);
    } else if (router.pathname === '/order' || router.pathname === '/cart' || router.pathname === '/') {
      setResetPasswordRoute(() => false);
      setIsProtectedRoute(() => true);
    }
  }, [router, isAuthenticated]);

  useEffect(() => {
    const redirectToLogin = () => {
      if (!isAuthenticated && isProtectedRoute) {
        return <Login />;
      }
    };

    redirectToLogin();
  }, [isAuthenticated]);

  let content;
  if (resetPasswordRoute) {
    content = (
      <React.Fragment>
        <main>{children}</main>
      </React.Fragment>
    );
  } else if (!isAuthenticated && isProtectedRoute) {
    content = <Login />;
  } else if (!isAuthenticated && !isProtectedRoute) {
    content = (
      <React.Fragment>
        <Login />
      </React.Fragment>
    );
  } else {
    content = (
      <React.Fragment>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </React.Fragment>
    );
  }

  return content;
};

export default Layout;
