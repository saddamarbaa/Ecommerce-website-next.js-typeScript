import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ProfilePageComponent from '@/page-components/profile-page';

function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <meta name="description" content="Users" />
      <ProfilePageComponent userId={userId} />
    </>
  );
}

export default ProfilePage;
