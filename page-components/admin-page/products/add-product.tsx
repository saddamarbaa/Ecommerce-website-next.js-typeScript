/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Alert } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import AttachFileIcon from '@mui/icons-material/AttachFile'

import { ProductType } from 'types'
import { addProduct, restAddProduct } from 'global-states/actions'
import { ReducerType } from 'global-states'
import { getCategories, addProductSchemaValidation } from 'utils'

export function AddProductComponent(props: any) {
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null)
  const [isHomePage, setIsHomePage] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const router = useRouter()

  const {
    addProductIsLoading, addProductIsSuccess, addProductIsError, addProductMessage,
  } = props.productsState

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductType>({
    mode: 'onChange',
    resolver: yupResolver(addProductSchemaValidation),
  })

  useEffect(() => {
    setIsHomePage(() => false)
    props.restAddProduct()
  }, [])

  // Auto Scroll functionality
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    // Auto Scroll functionality
    autoScrollToBottomRef?.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    if (addProductIsSuccess) {
      reset()
      const timer = setTimeout(() => {
        setIsHomePage(() => true)
      }, 400)

      return () => clearTimeout(timer)
    }
    const redirectToHomePage = () => {
      if (isHomePage) {
        props.restAddProduct()
        setIsHomePage(() => false)
        router.push('/')
      }
    }
    redirectToHomePage()
  }, [isHomePage, addProductIsSuccess])

  useEffect(() => {
    if (addProductIsSuccess || addProductIsError) {
      setShowAlert(() => true)
      const timer = setTimeout(() => {
        setIsHomePage(() => false)
        props.restAddProduct()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [addProductIsError, addProductIsSuccess])

  if (isHomePage) {
    router.push('/')
  }

  const onSubmit = (data: ProductType) => {
    // console.log(JSON.stringify(data, null, 2));
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('price', data.price)
    formData.append('description', data.description)
    formData.append('productImage', data.productImage[0])
    formData.append('category', data?.category!)
    formData.append('count', data?.count!)

    props.addProduct(formData)
  }

  return (
    <div className="flex items-center justify-center py-[3rem]  ">
      <div className=" mx-auto w-[90%]  md:max-w-[30rem] md:min-w-[30rem]">
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
                onClose={() => props.restAddProduct()}
              >
                {addProductMessage}
              </Alert>
            </div>
          )}

          <div className="title border-b border-[#dadde1 p-[0.7rem] text-center">
            <h1 className="text-[1.1rem] md:text-[1.5rem] text-[#1c1e21]font-bold">Create a new product</h1>
          </div>
          <div className="p-5 py-[2rem] w-full rounded-[6px]  min-h-[10rem]">
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
                    <label htmlFor="productImage" className={` ${errors.productImage ? 'is-invalid' : 'custom-input'}`}>
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
                    <label htmlFor="category" className={` ${errors.productImage ? 'is-invalid' : 'custom-input'}`}>
                      Category
                    </label>
                  )}

                  <div className="month-container select">
                    <select
                      className={` ${errors.category ? 'select is-invalid' : 'select'}`}
                      {...register('category')}
                      onChange={(e) => setValue('category', e.target.value, { shouldValidate: true })} // Using setValue
                    >
                      <option value="" disabled selected hidden>Please choose one category...</option>

                      {getCategories().map((item, i) => <option key={i} value={item}>{item}</option>)}
                    </select>
                  </div>
                </div>

                <div className="control">
                  {!errors.description && <label htmlFor="description">Description</label>}
                  <p className="error">{errors.description?.message} </p>

                  <textarea
                    className={`hover:outline-none outline-none ${errors.description ? 'is-invalid' : 'custom-input'}`}
                    id="description"
                    rows={4}
                    cols={50}
                    {...register('description')}
                  />
                </div>

                <div className="flex flex-col  justify-between lg:flex-row lg:justify-between lg:space-x-5 lg:items-center  mt-[-2rem] ">
                  <div>
                    <button className=" py-[8px] px-[16px] mx-auto block    rounded-[4px]  font-bold bg-[#42b72a]  transition duration-150 text-white text-[1rem] border border-[#42b72a]  hover:border-[#256818] hover:bg-[#256818] h-[2.7rem] w-full min-w-[150px]  mt-[1.5rem]">
                      Add Product
                    </button>
                  </div>

                  <div>
                    <button
                      className=" py-[8px] px-[16px] mx-auto block    rounded-[4px]  font-bold   transition duration-150 text-[1rem] border rest-btn h-[2.7rem] min-w-[150px] w-full"
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
  )
}

const mapStateToProps = (state: ReducerType) => ({
  productsState: state.products,
})

const mapDispatchToProps = {
  addProduct,
  restAddProduct,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProductComponent)
