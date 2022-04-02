import Head from 'next/head'
import React from 'react'

import EditUsersPageComponent from 'page-components/admin-page/users/edit-user'

import { useRouter } from 'next/router'

function EditUserPage() {
  const router = useRouter()
  const { userId } = router.query
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <meta name="description" content="Users" />
      <EditUsersPageComponent userId={userId} />
    </>
  )
}

export default EditUserPage
