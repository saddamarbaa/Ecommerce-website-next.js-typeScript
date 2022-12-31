import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { PaginationComponent as Pagination } from '@/components';
import { useDebounce } from '@/components/custom-hooks';
import {
  addProductToCart,
  getProducts,
  handleProductSearchTerm,
  handleSelectedCategory,
  handleUpdatePageNumber,
  ReducerType,
} from '@/global-states';
import { _productPrototypeReducerState as ReducerState, ProductType } from '@/types';
import { truncate } from '@/utils/functions/helpers';

const { publicRuntimeConfig } = getConfig();

// props from connect mapDispatchToProps
interface MapDispatchProps {
  getProducts: (filteredUrl: string) => void;
  // handleProductSearchTerm: (payload: string) => void;
  handleSelectedCategory: (payload: string) => void;
  handleUpdatePageNumber: (payload: number) => void;
  addProductToCart: (payload: string) => void;
}

// props from connect mapStateToProps
interface MapStateProps {
  listState: ReducerState;
}

type PropsType = MapDispatchProps & MapStateProps;

export function HomePageComponent({
  getProducts,
  addProductToCart,
  handleUpdatePageNumber,
  listState,
  handleSelectedCategory,
}: PropsType) {
  const {
    // list,
    listIsLoading,
    // listIsSuccess,
    listIsError,
    listMessage,
    // totalDocs,
    lastPage,
    products,
    productSearchTerm,
    selectedCategory,
    limit,
    page,
    sortBy,
    sort,
  } = listState;

  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 200ms
  // As a result the API call should only fire once user stops typing
  const debouncedSearchTerm = useDebounce(productSearchTerm, 200);

  useEffect(() => {
    if (selectedCategory !== 'All Products') {
      handleSelectedCategory('All Products');
      // handleProductSearchTerm('');
      // handleUpdatePageNumber(1);
    }
  }, []);

  useEffect(() => {
    let filteredUrl = `/products?page=${page}&limit=${limit}`;
    if (debouncedSearchTerm) {
      // filteredUrl = `/products?page=${page}&limit=${limit}&sortBy=${sortBy}&OrderBy=${sort}&filterBy=category&category=${selectedCategory}&search=${debouncedSearchTerm}`;
      filteredUrl = `/products?limit=${limit}&search=${debouncedSearchTerm}`;
    }
    if (selectedCategory && selectedCategory.toLocaleLowerCase() !== 'all products') {
      filteredUrl = `/products?limit=${limit}&search=${debouncedSearchTerm}&category=${selectedCategory}`;
    }
    getProducts(filteredUrl);
  }, [page, limit, sortBy, sort, debouncedSearchTerm, selectedCategory]);

  const handleChange = (_event: React.MouseEvent, value: number) => {
    handleUpdatePageNumber(value);
  };

  return (
    <div className="mx-auto mt-11 max-w-[1150px] p-5 text-[18px]">
      {lastPage > 0 ? (
        <div className="mb-4">
          <Pagination handleChange={handleChange} page={page} totalPages={lastPage} />
        </div>
      ) : null}
      <div>
        {!products.length && (
          <div className="easy-in-out container m-12  w-full transform rounded bg-white font-bold  shadow-lg  duration-200">
            {listIsLoading && (
              <div className=" flex items-center justify-center ">
                <CircularProgress color="secondary" />
              </div>
            )}
            {!listIsError && !listIsLoading && (
              <p className="mt-28 p-12 text-center text-2xl font-semibold text-[#f08804]">
                {' '}
                No Products found
              </p>
            )}
            {listIsError && (
              <Alert variant="filled" severity="error">
                {listMessage}
              </Alert>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 &&
          products.map((product: ProductType, index: number) => (
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
                  <div className="flex items-center">
                    {product.ratings ? (
                      <div>
                        {product.ratings &&
                          Array(Math.ceil(product.ratings))
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
                  </div>
                  <div className="h-20 overflow-hidden text-[1rem] capitalize  hover:text-[#c45500]">
                    {truncate(product.description, 119)}
                  </div>
                  <div className="item-center flex text-base text-[#007185]">
                    <span className="font-bold">$ {product.price} </span>
                    {!(index % 2) && <span className="pl-2 font-semibold">Save 5%</span>}
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
                      className="inline-flex h-12 w-full items-center justify-center  px-6 font-medium tracking-wide transition  duration-200 focus:shadow-outline focus:outline-none "
                    >
                      Details
                    </button>
                  </a>
                </Link>
                <div>
                  <button
                    onClick={() => {
                      if (product._id) {
                        addProductToCart(product._id);
                      }
                    }}
                    type="button"
                    id="custom-button"
                    className=" inline-flex h-12 w-full items-center justify-center  px-6 font-medium tracking-wide transition  duration-200 focus:shadow-outline focus:outline-none "
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {lastPage > 0 && (
        <div className="mb-4">
          <Pagination handleChange={handleChange} page={page} totalPages={lastPage} />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: ReducerType) => ({
  listState: state.products,
});

const mapDispatchToProps = {
  getProducts,
  addProductToCart,
  handleProductSearchTerm,
  handleSelectedCategory,
  handleUpdatePageNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);
