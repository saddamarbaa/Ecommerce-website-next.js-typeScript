import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

import VerifyEmailPageComponent from '../../components/verify-email-page/VerifyEmailPageComponent';

const VerifyEmailScreen = () => {
  const router = useRouter();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const { verifyEmail } = router.query;



  useEffect(() => {
    if (verifyEmail ) {
      const firstSplitString = verifyEmail?.split('token=');
			const secondSplitString = firstSplitString[1]?.split('&id=');
			
      setToken(() => secondSplitString && secondSplitString[0]);
      setUserId(() => secondSplitString && secondSplitString[1]);
    }
  }, [router]);

  return (
    <Fragment>
      <Head>
        <title>Verify Email</title>
      </Head>
      <meta name="description" content="Verify Email" />

			<VerifyEmailPageComponent token={token} userId={userId}/>
    </Fragment>
  );
};

export default VerifyEmailScreen;
