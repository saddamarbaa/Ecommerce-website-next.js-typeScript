import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

import { defaultValues } from '@/constants';
import {
  getIndividualProduct,
  ReducerType,
  restGetIndividualProduct,
  restUpdateProduct,
  updateProduct,
} from '@/global-states';
import { _productPrototypeReducerState as ReducerState, ProductType } from '@/types';
import { addProductSchemaValidation } from '@/utils';

// props passed in to the component
interface OwnProps {
  productId: string | string[] | undefined;
}

// props from connect mapDispatchToProps
interface MapDispatchProps {
  getIndividualProduct: (productId: string | string[]) => void;
  restGetIndividualProduct: () => void;
  updateProduct: (finalData: any, productId: string | string[]) => void;
  restUpdateProduct: () => void;
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
  updateProduct,
  restUpdateProduct,
}: PropsType) {
  const {
    individualProduct,
    getIndividualProductIsPending,
    getIndividualProductIsError,
    getIndividualProductIsMessage,
    getIndividualProductIsSuccess,
    // updatedProduct,
    updateProductIsPending,
    updateProductIsSuccess,
    updateProductIsError,
    updateProductMessage,
  } = listState;

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductType>({
    defaultValues,
    resolver: yupResolver(addProductSchemaValidation),
  });

  useEffect(() => {
    restGetIndividualProduct();
    restUpdateProduct();
  }, []);

  useEffect(() => {
    if (productId) {
      getIndividualProduct(productId);
    }
  }, [productId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (updateProductIsSuccess) {
        setShowAlert(() => false);
        restGetIndividualProduct();
        restUpdateProduct();
        router.push('/admin/products');
        // router.back();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [productId, updateProductIsSuccess]);

  useEffect(() => {
    if (
      getIndividualProductIsSuccess &&
      individualProduct &&
      individualProduct.stock &&
      individualProduct.count
    ) {
      reset({
        name: individualProduct.name,
        price: individualProduct.price,
        description: individualProduct.description,
        category: individualProduct.category,
        stock: individualProduct.stock,
        count: individualProduct.count,
      });
    }

    if (updateProductIsSuccess || updateProductIsError || getIndividualProductIsError) {
      setShowAlert(() => true);
    }
  }, [
    getIndividualProductIsSuccess,
    productId,
    updateProductIsSuccess,
    updateProductIsError,
    getIndividualProductIsError,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (updateProductIsSuccess || updateProductIsError) {
        setShowAlert(() => false);
        restGetIndividualProduct();
        restUpdateProduct();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [updateProductIsSuccess, updateProductIsError]);

  const onSubmit = (data: ProductType) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('productImage', data.productImage[0]);
    formData.append('category', data.category);

    if (data.count) {
      formData.append('count', data.count as string);
    }

    if (data.stock) {
      formData.append('stock', data.stock);
    }

    if (productId) {
      updateProduct(formData, productId);
    }
  };

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className="md:min-w[32rem] mx-auto  w-[90%] md:max-w-[35rem]">
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
            <Alert variant="filled" severity="error">
              {getIndividualProductIsMessage}
            </Alert>
          </div>
        )}
        {!getIndividualProductIsError &&
          showAlert &&
          (updateProductIsSuccess || updateProductIsError) && (
            <div
              className="mt-[2rem] w-full  rounded-[6px]"
              style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
            >
              <Alert
                variant="filled"
                severity={getIndividualProductIsError || updateProductIsError ? 'error' : 'success'}
                onClose={() => setShowAlert(false)}
              >
                {updateProductMessage}
              </Alert>
            </div>
          )}

        {getIndividualProductIsSuccess && (
          <div
            className=" mt-[2rem] min-h-[10rem] w-full  rounded-[6px] pb-[2rem]"
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="title border-[#dadde1 border-b p-[0.7rem] text-center">
              <h1 className="text-[1.1rem] font-bold text-[#1c1e21] md:text-[1.5rem]">
                Edit product with ID <span className="text-blue-500">{productId}</span>
              </h1>
            </div>
            <div className="min-h-[10rem] w-full rounded-[6px] p-5  py-[2rem]">
              <section>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                  <div className="control">
                    {!errors.name && <label htmlFor="name">Title</label>}
                    {errors.name && <p className="error">{errors.name?.message} </p>}
                    <input
                      type="text"
                      id="name"
                      className={` ${errors.name ? 'is-invalid' : 'input custom-input'}`}
                      {...register('name')}
                    />
                  </div>
                  <div className="control">
                    {!errors.productImage && (
                      <label
                        htmlFor="productImage"
                        className={` ${errors.productImage ? 'is-invalid' : 'custom-input'}`}
                      >
                        Image URL
                      </label>
                    )}
                    <p className="error">{errors.productImage?.message} </p>
                    <label
                      id={`${errors.productImage ? 'is-invalid' : 'filePicker-label'}`}
                      htmlFor="filePicker"
                    >
                      <AttachFileIcon
                        style={{
                          fontSize: '1.3rem',
                          marginRight: '8px',
                          cursor: 'pointer',
                        }}
                      />
                    </label>
                    <input
                      id="filePicker"
                      style={{ visibility: 'hidden', display: 'none' }}
                      type="file"
                      {...register('productImage')}
                    />
                  </div>
                  <div className="control ">
                    {!errors.price && <label htmlFor="price">Price</label>}
                    <p className="error">{errors.price?.message} </p>
                    <input
                      type="text"
                      id="price"
                      className={` ${errors.price ? 'is-invalid' : 'custom-input'}`}
                      {...register('price')}
                    />
                  </div>
                  <div className="control ">
                    {!errors.count && <label htmlFor="count">Total Count</label>}
                    <p className="error">{errors.count?.message} </p>
                    <input
                      type="text"
                      id="count"
                      className={` ${errors.count ? 'is-invalid' : 'custom-input'}`}
                      {...register('count')}
                    />
                  </div>
                  <div className="control">
                    {errors.category && <p className="error">{errors.category.message}</p>}
                    {!errors.category && (
                      <label
                        htmlFor="category"
                        className={` ${errors.productImage ? 'is-invalid' : 'custom-input'}`}
                      >
                        Category
                      </label>
                    )}
                    <div className="month-container select">
                      <select
                        className={` ${errors.category ? 'select is-invalid' : 'select'}`}
                        {...register('category')}
                      >
                        <option value="All Products">All Products</option>
                        <option value="Sports">Sports</option>
                        <option value="Football">Football</option>
                        <option value="Books">Books</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Personal Computers">Computers</option>
                        <option value="Women's clothing">Women&apos;s clothing</option>
                        <option value="Women's Shoes">Women&apos;s Shoes</option>
                        <option value="Jewelery">Jewelery</option>
                        <option value="Men's clothing">Men&apos;s clothing</option>
                        <option value="Men's Shoes">Men&apos;s Shoes</option>
                        <option value="Toys">Toys</option>
                      </select>
                    </div>
                  </div>
                  <div className="control">
                    {!errors.stock && <label htmlFor="stock">Stock Info</label>}
                    {errors.stock && <p className="error">{errors.stock?.message} </p>}
                    <input
                      type="text"
                      id="stock"
                      className={` ${errors.stock ? 'is-invalid' : 'input custom-input'}`}
                      {...register('stock')}
                    />
                  </div>
                  <div className="control">
                    {!errors.description && <label htmlFor="description">Description</label>}
                    <p className="error">{errors.description?.message} </p>
                    <textarea
                      className={`outline-none hover:outline-none ${
                        errors.description ? 'is-invalid' : 'custom-input'
                      }`}
                      id="description"
                      rows={4}
                      cols={50}
                      {...register('description')}
                    />
                  </div>
                  <div className="mt-[-2rem] flex  flex-col justify-between lg:flex-row lg:items-center lg:justify-between  lg:space-x-5 ">
                    <div>
                      <button
                        disabled={updateProductIsPending}
                        type="submit"
                        className=" mx-auto mt-[1.5rem] block h-[2.7rem]    w-full  min-w-[150px] rounded-[4px]  border border-[#42b72a] bg-[#42b72a] py-[8px] px-[16px] text-[1rem]  font-bold text-white transition duration-150 hover:border-[#256818]  hover:bg-[#256818]"
                      >
                        Update
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className=" rest-btn mx-auto block h-[2.7rem]    w-full  min-w-[150px]   rounded-[4px] border py-[8px] px-[16px] text-[1rem] font-bold transition duration-150"
                        onClick={() => reset()}
                      >
                        Reset?
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state: ReducerType) => ({
  listState: state.products,
});

const mapDispatchToProps = {
  restGetIndividualProduct,
  getIndividualProduct,
  updateProduct,
  restUpdateProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPageComponent);
