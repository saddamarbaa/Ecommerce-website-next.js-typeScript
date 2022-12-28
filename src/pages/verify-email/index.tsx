import Head from 'next/head';
import { useRouter } from 'next/router';

import VerifyEmailPageComponent from '@/page-components/verify-email-page';

function VerifyEmailScreen() {
  const router = useRouter();
  const { token, id } = router.query;

  return (
    <>
      <Head>
        <title>Verify Email</title>
      </Head>
      <meta name="description" content="Verify Email" />
      <VerifyEmailPageComponent token={token} userId={id || ''} />
    </>
  );
}

export default VerifyEmailScreen;
