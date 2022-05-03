import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import getConfig from 'next/config';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { PaginationComponent as Pagination } from '@/components';
import { useDebounce } from '@/components/custom-hooks';
import {
  getProducts,
  handleProductSearchTerm,
  handleSelectedCategory,
  handleUpdatePageNumber,
  ReducerType,
} from '@/global-states';
import { _productPrototypeReducerState as ReducerState, ProductType } from '@/types';
import { getRandomIntNumberBetween, truncate } from '@/utils/functions/helpers';

const { publicRuntimeConfig } = getConfig();

// props from connect mapDispatchToProps
interface MapDispatchProps {
  getProducts: (filteredUrl: string) => void;
  handleProductSearchTerm: (payload: string) => void;
  handleSelectedCategory: (payload: string) => void;
  handleUpdatePageNumber: (payload: number) => void;
}

// props from connect mapStateToProps
interface MapStateProps {
  listState: ReducerState;
}

type PropsType = MapDispatchProps & MapStateProps;

export function HomePageComponent({
  getProducts,
  handleProductSearchTerm,
  handleSelectedCategory,
  handleUpdatePageNumber,
  listState,
}: PropsType) {
  const {
    // list,
    listIsLoading,
    // listIsSuccess,
    listIsError,
    listMessage,
    totalDocs,
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

  console.log(limit, page, sortBy, sort);
  useEffect(() => {
    handleSelectedCategory('All Products');
    handleProductSearchTerm('');
    handleUpdatePageNumber(1);
  }, []);

  useEffect(() => {
    let filteredUrl = `/products?page=${page}&limit=${limit}&sortBy=${sortBy}&OrderBy=${sort}&filterBy=category&category=${selectedCategory}`;

    if (debouncedSearchTerm) {
      filteredUrl = `/products?page=${page}&limit=${limit}&sortBy=${sortBy}&OrderBy=${sort}&filterBy=category&category=${selectedCategory}&search=${debouncedSearchTerm}`;
    }

    getProducts(filteredUrl);
  }, [page, limit, sortBy, sort, debouncedSearchTerm, selectedCategory]);

  const handleChange = (_event: React.MouseEvent, value: number) => {
    handleUpdatePageNumber(value);
  };

  return (
    <div className="mx-auto mt-11 max-w-[1150px] p-5 text-[18px]">
      {totalDocs > 0 && (
        <div className="mb-4">
          <Pagination handleChange={handleChange} page={page} totalPages={totalDocs} />
        </div>
      )}
      <div>
        {!products.length && (
          <div className="easy-in-out container m-12  w-full transform rounded bg-white font-bold  shadow-lg  duration-200">
            {listIsLoading && (
              <div className=" flex items-center justify-center ">
                <CircularProgress color="secondary" />
              </div>
            )}
            {!listIsError && !listIsLoading && <p className="p-4"> No Products found</p>}
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
            <Link href={`/products/${product.id}`}>
              <div
                key={product._id}
                className="mb-7 flex cursor-pointer flex-col space-y-4 rounded-[4px] border  border-[#ddd]  p-4 shadow-lg"
              >
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
                <div>
                  {product.rating &&
                    Array(parseInt(product.rating, 10) || 4)
                      .fill(1, 2, 3)
                      .map(() => (
                        <span className="font-bold  text-[#f6991e]" key={uuidv4()}>
                          ✶
                        </span>
                      ))}{' '}
                  <span className="text-base font-semibold text-[#007185]">
                    {'  '}
                    {getRandomIntNumberBetween(1000, 7000)}
                  </span>
                </div>
                <div className=" h-20 overflow-hidden text-[1rem] capitalize  hover:text-[#c45500]">
                  {truncate(product.description, 119)}
                </div>
                <div className="item-center flex text-base ">
                  <span className=" font-bold ">$ {product.price} </span>
                  {!(index % 2) && (
                    <span className="pl-2 font-semibold text-[#007185]">Save 5%</span>
                  )}
                </div>
                <div className=" text-[1rem] capitalize text-[#c45500]">
                  {product.stock ? product.stock : 'In Stock - order soon.'}
                </div>
                <div className="flex items-center justify-between space-x-4 ">
                  <Link href={`/products/${product.id}`}>
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
                  <button
                    type="button"
                    id="custom-button"
                    className=" inline-flex h-12 w-full items-center justify-center  px-6 font-medium tracking-wide transition  duration-200 focus:shadow-outline focus:outline-none "
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {totalDocs > 0 && (
        <div className="mb-4">
          <Pagination handleChange={handleChange} page={page} totalPages={totalDocs} />
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
  handleProductSearchTerm,
  handleSelectedCategory,
  handleUpdatePageNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);
