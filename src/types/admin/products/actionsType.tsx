// REDUX ACTION TYPES

import { Action } from 'redux';

import {
  CartIResponseType,
  ProductResponseType,
  ProductsResponseType,
  ProductType,
} from './_prototype';

export enum ProductsActionType {
  ADD_PRODUCT_LOADING = 'ADD_PRODUCT_LOADING',
  ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS',
  ADD_PRODUCT_FAILED = 'ADD_PRODUCT_FAILED',
  ADD_PRODUCT_REST = 'ADD_PRODUCT_REST',
  GET_PRODUCTS_LOADING = 'GET_PRODUCTS_LOADING',
  GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED',
  GET_PRODUCTS_REST = 'GET_PRODUCTS_REST',
  DELETE_PRODUCT_LOADING = 'DELETE_PRODUCT_LOADING',
  DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_FAILED = 'DELETE_PRODUCT_FAILED',
  DELETE_PRODUCT_REST = 'DELETE_PRODUCT_REST',
  PRODUCT_SEARCH_TERM = 'PRODUCT_SEARCH_TERM',
  PRODUCT_CATEGORY = 'PRODUCT_CATEGORY',
  UPDATE_PAGE_NUMBER = 'UPDATE_PAGE_NUMBER',
  UPDATE_PRODUCT_ORDERBY = 'UPDATE_PRODUCT_ORDERBY',
  UPDATE_PRODUCT_SORTBY = 'UPDATE_PRODUCT_SORTBY',
  GET_INDIVIDUAL_PRODUCT_LOADING = 'GET_INDIVIDUAL_PRODUCT_LOADING',
  GET_INDIVIDUAL_PRODUCT_SUCCESS = 'GET_INDIVIDUAL_PRODUCT_SUCCESS',
  GET_INDIVIDUAL_PRODUCT_FAILED = 'GET_INDIVIDUAL_PRODUCT_FAILED',
  GET_INDIVIDUAL_PRODUCT_REST = 'GET_INDIVIDUAL_PRODUCT_REST',
  UPDATE_PRODUCT_LOADING = 'UPDATE_PRODUCT_LOADING',
  UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS',
  UPDATE_PRODUCT_FAILED = 'UPDATE_PRODUCT_FAILED',
  UPDATE_PRODUCT_REST = 'UPDATE_PRODUCT_REST',
  HYDRATE = 'HYDRATE',
  ADD_PRODUCT_TO_CART_LOADING = 'ADD_PRODUCT_TO_CART_LOADING ',
  ADD_PRODUCT_TO_CART_SUCCESS = 'ADD_PRODUCT_TO_CART_SUCCESS',
  ADD_PRODUCT_TO_CART_FAILED = 'ADD_PRODUCT_TO_CART_FAILED',
  ADD_PRODUCT_TO_CART_REST = 'ADD_PRODUCT_TO_CART_REST',

  GET_CART_LOADING = 'GET_CART_LOADING',
  GET_CART_SUCCESS = 'GET_CART_SUCCESS',
  GET_CART_FAILED = 'GET_CART_FAILED',
  GET_CART_REST = 'GET_CART_REST',

  DELETE_ITEM_FROM_CART_LOADING = 'DELETE_ITEM_FROM_CART_LOADING ',
  DELETE_ITEM_FROM_CART_SUCCESS = 'DELETE_ITEM_FROM_CART_SUCCESS',
  DELETE_ITEM_FROM_CART_FAILED = 'DELETE_ITEM_FROM_CART_FAILED',
  DELETE_ITEM_FROM_CART_REST = 'DELETE_ITEM_FROM_CART_REST',

  CLEAR_CART_LOADING = 'GET_CART_LOADING',
  CLEAR_CART_SUCCESS = 'GET_CART_SUCCESS',
  CLEAR_CART_FAILED = 'GET_CART_FAILED',
  CLEAR_CART_REST = 'GET_CART_REST',

  ADD_ORDER_LOADING = 'ADD_ORDER_LOADING',
  ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS',
  ADD_ORDER_FAILED = 'ADD_ORDER_FAILED',
  ADD_ORDER_REST = 'ADD_ORDER_REST',
  GET_ORDER_LOADING = 'GET_ORDER_LOADING',
  GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS',
  GET_ORDER_FAILED = 'GET_ORDER_FAILED',
  GET_ORDER_REST = 'GET_ORDER_REST',

  CLEAR_ORDER_LOADING = 'CLEAR_ORDER_LOADING',
  CLEAR_ORDER_SUCCESS = 'CLEAR_ORDER_SUCCESS',
  CLEAR_ORDER_FAILED = 'CLEAR_ORDER_FAILED',
  CLEAR_ORDER_REST = 'CLEAR_ORDER_REST',
}

