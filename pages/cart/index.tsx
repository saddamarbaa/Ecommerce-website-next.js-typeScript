import { connect } from 'react-redux'
import Head from 'next/head'
import React, { useEffect } from 'react'

import CartPageComponent from 'page-components/cart-page'

import { ReducerType } from 'global-states'
import Login from 'pages/login'

function OrderPage(props: any) {
  const { isAuthenticated, isADmin } = props.auth

  useEffect(() => {
    const redirectToLogin = () => {
      if (!isAuthenticated) {
        return <Login />
      }
    }

    redirectToLogin()
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <>
      <Head>
        <title>Your Cart</title>
      </Head>
      <meta name="description" content="Cart" />
      <CartPageComponent />
    </>
  )
}

const mapStateToProps = (state: ReducerType) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderPage)
