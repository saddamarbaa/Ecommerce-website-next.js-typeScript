import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import getConfig from 'next/config';
import Head from 'next/head';
import Image from 'next/image';

// import { v4 as uuidv4 } from 'uuid';
import { getIndividualProduct, ReducerType, restGetIndividualProduct } from '@/global-states';
import { _productPrototypeReducerState as ReducerState } from '@/types';

const { publicRuntimeConfig } = getConfig();

// props passed in to the component
interface OwnProps {
  productId: string | string[] | undefined;
}

// props from connect mapDispatchToProps
interface MapDispatchProps {
  getIndividualProduct: (productId: string | string[]) => void;
  restGetIndividualProduct: () => void;
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
}: PropsType) {
  const {
    individualProduct,
    getIndividualProductIsPending,
    getIndividualProductIsError,
    getIndividualProductIsMessage,
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
                <div className="relative h-[250px] w-full max-w-[450px] object-cover object-center lg:h-auto lg:w-1/2 lg:basis-1/2 ">
                  <Image
                    src={`${publicRuntimeConfig.CONSOLE_BACKEND_IMG_ENDPOIN}${individualProduct.productImage}`}
                    layout="fill"
                    objectFit="contain"
                    className="overflow-hidden rounded"
                    alt={individualProduct.name}
                  />
                </div>
                <div className="mt-8 flex w-full max-w-[550px] flex-col space-y-2  lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-14 ">
                  <h2 className="title-font  text-sm text-[1.3rem] capitalize  tracking-widest text-[#c45500]">
                    {individualProduct.stock}
                  </h2>
                  <h1 className="title-font mb-1 text-2xl font-bold capitalize text-gray-900">
                    {individualProduct.name}
                  </h1>
                  <div className="mb-4 flex">
                    <span className="title-font text-xl font-medium  text-[#c45500]">
                      ${individualProduct.price}
                      <span className="pl-2 ">Save 5%</span>
                    </span>
                  </div>
                  <p className="capitalize leading-relaxed hover:text-[#c45500]">
                    {individualProduct.description}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPageComponent);
