import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

import ChangePasswordPageComponent from '../../components/change-password-page/change-password-page';

const ChangePasswordScreen = () => {
  const router = useRouter();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const { resetPasswordToken } = router.query;

  useEffect(() => {
    if (resetPasswordToken) {
      const firstSplitString = resetPasswordToken?.split('token=');
			const secondSplitString = firstSplitString[1]?.split('&id=');
			
      setToken(() => secondSplitString && secondSplitString[0]);
      setUserId(() => secondSplitString && secondSplitString[1]);
    }
  }, [router]);

  return (
    <Fragment>
      <Head>
        <title>Change Your Password</title>
      </Head>
      <meta name="description" content="change password" />

			<ChangePasswordPageComponent token={token} userId={userId}/>
    </Fragment>
  );
};

export default ChangePasswordScreen;
