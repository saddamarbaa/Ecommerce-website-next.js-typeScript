import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { ModalComponent as Modal, PaginationComponent as Pagination } from '@/components';
import { useDebounce } from '@/components/custom-hooks';
import {
  deleteProduct,
  getProducts,
  handleProductSearchTerm,
  handleSelectedCategory,
  handleUpdatePageNumber,
  ReducerType,
  restDeleteProduct,
  updateProductSortBy,
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
  deleteProduct: (productId: string) => void;
  restDeleteProduct: () => void;
  // updateProductSortBy: (payload: string) => void;
}

// props from connect mapStateToProps
interface MapStateProps {
  listState: ReducerState;
}

type PropsType = MapDispatchProps & MapStateProps;

export function HomePageComponent({
  getProducts,
  // handleProductSearchTerm,
  handleSelectedCategory,
  listState,
  handleUpdatePageNumber,
  deleteProduct,
  restDeleteProduct,
}: // updateProductSortBy,
PropsType) {
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
    deleteProductIsPending,
    deleteProductIsSuccess,
    deleteProductIsError,
    deleteProductMessage,
  } = listState;

  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | undefined>();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 200ms
  // As a result the API call should only fire once user stops typing
  const debouncedSearchTerm = useDebounce(productSearchTerm, 200);

  useEffect(() => {
    handleSelectedCategory('All Products');
    // handleProductSearchTerm('');
    // handleUpdatePageNumber(1);
    // updateProductSortBy('desc');
  }, []);

  useEffect(() => {
    const filteredUrl = `/products?page=${page}&limit=${limit}`;

    getProducts(filteredUrl);
  }, [page, limit, sortBy, sort, debouncedSearchTerm, selectedCategory, deleteProductIsSuccess]);

  const handleChange = (_event: React.MouseEvent, value: number) => {
    handleUpdatePageNumber(value);
  };

  useEffect(() => {
    if (deleteProductIsError || deleteProductIsSuccess) {
      setId(() => undefined);
      setShowAlert(() => true);
      setOpen(() => false);

      const timer = setTimeout(() => {
        setShowAlert(() => false);
        restDeleteProduct();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [deleteProductIsError, deleteProductIsSuccess]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    if (id) {
      deleteProduct(id);
    }
  };

  return (
    <div className="mx-auto mt-11 max-w-[1150px] p-5 text-[18px]">
      {lastPage > 0 && (
        <div className="mb-4">
          <Pagination handleChange={handleChange} page={page} totalPages={lastPage} />
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
        {showAlert && (
          <Alert
            variant="filled"
            severity={deleteProductIsError ? 'error' : 'success'}
            onClose={() => setShowAlert(false)}
          >
            {deleteProductMessage}
          </Alert>
        )}
        <Modal
          handleClose={handleClose}
          open={open}
          handleSubmit={handleDelete}
          handlePending={deleteProductIsPending}
          message="product"
        />
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

                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={`${product?.productImages && product?.productImages[0]?.url}`}
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
                  <div className=" h-20 overflow-hidden text-[1rem] capitalize  hover:text-[#c45500]">
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
              <div className="mt-4 flex justify-between space-x-3 lg:mt-6">
                <Link href={`/admin/products/${product._id}`}>
                  <a>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-bold text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Edit <EditIcon className=" ml-4" />
                    </button>
                  </a>
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg bg-red-700 py-2 px-4 text-center text-sm font-bold text-white hover:bg-red-800 focus:ring-4 focus:ring-blue-300"
                  onClick={() => {
                    setId(() => product._id);
                    handleOpen();
                  }}
                >
                  Delete <DeleteIcon style={{ fontSize: '19px', marginLeft: '1rem' }} />
                </button>
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
  handleProductSearchTerm,
  handleSelectedCategory,
  handleUpdatePageNumber,
  deleteProduct,
  restDeleteProduct,
  updateProductSortBy,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);
