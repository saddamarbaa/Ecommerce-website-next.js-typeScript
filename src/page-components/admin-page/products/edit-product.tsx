import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

import { defaultValues, productCategory } from '@/constants';
import {
  getIndividualProduct,
  ReducerType,
  restGetIndividualProduct,
  restUpdateProduct,
  updateProduct,
} from '@/global-states';
import { _productPrototypeReducerState as ReducerState, ProductType } from '@/types';
import { updateProductSchemaValidation } from '@/utils';

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
  const [files, setFiles] = useState<any>([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductType>({
    defaultValues,
    resolver: yupResolver(updateProductSchemaValidation),
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
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [productId, updateProductIsSuccess]);

  useEffect(() => {
    if (getIndividualProductIsSuccess && individualProduct && individualProduct.stock) {
      reset({
        name: individualProduct.name,
        price: individualProduct.price,
        description: individualProduct.description,
        category: individualProduct.category,
        stock: individualProduct.stock,
        brand: individualProduct.brand,
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
    // formData.append('productImage', data.productImage[0]);
    formData.append('category', data.category);
    if (data.brand) formData.append('brand', data.brand);

    if (data.stock) formData.append('stock', data.stock);

    // eslint-disable-next-line array-callback-return
    files.map((file: { file: string | Blob }) => {
      formData.append('productImages', file.file);
    });

    if (productId) updateProduct(formData, productId);
  };

  const TransformFileData = (file: Blob) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFiles((prev: any) => [...prev, { file, img: reader.result }]);
      };
    }
  };

  const handleUploadFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      const file = event?.target?.files && event?.target?.files[0];
      TransformFileData(file);
    }
  };

  const removeFileHandler = (img: any) => {
    setFiles(() => {
      const v = files.filter((value: any) => value.img !== img);
      return [...v];
    });
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
        {showAlert && (updateProductIsSuccess || updateProductIsError) && (
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
            <div className="min-h-[10rem] w-full rounded-[6px] p-5 py-[2rem]  pb-0">
              <section>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                  <div className="control">
                    {!errors.name && <label htmlFor="name">Name</label>}
                    {errors.name && <p className="error">{errors.name?.message} </p>}
                    <input
                      type="text"
                      id="name"
                      className={` ${errors.name ? 'is-invalid' : 'input custom-input'}`}
                      {...register('name')}
                    />
                  </div>
                  <div className="control">
                    {!errors.brand && <label htmlFor="name">Brand</label>}
                    {errors.brand && <p className="error">{errors.brand?.message} </p>}

                    <input
                      type="text"
                      id="brand"
                      className={` ${errors.brand ? 'is-invalid' : 'input custom-input'}`}
                      {...register('brand')}
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
                      className="form-control"
                      onChange={handleUploadFileHandler}
                      id="filePicker"
                      style={{ visibility: 'hidden', display: 'none' }}
                      type="file"
                      accept="image/*"
                      name="image"
                      multiple
                    />
                    <div className=" flex  flex-wrap space-y-2 space-x-2">
                      {files.length > 0 &&
                        files?.map((e: any) => (
                          <div className="shadow-none transition-shadow duration-300 ease-in-out hover:shadow-sm ">
                            <img
                              className="h-36 w-36 rounded object-contain"
                              src={e.img}
                              alt="error!"
                            />
                            <div className="mt-1 text-center">
                              <DeleteIcon
                                style={{
                                  fontSize: '20px',
                                  color: 'red',
                                  margin: 'auto',
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  removeFileHandler(e.img);
                                }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
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
                        {productCategory.map((item: any) => (
                          <option value={item.value}>{item.label}</option>
                        ))}
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
                  <div className="mt-[-2rem] flex  flex-col justify-between lg:flex-row lg:items-center lg:justify-around  lg:space-x-5 ">
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
