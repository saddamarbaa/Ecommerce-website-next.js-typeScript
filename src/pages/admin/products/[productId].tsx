import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import EditProductPageComponent from '@/page-components/admin-page/products/edit-product';

function EditProductPage() {
  const router = useRouter();
  const { productId } = router.query;
  return (
    <>
      <Head>
        <title>Update Product</title>
      </Head>
      <meta name="description" content="Update Product" />
      <EditProductPageComponent productId={productId} />
    </>
  );
}

export default EditProductPage;
