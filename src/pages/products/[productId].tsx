import React from 'react';
import Head from 'next/head';

import ProductDetailPageComponent from '@/page-components/product-detail-page';

function ProductDetailPage() {
  return (
    <>
      <Head>
        <title>Product detail</title>
      </Head>
      <meta name="description" content="Add Product" />

      <ProductDetailPageComponent />
    </>
  );
}

export default ProductDetailPage;
