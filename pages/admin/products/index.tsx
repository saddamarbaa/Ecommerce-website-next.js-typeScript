import getConfig from 'next/config'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import React from 'react'

import AdminProducts from '@/page-components/admin-page/products/products'

import { ProductType } from 'types'

const { serverRuntimeConfig } = getConfig()

interface Props {
  products: ProductType[];
}

function HomePage({ products }: Props) {
  return (
    <>
      <Head>
        <title>Admin Products</title>
      </Head>
      <meta name="description" content="All Products" />
      <AdminProducts products={products} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${serverRuntimeConfig.CONSOLE_BACKEND_ENDPOINT}/products`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { products: data.data.products || [] }, // will be passed to the page component as props
  }
}

export default HomePage
