import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { getProducts } from 'global-states/actions'
import { ReducerType } from 'global-states'
import { ProductType } from 'types'
import getConfig from 'next/config'
import { truncate, getRandomIntNumberBetween } from 'utils/functions/helpers'

import { Alert } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { PaginationComponent as Pagination } from 'components'

const { publicRuntimeConfig } = getConfig()

export function HomePageComponent(props: any) {
  const {
    list,
    listIsLoading,
    listIsSuccess,
    listIsError,
    listMessage,
    totalDocs,
    products,
  } = props.listState

  const [limit, setLimit] = useState<number | string>(100)
  const [page, setPage] = useState<number>(1)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<undefined | string>('createdAt')
  const [filterBy, setFilterBy] = useState<undefined | string>('all')
  const [sort, setSort] = useState<undefined | string>('asc')
  const [search, setSearch] = useState<undefined | string>('')

  useEffect(() => {
    let filteredUrl = `/products?page=${page}&limit=${limit}&sortBy=${sortBy}&OrderBy=${sort}&filterBy=role&role=${filterBy}`

    if (search) {
      filteredUrl = `/products?page=${page}&limit=${limit}&sortBy=${sortBy}&OrderBy=${sort}&filterBy=role&role=${filterBy}&search=${search}`
    }
    props.getProducts(filteredUrl)
  }, [page, limit, sortBy, filterBy, sort, search])

  const handleChange = (event: any, value: number) => {
    setPage(value)
  }

  return (
    <div className="text-[18px] max-w-[1150px] mx-auto mt-11 p-5">
      {totalDocs > 0 && (
      <div className="mb-4">
        <Pagination handleChange={handleChange} page={page} totalPages={totalDocs} />
      </div>
      )}
      <div>
        {!products.length && (
        <div className="container bg-white rounded  shadow-lg transform duration-200 easy-in-out m-12  w-full  font-bold">
          {listIsLoading && (
          <div className=" flex items-center justify-center ">
            <CircularProgress color="secondary" />
          </div>
          )}
          {!listIsError && !listIsLoading && <p className="p-4"> No User found</p>}
          {listIsError && (
          <Alert variant="filled" severity={'error'}>
            {listMessage}
          </Alert>
          )}
        </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 && products.map((product: ProductType, index: number) => (
          <Link href={`/products/${product.id}`}>
            <div
              key={product._id}
              className="cursor-pointer mb-7 p-4 border border-[#ddd] flex flex-col  space-y-4  shadow-lg rounded-[4px]"
            >
              <div className="flex justify-end text-[#007185] -mt-[10px]  text-base capitalize ">
                {product.category}
              </div>
              <div className="overflow-hidden">
                <img
                  className="object-contain h-[200px] w-[200px] mx-auto"
                  src={`${publicRuntimeConfig.CONSOLE_BACKEND_IMG_ENDPOIN}${product.productImage}`}
                  alt={product.name}
                />
              </div>
              <div className="text-[19px] text-[#007185] my-5  capitalize">
                <h2> {truncate(product.name, 30)}
                </h2>
              </div>
              <div>
                {Array(parseInt(product.rating, 10) || 4).fill()
                  .map(() => <span className="font-bold  text-[#f6991e]" key={uuidv4()}>✶</span>)} <span className="text-[#007185] text-base font-semibold">{'  '}{getRandomIntNumberBetween(1000, 7000)}</span>
              </div>
              <div className=" text-[1rem] hover:text-[#c45500] capitalize h-20  overflow-hidden">
                {truncate(product.description, 119)}
              </div>
              <div className="text-base flex item-center ">
                <span className=" font-bold ">$ {product.price} </span>
                {!(index % 2) && <span className="text-[#007185] font-semibold pl-2">Save 5%</span>}</div>
              <div className=" text-[#c45500] text-[1rem] capitalize">
                {product.stock ? product.stock : 'In Stock - order soon.'}
              </div>
              <div className="flex items-center justify-between space-x-4 ">
                <Link href={`/products/${product.id}`}>
                  <button id="custom-button" className=" duration-200 focus:outline-none focus:shadow-outline font-medium h-12  inline-flex items-center justify-center px-6  tracking-wide transition w-full ">Details</button>
                </Link>
                <button id="custom-button" className=" duration-200 focus:outline-none focus:shadow-outline font-medium h-12  inline-flex items-center justify-center px-6  tracking-wide transition w-full ">Add to Cart</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state: ReducerType) => ({
  listState: state.products,
})

const mapDispatchToProps = {
  getProducts,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePageComponent)
