import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';

import { addOrders, ReducerType, restAddOrders } from '@/global-states';
import { _productPrototypeReducerState as ReducerProductState } from '@/types';

interface MapDispatchProps {
  restAddOrders: () => void;
  addOrders: (data: any) => void;
}

interface MapStateProps {
  listState: ReducerProductState;
}

type PropsType = MapDispatchProps & MapStateProps;

export function CheckoutSuccessPageComponent({
  listState,
  // authState,
  restAddOrders,
  addOrders,
}: PropsType) {
  const {
    // cart,
    addOrderIsSuccess,
    addOrderIsError,
    addOrderMessage,
  } = listState;

  const router = useRouter();

  useEffect(() => {
    const data = {
      paymentInfo: 'stripe',
      orderStatus: 'pending',
      textAmount: 10,
      shippingAmount: 10,
      shippingInfo: {
        address: '2636 test address',
        phoneNo: '+087666554488843322',
        zipCode: 'codej',
        status: 'done',
        country: 'test country ',
        street: 'test street',
        city: 'test city',
      },
      // orderItems: cart.map(({ product, quantity }) => ({
      //   product: product?._id,
      //   quantity,
      // })),
    };
    addOrders(data);
  }, []);

  useEffect(() => {
    if (addOrderIsSuccess) {
      restAddOrders();
      router.push('/order');
    }
  }, [addOrderIsSuccess]);

  return (
    <div className="mx-auto mt-32   max-w-[1150px]  text-[18px] shadow-md">
      <Alert variant="filled" severity={addOrderIsError ? 'error' : 'success'}>
        {addOrderMessage}
      </Alert>
      <div className="w-3/4 bg-white  p-16 text-center text-2xl font-semibold text-[#f08804]">
        Payment checkout success
      </div>
    </div>
  );
}

const mapStateToProps = (state: ReducerType) => ({
  authState: state.auth,
  listState: state.products,
});

const mapDispatchToProps = {
  restAddOrders,
  addOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutSuccessPageComponent);
