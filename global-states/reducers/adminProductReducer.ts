import { AnyAction } from 'redux'
import { _productPrototypeReducerState as ReducerState } from 'types'

import {
  ADD_PRODUCT_LOADING,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILER,
  ADD_PRODUCT_REST,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILER,
  GET_PRODUCTS_REST,
} from 'constants/actionTypes'

const initialState: ReducerState = {
  product: {},
  addProductIsLoading: false,
  addProductIsSuccess: false,
  addProductIsError: false,
  addProductMessage: '',

  list: [],
  listIsLoading: false,
  listIsSuccess: false,
  listIsError: false,
  listMessage: '',
  totalDocs: 0,
  products: [],
}

export default function actionReducer(state = initialState, action: AnyAction) {
  switch (action?.type) {
    case ADD_PRODUCT_LOADING:
      return {
        ...state,
        product: {},
        addProductIsLoading: true,
        addProductIsSuccess: false,
        addProductIsError: false,
        addProductMessage: 'PENDING',
      }
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        addProductIsLoading: false,
        addProductIsSuccess: true,
        addProductIsError: false,
        addProductMessage: action.payload.message || 'Success',
      }
    case ADD_PRODUCT_FAILER:
      return {
        ...state,
        product: {},
        addProductIsLoading: false,
        addProductIsSuccess: false,
        addProductIsError: true,
        addProductMessage: action.payload.message || action.payload.error || 'Error',
      }
    case ADD_PRODUCT_REST:
      return {
        ...state,
        product: {},
        addProductIsLoading: false,
        addProductIsSuccess: false,
        addProductIsError: false,
        addProductMessage: '',
      }

    case GET_PRODUCTS_LOADING:
      return {
        ...state,
        list: [],
        listIsLoading: true,
        listIsSuccess: false,
        listIsError: false,
        listMessage: 'PENDING',

      }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.data.products || [],
        totalDocs: action.payload.data.totalDocs || 0,
        list: action.payload || {},
        listIsLoading: false,
        listIsSuccess: true,
        listIsError: false,
        listMessage: action.payload.message || 'Success',
      }
    case GET_PRODUCTS_FAILER:
      return {
        ...state,
        listIsLoading: false,
        listIsSuccess: false,
        listIsError: true,
        listMessage: action.payload.message || action.payload.error || 'Error',
      }
    case GET_PRODUCTS_REST:
      return {
        ...state,
        list: [],
        listIsLoading: false,
        listIsSuccess: false,
        listIsError: false,
        listMessage: '',
        totalDocs: 0,
      }

    default:
      return state
  }
}
