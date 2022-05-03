import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import VerifyEmailPageComponent from '@/page-components/verify-email-page';

function VerifyEmailScreen() {
  const router = useRouter();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const { verifyEmail } = router.query;

  useEffect(() => {
    if (verifyEmail) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const firstSplitString = verifyEmail?.split('token=');
      const secondSplitString = firstSplitString[1]?.split('&id=');

      setToken(() => secondSplitString && secondSplitString[0]);
      setUserId(() => secondSplitString && secondSplitString[1]);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Verify Email</title>
      </Head>
      <meta name="description" content="Verify Email" />
      <VerifyEmailPageComponent token={token} userId={userId} />
    </>
  );
}

export default VerifyEmailScreen;
