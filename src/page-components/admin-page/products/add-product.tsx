import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

import { defaultValues, productCategory } from '@/constants';
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
  const [files, setFiles] = useState<any>([]);
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
    defaultValues,
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
    formData.append('category', data.category.toLocaleLowerCase());
    formData.append('brand', data.brand || '');

    if (data.stock) {
      formData.append('stock', data.stock);
    }

    formData.append('files', files);

    // eslint-disable-next-line array-callback-return
    files.map((file: { file: string | Blob }) => {
      formData.append('productImages', file.file);
    });
    addProduct(formData);
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
                      onChange={(e) =>
                        setValue('category', e.target.value, { shouldValidate: true })
                      }
                    >
                      {productCategory.map((item: any, index: number) => (
                        <option selected={index === 0} value={item.value}>
                          {item.label}
                        </option>
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
