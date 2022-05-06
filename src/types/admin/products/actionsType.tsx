// REDUX ACTION TYPES

import { Action } from 'redux';

import { ProductResponseType, ProductsResponseType, ProductType } from './_prototype';

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
  | actionUpdateProductRest;
