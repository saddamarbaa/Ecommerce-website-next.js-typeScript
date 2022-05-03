import React from 'react';
import Head from 'next/head';

import AdminUsersPageComponent from '@/page-components/admin-page/users/users-ui';

function AdminUserPage() {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <meta name="description" content="Users" />
      <AdminUsersPageComponent />
    </>
  );
}

export default AdminUserPage;
