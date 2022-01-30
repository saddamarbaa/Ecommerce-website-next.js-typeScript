import Head from 'next/head';
import React from 'react';
import { Fragment } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { truncate } from '../../utils/functions/helpers';

interface ProductType {
  id: string | number;
  title: string;
  description: string;
  category?: string;
  price?: string;
  image?: string;
  rating?: {
    rate?: number;
    count?: number;
  }[];
}

interface AdminPageProps {
  products?: ProductType[];
}

const AdminPage: NextPage<AdminPageProps> = ({ products }) => {
  return (
    <Fragment>
      <Head>
        <title>Admin</title>
      </Head>
      <meta name="description" content="admin" />

      <div className="text-[18px] max-w-[1100px] mx-auto p-5 mt-11 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products &&
            products?.map((product) => {
              return (
                <div
                  key={product?.id}
                  className="cursor-pointer mb-7 p-4 border border-[#ddd] flex flex-col space-y-6 shadow-lg rounded-[4px]"
                >
                  <div className=" overflow-hidden">
                    <img src={product?.image} alt={product?.title} className="object-contain h-[200px] w-[200px]" />
                  </div>

                  <div className="text-[19px] text-[#007185] my-5 min-h-[3rem]">
                    <h2> {truncate(product.title, 30)}</h2>
                  </div>

                  <div className=" text-[1rem] hover:text-[#c45500] min-h-[100px]">
                    {truncate(product.description, 100)}
                  </div>

                  <div className="text-[19] font-bold">$ {product?.price}</div>
                  <div className="flex items-center justify-around">
                    <Link href={`/edit-product/${product?.id}`}>
                      <button className="btn">Edit</button>
                    </Link>

                    <button className="btn">Delete</button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`https://fakestoreapi.com/products`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { products: data }, // will be passed to the page component as props
  };
};

export default AdminPage;
