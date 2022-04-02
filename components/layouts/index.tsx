import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import Login from 'pages/login'
import { ReducerType } from 'global-states'
import Footer from './footer/index'
import Navbar from './header/navbar'

type Props = { children: React.ReactNode };

const Layout: React.FC<Props> = ({ children }) => {
  const [isProtectedRoute, setIsProtectedRoute] = useState(false)
  const [resetPasswordRoute, setResetPasswordRoute] = useState(false)
  const isAuthenticated = useSelector((state: ReducerType) => state.auth.isAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (router.pathname.includes('/reset-password') || router.pathname.includes('/verify-email')) {
      setIsProtectedRoute(() => false)
      setResetPasswordRoute(() => true)
    } else if (router.pathname === '/order' || router.pathname === '/cart' || router.pathname === '/') {
      setResetPasswordRoute(() => false)
      setIsProtectedRoute(() => true)
    }
  }, [router, isAuthenticated])

  useEffect(() => {
    const redirectToLogin = () => {
      if (!isAuthenticated && isProtectedRoute) {
        return <Login />
      }
    }

    redirectToLogin()
  }, [isAuthenticated])

  let content
  if (resetPasswordRoute) {
    content = (
      <main className="min-h-[20vh]">{children}</main>
    )
  } else if (!isAuthenticated && isProtectedRoute) {
    content = <Login />
  } else if (!isAuthenticated && !isProtectedRoute) {
    content = (
      <Login />
    )
  } else {
    content = (
      <>
        <Navbar />
        <main className="min-h-[20vh]">{children}</main>
        <Footer />
      </>
    )
  }
  return content
}

export default Layout
