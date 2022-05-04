import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import getConfig from 'next/config';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import {
  getIndividualProduct,
  getProducts,
  ReducerType,
  restGetIndividualProduct,
} from '@/global-states';
import { _productPrototypeReducerState as ReducerState, ProductType } from '@/types';
import { getRandomIntNumberBetween, truncate } from '@/utils';

const { publicRuntimeConfig } = getConfig();

// props passed in to the component
interface OwnProps {
  productId: string | string[] | undefined;
}

// props from connect mapDispatchToProps
interface MapDispatchProps {
  getIndividualProduct: (productId: string | string[]) => void;
  restGetIndividualProduct: () => void;
  getProducts: (filteredUrl: string) => void;
}

// props from connect mapStateToProps
interface MapStateProps {
  listState: ReducerState;
}

type PropsType = OwnProps & MapDispatchProps & MapStateProps;

export function ProductDetailPageComponent({
  restGetIndividualProduct,
  getIndividualProduct,
  listState,
  productId,
  getProducts,
}: PropsType) {
  const {
    individualProduct,
    getIndividualProductIsPending,
    getIndividualProductIsError,
    getIndividualProductIsMessage,
    getIndividualProductIsSuccess,
    products,
  } = listState;

  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    restGetIndividualProduct();
  }, []);

  useEffect(() => {
    if (productId) {
      getIndividualProduct(productId);
    }
  }, [productId]);

  useEffect(() => {
    if (individualProduct) {
      const filteredUrl = `/products?page=1&limit=7&sortBy=createdAt&OrderBy=asc&filterBy=category&category=${individualProduct.category}`;

      getProducts(filteredUrl);
    }
  }, [productId, getIndividualProductIsSuccess]);

  useEffect(() => {
    if (getIndividualProductIsError) {
      setShowAlert(() => true);
    }
  }, [getIndividualProductIsError]);

  return (
    <section className="body-font overflow-hidden bg-white  py-24   text-gray-700 ">
      <div className="md:min-w[32rem] mx-auto w-[90%]   lg:w-[70%] ">
        {getIndividualProductIsPending && (
          <div className=" flex items-center justify-center ">
            <CircularProgress color="secondary" />
          </div>
        )}
        {getIndividualProductIsError && showAlert && (
          <div
            className="mt-[2rem] w-full  rounded-[6px]"
            style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
          >
            <Alert variant="filled" severity="error" onClose={() => restGetIndividualProduct()}>
              {getIndividualProductIsMessage}
            </Alert>
          </div>
        )}
      </div>
      <div>
        {!getIndividualProductIsPending && !getIndividualProductIsError && individualProduct ? (
          <div>
            <Head>
              <title> {individualProduct.name}</title>
              <meta name="description" content={individualProduct.name} />
            </Head>
            <div className="mx-auto w-full max-w-[90%]  sm:container">
              <div className="mx-auto flex w-full flex-wrap justify-center rounded-lg  p-5 shadow ring-1 ring-slate-900/5 transition-transform duration-300   ease-out sm:rounded-none sm:shadow-none sm:ring-0">
                <div className="relative h-[200px] w-full max-w-[400px] object-cover object-center lg:h-auto lg:w-1/2 lg:basis-1/2 ">
                  <Image
                    src={`${publicRuntimeConfig.CONSOLE_BACKEND_IMG_ENDPOIN}${individualProduct.productImage}`}
                    layout="fill"
                    objectFit="contain"
                    className="overflow-hidden rounded"
                    alt={individualProduct.name}
                  />
                </div>
                <div className="mt-8 flex w-full max-w-[550px] flex-col space-y-3  lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-14 ">
                  <h2 className="title-font  text-sm text-[1.3rem] capitalize  tracking-widest text-[#c45500]">
                    {individualProduct.stock}
                  </h2>
                  <h1 className="title-font mb-1 text-2xl font-bold capitalize text-gray-900">
                    {truncate(individualProduct.name, 60)}
                  </h1>
                  <div className="mb-4 flex">
                    <span className="title-font text-xl  font-bold  text-[#007185]">
                      ${individualProduct.price}
                      <span className="pl-2 ">Save 5%</span>
                    </span>
                  </div>
                  <p className="capitalize leading-relaxed hover:text-[#c45500]">
                    {truncate(individualProduct.description, 400)}
                  </p>
                  <div className="mt-5 flex border-t border-gray-300 pt-5">
                    <button
                      id="custom-button"
                      type="submit"
                      className=" inline-flex h-12 w-full items-center justify-center  px-6 font-medium tracking-wide transition  duration-200 focus:shadow-outline focus:outline-none "
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-[5rem] mb-[3rem]">
                <h2 className="title-font mb-1 text-center text-2xl font-bold capitalize text-gray-900">
                  You may also like
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.length > 0 &&
                  products.map(
                    (product: ProductType, index: number) =>
                      index !== 0 && (
                        <div
                          key={product._id}
                          className="mb-7 flex cursor-pointer flex-col space-y-4 rounded-[4px] border  border-[#ddd]  p-4 shadow-lg"
                        >
                          <Link href={`/products/${product._id}`}>
                            <a className="flex flex-col space-y-4 ">
                              <div className="-mt-[10px] flex justify-end text-base  capitalize text-[#007185] ">
                                {product.category}
                              </div>
                              <div className="overflow-hidden">
                                <img
                                  className="mx-auto h-[200px] w-[200px] object-contain"
                                  src={`${publicRuntimeConfig.CONSOLE_BACKEND_IMG_ENDPOIN}${product.productImage}`}
                                  alt={product.name}
                                />
                              </div>
                              <div className="my-5 text-[19px] capitalize  text-[#007185]">
                                <h2> {truncate(product.name, 30)}</h2>
                              </div>
                              <div className="flex items-center">
                                {product.rating &&
                                  Array(parseInt(product.rating, 10) || 4)
                                    .fill(product.rating)
                                    .map(() => (
                                      <span
                                        className="text-[1.6rem]  font-bold text-yellow-300"
                                        key={uuidv4()}
                                      >
                                        ✶
                                      </span>
                                    ))}{' '}
                                <p className="inline text-base font-semibold text-[#007185]">
                                  {'  '}
                                  <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                                    5.0
                                  </span>
                                  {getRandomIntNumberBetween(1000, 7000)}
                                </p>
                              </div>
                              <div className=" h-20 overflow-hidden text-[1rem] capitalize  hover:text-[#c45500]">
                                {truncate(product.description, 119)}
                              </div>
                              <div className="item-center flex text-base text-[#007185]">
                                <span className="font-bold">$ {product.price} </span>
                                {!(index % 2) && (
                                  <span className="pl-2 font-semibold">Save 5%</span>
                                )}
                              </div>
                              <div className=" text-[1rem] capitalize text-[#c45500]">
                                {product.stock ? product.stock : 'In Stock - order soon.'}
                              </div>
                            </a>
                          </Link>
                          <div className="flex items-center justify-between space-x-4 ">
                            <Link href={`/products/${product._id}`}>
                              <a>
                                <button
                                  type="button"
                                  id="custom-button"
                                  className=" inline-flex h-12 w-full items-center justify-center  px-6 font-medium tracking-wide transition  duration-200 focus:shadow-outline focus:outline-none "
                                >
                                  Details
                                </button>
                              </a>
                            </Link>
                            <div>
                              <button
                                type="button"
                                id="custom-button"
                                className=" inline-flex h-12 w-full items-center justify-center  px-6 font-medium tracking-wide transition  duration-200 focus:shadow-outline focus:outline-none "
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}

const mapStateToProps = (state: ReducerType) => ({
  listState: state.products,
});

const mapDispatchToProps = {
  restGetIndividualProduct,
  getIndividualProduct,
  getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPageComponent);
