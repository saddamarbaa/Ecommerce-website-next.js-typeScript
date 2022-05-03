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
        <title>Users</title>
      </Head>
      <meta name="description" content="Users" />
      <EditProductPageComponent userId={productId} />
    </>
  );
}

export default EditProductPage;
