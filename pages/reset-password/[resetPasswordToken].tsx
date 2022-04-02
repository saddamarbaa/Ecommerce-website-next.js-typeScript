import Head from 'next/head'
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import ChangePasswordPageComponent from 'page-components/change-password-page'

function ChangePasswordScreen() {
  const router = useRouter()
  const [token, setToken] = useState()
  const [userId, setUserId] = useState()
  const { resetPasswordToken } = router.query

  useEffect(() => {
    if (resetPasswordToken) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const firstSplitString = resetPasswordToken?.split('token=')
      const secondSplitString = firstSplitString[1]?.split('&id=')

      setToken(() => secondSplitString && secondSplitString[0])
      setUserId(() => secondSplitString && secondSplitString[1])
    }
  }, [router])

  return (
    <>
      <Head>
        <title>Change Your Password</title>
      </Head>
      <meta name="description" content="change password" />

      <ChangePasswordPageComponent token={token} userId={userId} />
    </>
  )
}

export default ChangePasswordScreen
