import Head from 'next/head'
import React from 'react'

import AddProductPageComponent from '@/page-components/admin-page/products/add-product'

function AddProductPage() {
  return (
    <>
      <Head>
        <title>Add Product</title>
      </Head>
      <meta name="description" content="Add Product" />

      <AddProductPageComponent />
    </>
  )
}

export default AddProductPage