export interface actionAddProductIsPending extends Action {
  type: ProductsActionType.ADD_PRODUCT_LOADING;
}

export interface actionAddProductIsSuccess extends Action {
  type: ProductsActionType.ADD_PRODUCT_SUCCESS;
  payload: {
    data: ProductType;
    message: string;
  };
}

export interface actionAddProductIsError extends Action {
  type: ProductsActionType.ADD_PRODUCT_FAILED;
  payload: {
    data: ProductType;
    message: string;
    error: string;
  };
}

export interface actionAddProductRest extends Action {
  type: ProductsActionType.ADD_PRODUCT_REST;
}

export interface actionGetProductIsPending extends Action {
  type: ProductsActionType.GET_PRODUCTS_LOADING;
}

export interface actionGetProductIsSuccess extends Action {
  type: ProductsActionType.GET_PRODUCTS_SUCCESS;
  payload: ProductsResponseType;
}

export interface actionGetProductIsError extends Action {
  type: ProductsActionType.GET_PRODUCTS_FAILED;
  payload: ProductsResponseType;
}

export interface actionGetProductRest extends Action {
  type: ProductsActionType.GET_PRODUCTS_REST;
}

export interface actionProductSearchTerm extends Action {
  type: ProductsActionType.PRODUCT_SEARCH_TERM;
  payload: string;
}

export interface actionGetIndividualProductISPending extends Action {
  type: ProductsActionType.GET_INDIVIDUAL_PRODUCT_LOADING;
}

export interface actionGetIndividualProductISSSuccess extends Action {
  type: ProductsActionType.GET_INDIVIDUAL_PRODUCT_SUCCESS;
  payload: ProductResponseType;
}

export interface actionGetIndividualProductISError extends Action {
  type: ProductsActionType.GET_INDIVIDUAL_PRODUCT_FAILED;
  payload: ProductResponseType;
}

export interface actionGetIndividualProductISRest extends Action {
  type: ProductsActionType.GET_INDIVIDUAL_PRODUCT_REST;
}

export interface actionProductCategory extends Action {
  type: ProductsActionType.PRODUCT_CATEGORY;
  payload: string;
}

export interface actionUpdatePageNumber extends Action {
  type: ProductsActionType.UPDATE_PAGE_NUMBER;
  payload: number;
}

export interface actionUpdateProductSortBy extends Action {
  type: ProductsActionType.UPDATE_PRODUCT_SORTBY;
  payload: string;
}

export interface actionDeleteProductIsPending extends Action {
  type: ProductsActionType.DELETE_PRODUCT_LOADING;
}

export interface actionDeleteProductIsSuccess extends Action {
  type: ProductsActionType.DELETE_PRODUCT_SUCCESS;
  payload: ProductsResponseType;
}

export interface actionDeleteProductIsError extends Action {
  type: ProductsActionType.DELETE_PRODUCT_FAILED;
  payload: ProductsResponseType;
}

export interface actionDeleteProductRest extends Action {
  type: ProductsActionType.DELETE_PRODUCT_REST;
}

export interface actionUpdateProductIsPending extends Action {
  type: ProductsActionType.UPDATE_PRODUCT_LOADING;
}

export interface actionUpdateProductIsSuccess extends Action {
  type: ProductsActionType.UPDATE_PRODUCT_SUCCESS;
  payload: ProductResponseType;
}

export interface actionUpdateProductIsError extends Action {
  type: ProductsActionType.UPDATE_PRODUCT_FAILED;
  payload: ProductResponseType;
}

export interface actionUpdateProductRest extends Action {
  type: ProductsActionType.UPDATE_PRODUCT_REST;
}

export interface actionAddToCartIsPending extends Action {
  type: ProductsActionType.ADD_PRODUCT_TO_CART_LOADING;
}

export interface actionAddToCartIsSuccess extends Action {
  type: ProductsActionType.ADD_PRODUCT_TO_CART_SUCCESS;
  payload: ProductsResponseType;
}

export interface actionAddToCartIsError extends Action {
  type: ProductsActionType.ADD_PRODUCT_TO_CART_FAILED;
  payload: ProductsResponseType;
}

export interface actionAddToCartRest extends Action {
  type: ProductsActionType.ADD_PRODUCT_TO_CART_REST;
}

export interface actionGetCartIsPending extends Action {
  type: ProductsActionType.GET_CART_LOADING;
}

export interface actionGetCartIsSuccess extends Action {
  type: ProductsActionType.GET_CART_SUCCESS;
  payload: CartIResponseType;
}

export interface actionGetCartIsError extends Action {
  type: ProductsActionType.GET_CART_FAILED;
  payload: CartIResponseType;
}

