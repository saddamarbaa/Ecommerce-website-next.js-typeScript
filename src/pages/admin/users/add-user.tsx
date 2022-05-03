import React from 'react';
import Head from 'next/head';

import AddUserPageComponent from '@/page-components/admin-page/users/add-user';

function AddUserPage() {
  return (
    <>
      <Head>
        <title>Add User</title>
      </Head>
      <meta name="description" content="Add User" />

      <AddUserPageComponent />
    </>
  );
}

export default AddUserPage;
