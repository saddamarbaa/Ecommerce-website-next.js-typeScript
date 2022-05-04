import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ProductDetailPageComponent from '@/page-components/product-detail-page';

function ProductDetailPage() {
  const router = useRouter();
  const { productId } = router.query;
  return (
    <>
      <Head>
        <title>Product detail</title>
      </Head>
      <meta name="description" content="Add Product" />

      <ProductDetailPageComponent productId={productId} />
    </>
  );
}

export default ProductDetailPage;