export interface actionGetCartRest extends Action {
  type: ProductsActionType.GET_CART_REST;
}

export interface actionDeleteItemFromCartIsPending extends Action {
  type: ProductsActionType.DELETE_ITEM_FROM_CART_LOADING;
}

export interface actionDeleteItemFromCartIsSuccess extends Action {
  type: ProductsActionType.DELETE_ITEM_FROM_CART_SUCCESS;
  payload: ProductsResponseType;
}

export interface actionDeleteItemFromCartIsError extends Action {
  type: ProductsActionType.DELETE_ITEM_FROM_CART_FAILED;
  payload: ProductsResponseType;
}

export interface actionDeleteItemFromCartRest extends Action {
  type: ProductsActionType.DELETE_ITEM_FROM_CART_REST;
}

export interface actionClearCartIsPending extends Action {
  type: ProductsActionType.CLEAR_CART_LOADING;
}

export interface actionClearCartIsSuccess extends Action {
  type: ProductsActionType.CLEAR_CART_SUCCESS;
  payload: CartIResponseType;
}

export interface actionClearCartIsError extends Action {
  type: ProductsActionType.CLEAR_CART_REST;
  payload: CartIResponseType;
}

export interface actionAddOrderIsPending extends Action {
  type: ProductsActionType.ADD_ORDER_LOADING;
}

export interface actionAddOrderIsSuccess extends Action {
  type: ProductsActionType.ADD_ORDER_SUCCESS;
  payload: CartIResponseType;
}

export interface actionAddOrderIsError extends Action {
  type: ProductsActionType.ADD_ORDER_FAILED;
  payload: CartIResponseType;
}

export interface actionAddOrderRest extends Action {
  type: ProductsActionType.ADD_ORDER_REST;
}

export interface actionGetOrderIsPending extends Action {
  type: ProductsActionType.GET_ORDER_LOADING;
}

export interface actionGetOrderIsSuccess extends Action {
  type: ProductsActionType.GET_ORDER_SUCCESS;
  payload: CartIResponseType;
}

export interface actionGetOrderIsError extends Action {
  type: ProductsActionType.GET_ORDER_FAILED;
  payload: CartIResponseType;
}

export interface actionGetOrderRest extends Action {
  type: ProductsActionType.GET_ORDER_REST;
}

export interface actionClearOrderIsPending extends Action {
  type: ProductsActionType.CLEAR_ORDER_LOADING;
}

export interface actionClearOrderIsSuccess extends Action {
  type: ProductsActionType.CLEAR_ORDER_SUCCESS;
  payload: CartIResponseType;
}

export interface actionClearOrderIsError extends Action {
  type: ProductsActionType.CLEAR_ORDER_FAILED;
  payload: CartIResponseType;
}

export interface actionClearOrderRest extends Action {
  type: ProductsActionType.CLEAR_ORDER_REST;
}

export type ProductsAction =
  | actionAddProductIsPending
  | actionAddProductIsSuccess
  | actionAddProductIsError
  | actionAddProductRest
  | actionGetProductIsPending
  | actionGetProductIsSuccess
  | actionGetProductIsError
  | actionGetProductRest
  | actionProductSearchTerm
  | actionProductCategory
  | actionUpdatePageNumber
  | actionDeleteProductIsPending
  | actionDeleteProductIsSuccess
  | actionDeleteProductIsError
  | actionDeleteProductRest
  | actionUpdateProductSortBy
  | actionGetIndividualProductISPending
  | actionGetIndividualProductISSSuccess
  | actionGetIndividualProductISError
  | actionGetIndividualProductISRest
  | actionUpdateProductIsPending
  | actionUpdateProductIsSuccess
  | actionUpdateProductIsError
  | actionUpdateProductRest
  | actionAddToCartIsPending
  | actionAddToCartIsSuccess
  | actionAddToCartIsError
  | actionAddToCartRest
  | actionGetCartIsPending
  | actionGetCartIsSuccess
  | actionGetCartIsError
  | actionGetCartRest
  | actionDeleteItemFromCartIsPending
  | actionDeleteItemFromCartIsSuccess
  | actionDeleteItemFromCartIsError
  | actionDeleteItemFromCartRest
  | actionClearCartIsPending
  | actionClearCartIsSuccess
  | actionClearCartIsError
  | actionAddOrderIsPending
  | actionAddOrderIsError
  | actionAddOrderRest
  | actionAddOrderIsSuccess
  | actionGetOrderIsPending
  | actionGetOrderIsError
  | actionGetOrderIsSuccess
  | actionGetOrderRest
  | actionClearOrderIsPending
  | actionClearOrderIsSuccess
  | actionClearOrderIsError
  | actionClearOrderRest;
