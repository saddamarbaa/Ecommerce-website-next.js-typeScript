import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';

import { ModalComponent as Modal } from '@/components';
import {
  addProductToCart,
  clearCart,
  clearOrders,
  clearSingleOrder,
  deleteItemFromCart,
  getCart,
  getOrders,
  ReducerType,
  restDeleteItemFromCart,
  restGetOrders,
} from '@/global-states';
import {
  _authPrototypeReducerState as ReducerState,
  _productPrototypeReducerState as ReducerProductState,
  CartItemsTpe,
} from '@/types';
import { getHostUrl, truncate } from '@/utils';

interface MapDispatchProps {
  getCart: () => void;
  restDeleteItemFromCart: () => void;
  restGetOrders: () => void;
  getOrders: () => void;
  clearOrders: () => void;
  clearSingleOrder: (id: string) => void;
}

interface MapStateProps {
  authState: ReducerState;
  listState: ReducerProductState;
}

const { publicRuntimeConfig } = getConfig();
type PropsType = MapDispatchProps & MapStateProps;

function OrderPageComponent({
  getCart,
  restDeleteItemFromCart,
  listState,
  authState,
  getOrders,
  restGetOrders,
  clearOrders,
  clearSingleOrder,
}: PropsType) {
  const {
    deleteItemFromCartIsSuccess,
    AddToCartIsSuccess,
    clearCartIsSuccess,
    orders,
    clearOrderIsLoading,
    clearOrderIsSuccess,
    clearSingleIsSuccess,
  } = listState;

  const { loginUser } = authState;

  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const [toBeDeletedOrderedId, seToBeDeletedOrderedId] = useState('');
  const [isClearAllOrderers, setIsClearAllOrderers] = useState(false);
  const getTotalItems = (array: CartItemsTpe[]) =>
    array.reduce(
      (accumulator, currentValue: CartItemsTpe) => accumulator + currentValue.quantity,
      0
    );

  const getTotalPrice = (array: CartItemsTpe[]) =>
    array.reduce(
      (accumulator, currentValue: CartItemsTpe) =>
        accumulator + currentValue.product.price * currentValue.quantity,
      0
    );

  useEffect(() => {
    getCart();
    getOrders();

    return () => {
      restDeleteItemFromCart();
      restGetOrders();
    };
  }, [
    AddToCartIsSuccess,
    clearCartIsSuccess,
    deleteItemFromCartIsSuccess,
    clearOrderIsSuccess,
    clearSingleIsSuccess,
  ]);

  const handleOpen = (isClearAll = false) => {
    if (isClearAll) {
      setIsClearAllOrderers(true);
    } else {
      setIsClearAllOrderers(false);
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    if (isClearAllOrderers) {
      clearOrders();
    } else {
      clearSingleOrder(toBeDeletedOrderedId);
    }

    setOpen(() => false);
  };

  const downloadPDFHandler = (orderId: string) => {
    fetch(`${getHostUrl()}/orders/invoices/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('authToken'))}`,
      },
    })
      .then((response) =>
        response.blob().then((blob) => {
          if (response.ok) {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            const alink = document.createElement('a');
            alink.href = fileURL;
            alink.style.display = 'none';
            alink.download = 'SamplePDF.pdf';
            // Append to html link element page
            document.body.appendChild(alink);
            // Start download
            alink.click();
            // Clean up and remove the link
            alink?.parentNode?.removeChild(alink);
          } else {
            throw new Error('Filed to download PDF, please try again later');
          }
        })
      )
      .catch((error) => {
        alert(error?.message || 'Something went wrong , please try again later');
      });
  };

  return (
    <div className="pt-[2rem]">
      <Modal
        handleClose={handleClose}
        open={open}
        handleSubmit={handleDelete}
        handlePending={clearOrderIsLoading}
        message={message}
      />

      <div>
        {orders &&
          orders.length > 0 &&
          orders.map((order, index) => (
            <div className="container mx-auto mt-10">
              <div className="my-10 bg-white shadow-md ">
                {index === 0 && orders.length > 1 ? (
                  <div className="w-fit px-10">
                    <button
                      onClick={() => {
                        setMessage('list (all items in your order list will be cleared)');
                        handleOpen(true);
                      }}
                      type="button"
                      id="custom-button"
                      className="mt-[2rem] inline-flex h-12 w-full items-center justify-center  px-6 text-[1.1rem] font-medium tracking-wide  transition duration-200 focus:shadow-outline  focus:outline-none"
                    >
                      Clear all orders
                    </button>
                  </div>
                ) : null}
                <div className="flex ">
                  <div className="w-3/4 px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                      <h1 className="text-2xl font-semibold">
                        Order <span className="text-indigo-600"> {order._id}</span>
                      </h1>
                      <h2 className="text-2xl font-semibold">
                        {getTotalItems(order?.orderItems)} Items
                      </h2>
                    </div>
                    <div className="mt-10 mb-5 flex">
                      <h3 className="w-2/5 text-xs font-semibold uppercase text-gray-600">
                        Product Details
                      </h3>
                      <h3 className="w-1/5  text-center text-xs font-semibold uppercase text-gray-600">
                        Quantity
                      </h3>
                      <h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
                        Price
                      </h3>
                      <h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
                        Total
                      </h3>
                    </div>
                    {order?.orderItems?.map(({ product, quantity }: CartItemsTpe) => (
                      <div className="-mx-8 flex px-6 py-5  hover:bg-gray-100">
                        <div className="flex w-2/5">
                          <div>
                            <Image
                              src={`${publicRuntimeConfig.CONSOLE_BACKEND_IMG_ENDPOIN}${product.productImage}`}
                              alt={product.name}
                              objectFit="contain"
                              className="mx-auto h-[105px] w-[150px] overflow-hidden rounded-md"
                              width={150}
                              height={105}
                            />
                          </div>
                          <div className="ml-4 flex flex-grow flex-col space-y-3">
                            <span className="font-bold  capitalize text-[#007185]">
                              {truncate(product.name, 25)}
                            </span>
                            <span className=" text-red-500">{product.category}</span>
                          </div>
                        </div>
                        <div className="flex w-1/5 justify-center space-x-4">
                          <span className="pt-3 text-sm font-semibold">{quantity}</span>
                        </div>
                        <span className="w-1/5 pt-4 text-center text-sm font-semibold">
                          {' '}
                          ${product.price}
                        </span>
                        <span className="w-1/5 pt-4 text-center text-sm font-semibold">
                          {' '}
                          <NumberFormat
                            value={quantity * product.price}
                            displayType="text"
                            thousandSeparator
                            prefix="$"
                            decimalScale={2}
                          />
                        </span>
                      </div>
                    ))}
                    <Link href="/">
                      <a className="mt-10 flex text-sm font-semibold text-indigo-600">
                        <svg
                          className="mr-2 w-4 fill-current text-indigo-600"
                          viewBox="0 0 448 512"
                        >
                          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                        </svg>
                        Continue Shopping
                      </a>
                    </Link>
                  </div>

                  <div id="summary" className="w-1/4 px-8 py-10">
                    <h1 className="border-b pb-8 text-2xl font-semibold">Summary</h1>
                    <div className="mt-10 mb-5 flex justify-between">
                      <span className="text-sm font-semibold uppercase">
                        Items {getTotalItems(order?.orderItems)}
                      </span>
                      <span className="text-sm font-semibold">
                        <NumberFormat
                          value={getTotalPrice(order?.orderItems)}
                          displayType="text"
                          thousandSeparator
                          prefix="$"
                          decimalScale={2}
                        />
                      </span>
                    </div>
                    <div>
                      <label className="mb-3 inline-block text-sm font-medium uppercase">
                        Shipping
                      </label>
                      <select className="block w-full p-2 text-sm text-gray-600">
                        <option>Standard shipping - $10.00</option>
                      </select>
                    </div>
                    <div className="mt-8 border-t">
                      <div className="flex justify-between py-6 text-sm font-semibold uppercase">
                        <span>Total cost</span>
                        <span>
                          <NumberFormat
                            value={getTotalPrice(order?.orderItems)}
                            displayType="text"
                            thousandSeparator
                            prefix="$"
                            decimalScale={2}
                          />
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setMessage('order (it will be removed from  your order list)');
                          seToBeDeletedOrderedId(order._id);
                          handleOpen();
                        }}
                        type="button"
                        id="custom-button"
                        className="mt-[2rem] inline-flex h-12 w-full items-center justify-center  px-6 text-[1.1rem] font-medium tracking-wide  transition duration-200 focus:shadow-outline  focus:outline-none"
                      >
                        Clear this order from list
                      </button>
                      <button
                        type="button"
                        className="mt-6 w-full bg-indigo-500 py-3 text-sm font-semibold uppercase text-white hover:bg-indigo-600"
                        onClick={() => {
                          if (order?._id) {
                            downloadPDFHandler(order._id);
                          }
                        }}
                      >
                        Download Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {!orders.length ? (
        <div className="mx-auto mt-28  flex max-w-[1150px] p-5 text-[18px] shadow-md">
          <div className="w-3/4 bg-white p-12 text-center text-2xl font-semibold text-[#f08804]">
            Hello <span className="capitalize">{loginUser?.name}</span> your order list is empty
          </div>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state: ReducerType) => ({
  authState: state.auth,
  listState: state.products,
});

const mapDispatchToProps = {
  addProductToCart,
  deleteItemFromCart,
  getCart,
  restDeleteItemFromCart,
  clearCart,
  getOrders,
  restGetOrders,
  clearOrders,
  clearSingleOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPageComponent);
