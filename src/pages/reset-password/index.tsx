import Head from 'next/head';
import { useRouter } from 'next/router';

import ChangePasswordPageComponent from '@/page-components/change-password-page';

function ChangePasswordScreen() {
  const router = useRouter();
  const { token, id } = router.query;

  return (
    <>
      <Head>
        <title>Change Your Password</title>
      </Head>
      <meta name="description" content="change password" />

      <ChangePasswordPageComponent token={token} userId={id || ''} />
    </>
  );
}

export default ChangePasswordScreen;
