import React from 'react';
import Head from 'next/head';

import AddProductPageComponent from '@/page-components/admin-page/products/add-product';

function AddProductPage() {
  return (
    <>
      <Head>
        <title>Add Product</title>
      </Head>
      <meta name="description" content="Add Product" />

      <AddProductPageComponent />
    </>
  );
}

export default AddProductPage;
