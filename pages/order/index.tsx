import { connect } from 'react-redux'
import Head from 'next/head'
import React, { useEffect } from 'react'

// eslint-disable-next-line import/no-cycle
import OrderPageComponent from 'page-components/order-page'

import { ReducerType } from 'redux'
import Login from 'pages/login'

function OrderPage(props: any) {
  const { isAuthenticated, isADmin } = props.auth

  useEffect(() => {
    // eslint-disable-next-line consistent-return
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
        <title>Your orders</title>
      </Head>
      <meta name="description" content="order" />
      <OrderPageComponent />
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
