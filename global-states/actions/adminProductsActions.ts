import {
  ADD_PRODUCT_LOADING,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILER,
  ADD_PRODUCT_REST,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILER,
} from 'constants/actionTypes'

import { ProductType } from 'types'
import { apiRequests, getHostUrl } from 'utils'

export const getProducts = (payload: string) => async (dispatch: any) => {
  dispatch({ type: GET_PRODUCTS_LOADING })
  try {
    const response = await apiRequests({
      method: 'get',
      url: `${getHostUrl()}${payload}`,
    })
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response })
  } catch (error: any) {
    dispatch({
      type: GET_PRODUCTS_FAILER,
      payload: { error: error?.data?.message || error.statusText },
    })
  }
}

export const addProduct = (product: ProductType) => async (dispatch: any) => {
  dispatch({ type: ADD_PRODUCT_LOADING })
  try {
    const response = await apiRequests({
      method: 'post',
      url: `${getHostUrl()}/admin/products`,
      data: product,
    })
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: response })
  } catch (error: any) {
    dispatch({
      type: ADD_PRODUCT_FAILER,
      payload: { error: error?.data?.message || error.statusText },
    })
  }
}

export const restAddProduct = () => async (dispatch: any) => { dispatch({ type: ADD_PRODUCT_REST }) }
