import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import EditUsersPageComponent from '@/page-components/admin-page/users/edit-user';

function EditUserPage() {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <meta name="description" content="Users" />
      <EditUsersPageComponent userId={userId} />
    </>
  );
}

export default EditUserPage;
