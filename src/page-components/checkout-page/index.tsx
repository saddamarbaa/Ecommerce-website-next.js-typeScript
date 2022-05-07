import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import getConfig from 'next/config';
import Link from 'next/link';

import { ModalComponent as Modal } from '@/components';
import {
  addProductToCart,
  clearCart,
  deleteItemFromCart,
  getCart,
  ReducerType,
  restDeleteItemFromCart,
} from '@/global-states';
import {
  _authPrototypeReducerState as ReducerState,
  _productPrototypeReducerState as ReducerProductState,
  CartItemsTpe,
} from '@/types';
import { truncate } from '@/utils';

interface MapDispatchProps {
  getCart: () => void;
  restDeleteItemFromCart: () => void;
  deleteItemFromCart: (payload: string) => void;
  addProductToCart: (payload: string, doDecrease?: boolean) => void;
  clearCart: () => void;
}

interface MapStateProps {
  authState: ReducerState;
  listState: ReducerProductState;
}

type PropsType = MapDispatchProps & MapStateProps;

function CheckoutPageComponent({
  addProductToCart,
  deleteItemFromCart,
  getCart,
  restDeleteItemFromCart,
  listState,
  clearCart,
  authState,
}: PropsType) {
  const {
    cart,
    // getCartIsPending,
    // getCartIsSuccess,
    // getCartIsError,
    // getCartMessage,
    deleteItemFromCartIsSuccess,
    AddToCartIsSuccess,
    clearCartIsSuccess,
    clearCartIsLoading,
  } = listState;

  const { loginUser } = authState;
  const { publicRuntimeConfig } = getConfig();
  const [open, setOpen] = useState<boolean>(false);

  const getTotalItems = () =>
    cart.reduce(
      (accumulator, currentValue: CartItemsTpe) => accumulator + currentValue.quantity,
      0
    );

  const getTotalPrice = () =>
    cart.reduce(
      (accumulator, currentValue: CartItemsTpe) =>
        accumulator + currentValue.productId.price * currentValue.quantity,
      0
    );

  useEffect(() => {
    restDeleteItemFromCart();
    getCart();
  }, [AddToCartIsSuccess, clearCartIsSuccess, deleteItemFromCartIsSuccess]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    clearCart();
    setOpen(() => false);
  };

  return (
    <div>
      <Modal
        handleClose={handleClose}
        open={open}
        handleSubmit={handleDelete}
        handlePending={clearCartIsLoading}
        message="cart (all the cart will be cleared)"
      />
      <div>
        <div className="container mx-auto mt-10">
          {cart.length > 0 && (
            <div className="my-10 flex shadow-md">
              <div className="w-3/4 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                  <h2 className="text-2xl font-semibold">3 Items</h2>
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
                {cart.map((product: CartItemsTpe) => (
                  <div className="-mx-8 flex px-6 py-5  hover:bg-gray-100">
                    <div className="flex w-2/5">
                      <div>
                        <img
                          className="mx-auto h-[105px] w-[150px] overflow-hidden rounded-md"
                          src={`${publicRuntimeConfig.CONSOLE_BACKEND_IMG_ENDPOIN}${product.productId.productImage}`}
                          alt={product.productId.name}
                        />
                      </div>
                      <div className="ml-4 flex flex-grow flex-col space-y-3">
                        <span className="font-bold  capitalize text-[#007185]">
                          {truncate(product.productId.name, 25)}
                        </span>
                        <span className=" text-red-500">{product.productId.category}</span>
                        <span
                          id="custom-button"
                          className="max-w-fit cursor-pointer rounded-md px-3  py-2"
                          onClick={() => {
                            if (product.productId._id) {
                              deleteItemFromCart(product.productId._id);
                            }
                          }}
                        >
                          Remove From Basket
                        </span>
                      </div>
                    </div>
                    <div className="flex w-1/5 justify-center space-x-4">
                      <span
                        onClick={() => {
                          if (product.productId._id) {
                            addProductToCart(product.productId._id, true);
                          }
                        }}
                        className="cursor-pointer text-[1.7rem] font-bold"
                      >
                        -
                      </span>
                      <span className="pt-3 text-sm font-semibold">{product.quantity}</span>
                      <span
                        onClick={() => {
                          if (product.productId._id) {
                            addProductToCart(product.productId._id);
                          }
                        }}
                        className="cursor-pointer text-[1.7rem]  font-bold"
                      >
                        +
                      </span>
                    </div>
                    <span className="w-1/5 pt-4 text-center text-sm font-semibold">
                      {' '}
                      ${product.productId.price}
                    </span>
                    <span className="w-1/5 pt-4 text-center text-sm font-semibold">
                      {' '}
                      <NumberFormat
                        value={product.quantity * product.productId.price}
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
                    <svg className="mr-2 w-4 fill-current text-indigo-600" viewBox="0 0 448 512">
                      <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                    </svg>
                    Continue Shopping
                  </a>
                </Link>
              </div>

              <div id="summary" className="w-1/4 px-8 py-10">
                <h1 className="border-b pb-8 text-2xl font-semibold">Order Summary</h1>
                <div className="mt-10 mb-5 flex justify-between">
                  <span className="text-sm font-semibold uppercase">Items {getTotalItems()}</span>
                  <span className="text-sm font-semibold">
                    <NumberFormat
                      value={getTotalPrice()}
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
                <div className="py-10">
                  <label className="mb-3 inline-block text-sm font-semibold uppercase">
                    Promo Code
                  </label>
                  <input
                    type="text"
                    id="promo"
                    placeholder="Enter your code"
                    className="w-full p-2 text-sm"
                  />
                </div>
                <button
                  type="button"
                  className="bg-red-500 px-5 py-2 text-sm uppercase text-white hover:bg-red-600"
                >
                  Apply
                </button>
                <div className="mt-8 border-t">
                  <div className="flex justify-between py-6 text-sm font-semibold uppercase">
                    <span>Total cost</span>
                    <span>
                      <NumberFormat
                        value={getTotalPrice()}
                        displayType="text"
                        thousandSeparator
                        prefix="$"
                        decimalScale={2}
                      />
                    </span>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-indigo-500 py-3 text-sm font-semibold uppercase text-white hover:bg-indigo-600"
                  >
                    Checkout
                  </button>
                  <button
                    onClick={() => handleOpen()}
                    type="button"
                    id="custom-button"
                    className="mt-[2rem] inline-flex h-12 w-full items-center justify-center  px-6 text-[1.1rem] font-medium tracking-wide  transition duration-200 focus:shadow-outline  focus:outline-none"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="my-10 mt-24 flex shadow-md">
            {cart.length === 0 && (
              <div className="w-3/4 bg-white px-10 py-10 text-2xl font-semibold text-[#f08804]">
                Hello <span className="capitalize">{loginUser?.firstName}</span> your cart is empty
              </div>
            )}
          </div>
        </div>
      </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPageComponent);
