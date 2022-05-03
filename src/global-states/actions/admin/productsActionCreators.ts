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
