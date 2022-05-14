import { Dispatch } from 'redux';

import { ProductsActionType, ProductType } from '@/types';
import { apiRequests, getHostUrl } from '@/utils';

export const getProducts = (payload: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.GET_PRODUCTS_LOADING });
  try {
    const response = await apiRequests({
      method: 'get',
      url: `${getHostUrl()}${payload}`,
    });
    dispatch({
      type: ProductsActionType.GET_PRODUCTS_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: ProductsActionType.GET_PRODUCTS_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const addProduct = (product: ProductType) => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.ADD_PRODUCT_LOADING });
  try {
    const response = await apiRequests({
      method: 'post',
      url: `${getHostUrl()}/admin/products`,
      data: product,
    });
    dispatch({
      type: ProductsActionType.ADD_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: ProductsActionType.ADD_PRODUCT_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const restAddProduct = () => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.ADD_PRODUCT_REST });
};

export const deleteProduct = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.DELETE_PRODUCT_LOADING });
  try {
    const response = await apiRequests({
      method: 'delete',
      url: `${getHostUrl()}/admin/products/${id}`,
    });
    dispatch({ type: ProductsActionType.DELETE_PRODUCT_SUCCESS, payload: response });
  } catch (error: any) {
    dispatch({
      type: ProductsActionType.DELETE_PRODUCT_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const restDeleteProduct = () => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.DELETE_PRODUCT_REST });
};

export const updateProduct =
  (_product: ProductType, id: string | string[]) => async (dispatch: Dispatch) => {
    dispatch({ type: ProductsActionType.UPDATE_PRODUCT_LOADING });
    try {
      const response = await apiRequests({
        method: 'patch',
        url: `${getHostUrl()}/admin/products/${id}`,
        data: _product,
      });
      dispatch({ type: ProductsActionType.UPDATE_PRODUCT_SUCCESS, payload: response });
    } catch (error: any) {
      dispatch({
        type: ProductsActionType.UPDATE_PRODUCT_FAILED,
        payload: { error: error?.data?.message || error.statusText || error },
      });
    }
  };

export const restUpdateProduct = () => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.UPDATE_PRODUCT_REST });
};

export const getIndividualProduct = (id: string | string[]) => async (dispatch: any) => {
  dispatch({ type: ProductsActionType.GET_INDIVIDUAL_PRODUCT_LOADING });
  try {
    const response = await apiRequests({
      method: 'get',
      url: `${getHostUrl()}/products/${id}`,
    });
    dispatch({
      type: ProductsActionType.GET_INDIVIDUAL_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: ProductsActionType.GET_INDIVIDUAL_PRODUCT_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const restGetIndividualProduct = () => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.GET_INDIVIDUAL_PRODUCT_REST });
};

export const handleProductSearchTerm = (payload: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.PRODUCT_SEARCH_TERM, payload });
};

export const handleSelectedCategory = (payload: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.PRODUCT_CATEGORY, payload });
};

export const handleUpdatePageNumber = (payload: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.UPDATE_PAGE_NUMBER, payload });
};

export const updateProductSortBy = (payload: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.UPDATE_PRODUCT_SORTBY, payload });
};

export const addProductToCart = (id: string, decrease?: boolean) => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.ADD_PRODUCT_TO_CART_LOADING });

  try {
    const response = await apiRequests({
      method: 'post',
      url: `${getHostUrl()}/products/cart?decrease=${decrease || false}`,
      data: { productId: id },
    });
    dispatch({
      type: ProductsActionType.ADD_PRODUCT_TO_CART_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: ProductsActionType.ADD_PRODUCT_TO_CART_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const restAddProductToCart = () => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.ADD_PRODUCT_TO_CART_REST });
};

export const deleteItemFromCart = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.DELETE_ITEM_FROM_CART_LOADING });
  try {
    const response = await apiRequests({
      method: 'post',
      url: `${getHostUrl()}/products/cart-delete-item`,
      data: { productId: id },
    });
    dispatch({
      type: ProductsActionType.DELETE_ITEM_FROM_CART_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: ProductsActionType.DELETE_ITEM_FROM_CART_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const restDeleteItemFromCart = () => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.DELETE_ITEM_FROM_CART_REST });
};

export const getCart = () => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.GET_CART_LOADING });
  try {
    const response = await apiRequests({
      method: 'get',
      url: `${getHostUrl()}/products/cart`,
    });
    dispatch({
      type: ProductsActionType.GET_CART_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: ProductsActionType.GET_CART_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const restGetCart = () => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.GET_CART_REST });
};

export const clearCart = () => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.CLEAR_CART_LOADING });
  try {
    const response = await apiRequests({
      method: 'delete',
      url: `${getHostUrl()}/products/clear-cart`,
    });
    dispatch({
      type: ProductsActionType.CLEAR_CART_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: ProductsActionType.CLEAR_CART_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const getOrders = () => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.GET_ORDER_LOADING });
  try {
    const response = await apiRequests({
      method: 'get',
      url: `${getHostUrl()}/orders`,
    });
    dispatch({
      type: ProductsActionType.GET_ORDER_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: ProductsActionType.GET_ORDER_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const restGetOrders = () => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.GET_ORDER_REST });
};

export const addOrders = () => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.ADD_ORDER_LOADING });

  try {
    const response = await apiRequests({
      method: 'post',
      url: `${getHostUrl()}/orders`,
    });
    dispatch({
      type: ProductsActionType.ADD_ORDER_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: ProductsActionType.ADD_ORDER_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};

export const restAddOrders = () => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.ADD_ORDER_REST });
};

export const clearOrders = () => async (dispatch: Dispatch) => {
  dispatch({ type: ProductsActionType.CLEAR_ORDER_LOADING });
  try {
    const response = await apiRequests({
      method: 'delete',
      url: `${getHostUrl()}/orders/clear-orders`,
    });
    dispatch({
      type: ProductsActionType.CLEAR_ORDER_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: ProductsActionType.CLEAR_ORDER_FAILED,
      payload: { error: error?.data?.message || error.statusText || error },
    });
  }
};
