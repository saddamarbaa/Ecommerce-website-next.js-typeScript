import Head from 'next/head'
import React from 'react'

import AdminUsersTablePageComponent from 'page-components/admin-page/users/users-table'

function AdminUserTablePage() {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <meta name="description" content="Users" />

      <AdminUsersTablePageComponent />
    </>
  )
}

export default AdminUserTablePage
