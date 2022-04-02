import Head from 'next/head'
import React from 'react'

import HomePageComponent from 'page-components/home-page/index'

function HomePage() {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <meta name="description" content="All Products" />
      <HomePageComponent />
    </>
  )
}

export default HomePage
