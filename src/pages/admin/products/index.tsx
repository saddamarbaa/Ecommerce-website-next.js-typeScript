import React from 'react';
import Head from 'next/head';

import AdminProducts from '@/page-components/admin-page/products/products';

function AdminProductsPage() {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <meta name="description" content="All Products" />
      <AdminProducts />
    </>
  );
}

export default AdminProductsPage;
