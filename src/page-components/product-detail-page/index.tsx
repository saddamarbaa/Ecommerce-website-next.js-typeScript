import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import { connect } from 'react-redux';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import getConfig from 'next/config';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { ModalComponent as Modal } from '@/components';
import {
  addProductToCart,
  deleteReview,
  getIndividualProduct,
  getProducts,
  ReducerType,
  restGetIndividualProduct,
} from '@/global-states';
import {
  _authPrototypeReducerState as ReducerState,
  _productPrototypeReducerState as ReducerProductState,
  ProductType,
} from '@/types';
import { getHostUrl, truncate } from '@/utils';

const { publicRuntimeConfig } = getConfig();

// props passed in to the component
interface OwnProps {
  productId: string | string[] | undefined;
}

// props from connect mapDispatchToProps
interface MapDispatchProps {
  getIndividualProduct: (productId: string | string[]) => void;
  deleteReview: (id: string | string[]) => void;
  restGetIndividualProduct: () => void;
  getProducts: (filteredUrl: string) => void;
  addProductToCart: (payload: string) => void;
}

// props from connect mapStateToProps
interface MapStateProps {
  authState: ReducerState;
  listState: ReducerProductState;
}

type PropsType = OwnProps & MapDispatchProps & MapStateProps;

export function ProductDetailPageComponent({
  restGetIndividualProduct,
  getIndividualProduct,
  listState,
  productId,
  getProducts,
  addProductToCart,
  authState,
  deleteReview,
}: PropsType) {
  const {
    individualProduct,
    getIndividualProductIsPending,
    getIndividualProductIsError,
    getIndividualProductIsMessage,
    getIndividualProductIsSuccess,
    AddToCartIsLoading,
    deleteReviewIsError,
    deleteReviewIsSuccess,
    products,
  } = listState;

  const { loginUser } = authState;
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [comment, setComment] = React.useState('');
  const [rating, setRating] = React.useState(1);
  const [isAddCommentApiSuccess, setIsAddCommentApiSuccess] = React.useState(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    restGetIndividualProduct();
  }, []);

  useEffect(() => {
    if (productId) {
      getIndividualProduct(productId);
    }
    return () => {
      setIsAddCommentApiSuccess(false);
    };
  }, [productId, isAddCommentApiSuccess, deleteReviewIsSuccess]);

  useEffect(() => {
    if (deleteReviewIsError || deleteReviewIsSuccess) {
      setShowAlert(() => true);
      setOpen(() => false);

      const timer = setTimeout(() => {
        setShowAlert(() => false);
        // restDeleteProduct();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [deleteReviewIsError, deleteReviewIsSuccess]);

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

  const ratingChanged = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    fetch(`${getHostUrl()}/products/reviews`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('authToken'))}`,
      },
      body: JSON.stringify({
        productId: individualProduct?._id,
        comment,
        rating,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setIsAddCommentApiSuccess(true);
        setComment(' ');
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsAddCommentApiSuccess(false);
      });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    if (individualProduct?._id) deleteReview(individualProduct?._id);
  };

  return (
    <section className="body-font mx-auto w-full max-w-[1250px] overflow-hidden  bg-white  py-24 text-gray-700 ">
      <Modal
        handleClose={handleClose}
        open={open}
        handleSubmit={handleDelete}
        handlePending={false}
        message="review"
      />
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
              <div className="">
                <div className="flex w-full flex-wrap  justify-around">
                  <div className="relative h-[200px] w-[200px]  object-cover ">
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

                    <div className="flex items-center">
                      {individualProduct.ratings ? (
                        <div>
                          {individualProduct.ratings &&
                            Array(Math.ceil(individualProduct.ratings))
                              .fill(Math.ceil(individualProduct.ratings))
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
                              {individualProduct.ratings}
                            </span>
                            {individualProduct.numberOfReviews}
                          </p>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-5 flex border-t border-gray-300 pt-5">
                      <button
                        onClick={() => {
                          if (individualProduct._id) {
                            addProductToCart(individualProduct._id);
                          }
                        }}
                        id="custom-button"
                        type="submit"
                        className=" inline-flex h-12 w-full items-center justify-center  px-6 font-medium tracking-wide transition  duration-200 focus:shadow-outline focus:outline-none "
                        disabled={AddToCartIsLoading}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
                <div className="max-w-xl space-y-4 p-4 ">
                  <h2 className="title-font mb-1 text-xl font-bold capitalize text-gray-900">
                    Add Review
                  </h2>
                  <form
                    action=""
                    className="flex  w-full flex-col space-y-4"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      {' '}
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        isHalf
                        emptyIcon={<i className="far fa-star" />}
                        halfIcon={<i className="fa fa-star-half-alt" />}
                        fullIcon={<i className="fa fa-star" />}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="comment" className="text-lg text-gray-600">
                        Add a comment
                      </label>
                      <textarea
                        className="h-20 w-full rounded border p-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                        name="comment"
                        value={comment}
                        placeholder=""
                        onChange={(event) => {
                          setComment(event.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <button
                        className="rounded bg-[#ffd700] px-3 py-2 text-sm "
                        type="submit"
                        disabled={!comment}
                      >
                        Comment
                      </button>
                    </div>
                  </form>
                </div>

                <div className="max-w-xl space-y-4 p-4 ">
                  <h2 className="title-font mb-1 text-xl font-bold capitalize text-gray-900">
                    Reviews
                  </h2>

                  {individualProduct?.reviews?.length ? (
                    individualProduct?.reviews?.map((rev) => (
                      <div className="mb-1 max-w-lg rounded-lg p-4 shadow shadow-blue-600/50">
                        <div className="text-base text-[#007185]">{rev.name}</div>
                        <div>{rev.comment}</div>
                        <div>
                          {rev.rating &&
                            Array(parseInt(rev.rating.toString(), 10) || 4)
                              .fill(rev.rating)
                              .map(() => (
                                <span
                                  className="text-[1.6rem]  font-bold text-yellow-300"
                                  key={uuidv4()}
                                >
                                  ✶
                                </span>
                              ))}{' '}
                        </div>
                        <div>
                          {loginUser?._id === rev.user ? (
                            <button
                              type="button"
                              className="rounded border border-red-500 px-3 py-2 text-sm text-red-600"
                              onClick={() => {
                                handleOpen();
                              }}
                            >
                              Delete Your Review
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="max-w-lg rounded-lg p-4 shadow shadow-blue-600/50">
                      <div className=" text-center font-semibold text-[#f08804]">
                        No Reviews found for this product
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-[5rem] mb-[3rem]">
                <h2 className="title-font mb-1 text-center text-xl font-bold capitalize text-gray-900">
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

                              <div className="relative h-[200px]">
                                <Image
                                  src={`${publicRuntimeConfig.CONSOLE_BACKEND_IMG_ENDPOIN}${product.productImage}`}
                                  layout="fill"
                                  objectFit="contain"
                                  className="overflow-hidden rounded"
                                  alt={product.name}
                                />
                              </div>
                              <div className="my-5 text-[19px] capitalize  text-[#007185]">
                                <h2> {truncate(product.name, 30)}</h2>
                              </div>
                              {product.ratings ? (
                                <div>
                                  {product.ratings &&
                                    Array(parseInt(product.ratings.toString(), 10) || 4)
                                      .fill(product.ratings)
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
                                      {product.ratings}
                                    </span>
                                    {product.numberOfReviews}
                                  </p>
                                </div>
                              ) : (
                                <div>-</div>
                              )}
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
                                disabled={AddToCartIsLoading}
                                type="button"
                                id="custom-button"
                                className=" inline-flex h-12 w-full items-center justify-center  px-6 font-medium tracking-wide transition  duration-200 focus:shadow-outline focus:outline-none "
                                onClick={() => {
                                  if (product._id) {
                                    addProductToCart(product._id);
                                  }
                                }}
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
  authState: state.auth,
  listState: state.products,
});

const mapDispatchToProps = {
  restGetIndividualProduct,
  getIndividualProduct,
  getProducts,
  addProductToCart,
  deleteReview,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPageComponent);
