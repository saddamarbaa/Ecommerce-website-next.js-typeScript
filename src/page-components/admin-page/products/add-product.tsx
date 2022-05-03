import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

import { addProduct, ReducerType, restAddProduct } from '@/global-states';
import { _productPrototypeReducerState as ReducerState, ProductType } from '@/types';
import { addProductSchemaValidation } from '@/utils';

// props from connect mapDispatchToProps
interface MapDispatchProps {
  addProduct: (finalData: any) => void;
  restAddProduct: () => void;
}

// props from connect mapStateToProps
interface MapStateProps {
  productsState: ReducerState;
}

type PropsType = MapDispatchProps & MapStateProps;

export function AddProductComponent({ addProduct, restAddProduct, productsState }: PropsType) {
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null);
  const [isHomePage, setIsHomePage] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const router = useRouter();
  const { addProductIsLoading, addProductIsSuccess, addProductIsError, addProductMessage } =
    productsState;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductType>({
    mode: 'onChange',
    resolver: yupResolver(addProductSchemaValidation),
  });

  useEffect(() => {
    setIsHomePage(() => false);
    restAddProduct();
  }, []);

  // Auto Scroll functionality
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // Auto Scroll functionality
    autoScrollToBottomRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (addProductIsSuccess) {
      reset();
      const timer = setTimeout(() => {
        setIsHomePage(() => true);
      }, 400);

      return () => clearTimeout(timer);
    }
    const redirectToHomePage = () => {
      if (isHomePage) {
        restAddProduct();
        setIsHomePage(() => false);
        router.push('/admin/products');
      }
    };
    redirectToHomePage();
  }, [isHomePage, addProductIsSuccess]);

  useEffect(() => {
    if (addProductIsSuccess || addProductIsError) {
      setShowAlert(() => true);
      const timer = setTimeout(() => {
        setIsHomePage(() => false);
        restAddProduct();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [addProductIsError, addProductIsSuccess]);

  if (isHomePage) {
    router.push('/admin/products');
  }

  const onSubmit = (data: ProductType) => {
    // console.log(JSON.stringify(data, null, 2));
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('productImage', data.productImage[0]);
    formData.append('category', data.category);
    if (data.count) {
      formData.append('count', data.count);
    }

    addProduct(formData);
  };

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className=" mx-auto w-[90%]  md:min-w-[30rem] md:max-w-[30rem]">
        <div
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {addProductIsLoading && (
            <div className=" flex items-center justify-center  ">
              <CircularProgress color="secondary" />
            </div>
          )}

          {showAlert && (addProductIsError || addProductIsSuccess) && (
            <div
              className="w-full rounded-[6px]"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Alert
                variant="filled"
                severity={addProductIsError ? 'error' : 'success'}
                onClose={() => restAddProduct()}
              >
                {addProductMessage}
              </Alert>
            </div>
          )}

          <div className="title border-[#dadde1 border-b p-[0.7rem] text-center">
            <h1 className="text-[#1c1e21]font-bold text-[1.1rem] md:text-[1.5rem]">
              Create a new product
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
                      onChange={(e) =>
                        setValue('category', e.target.value, { shouldValidate: true })
                      }
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
                      type="submit"
                      className=" mx-auto mt-[1.5rem] block h-[2.7rem]    w-full  min-w-[150px] rounded-[4px]  border border-[#42b72a] bg-[#42b72a] py-[8px] px-[16px] text-[1rem]  font-bold text-white transition duration-150 hover:border-[#256818]  hover:bg-[#256818]"
                    >
                      Add Product
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
      </div>
    </div>
  );
}

const mapStateToProps = (state: ReducerType) => ({
  productsState: state.products,
});

const mapDispatchToProps = {
  addProduct,
  restAddProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductComponent);
