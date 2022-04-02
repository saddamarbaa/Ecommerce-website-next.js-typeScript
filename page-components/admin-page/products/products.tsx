import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import getConfig from 'next/config'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import { ProductType } from 'types'
import { truncate } from 'utils/functions/helpers'
import { ModalComponent as Modal } from 'components'

const { publicRuntimeConfig } = getConfig()

interface Props {
  products: ProductType[];
}

export function AdminProductsPageComponent({ products }: Props) {
  const autoScrollToBottomRef = useRef<HTMLDivElement>(null)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [id, setId] = useState<string | undefined>()

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

  // eslint-disable-next-line no-shadow
  const handleOpen = (id: string) => {
    setId(() => id)
    setOpen(() => true)
  }
  const handleClose = () => setOpen(false)

  const handleDelete = (productId:string) => {
    if (productId) {
    // Api Call
    }
  }

  return (
    <div className="text-[18px] max-w-[1100px] mx-auto p-5 mt-11 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products &&
            products.map((product: any, index) => (
              <div
                key={index}
                className="cursor-pointer mb-7 p-4 border border-[#ddd] flex flex-col space-y-6 shadow-lg rounded-[4px]"
              >
                <div className=" overflow-hidden">
                  <img
                    src={`${publicRuntimeConfig.CONSOLE_BACKEND_IMG_ENDPOIN}${product.productImage}`}
                    alt={product.name}
                    className="object-contain h-[200px] w-[200px]"
                  />
                </div>

                <div className="text-[19px] text-[#007185] my-5 min-h-[3rem]">
                  <h2> {truncate(product.name, 30)}</h2>
                </div>

                <div className=" text-[1rem] hover:text-[#c45500] min-h-[100px]">
                  {truncate(product.description, 100)}
                </div>

                <div className="text-[19] font-bold text-center">$ {product.price}</div>
                <div className="flex mt-4 space-x-3 lg:mt-6 justify-between">
                  <Link href={`/admin/users/${product.id}`}>
                    <button
                      type="button"
                      className="inline-flex items-center py-2 px-4 text-sm font-bold text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Edit <EditIcon className=" ml-4" />
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="inline-flex items-center py-2 px-4 text-sm font-bold text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-blue-300"
                    onClick={() => {
                      handleOpen(product.id)
                    }}
                  >
                    Delete <DeleteIcon style={{ fontSize: '19px', marginLeft: '1rem' }} />
                  </button>
                </div>
              </div>

            ))}
      </div>
    </div>
  )
}

export default AdminProductsPageComponent
