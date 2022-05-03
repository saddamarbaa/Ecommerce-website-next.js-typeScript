// REDUX ACTION TYPES

import { Action } from 'redux';

import { UserResponseType, UsersResponseType } from './_prototype';

export enum UsersActionType {
  GET_USER_LIST_LOADING = 'GET_USER_LIST_LOADING',
  GET_USER_LIST_SUCCESS = 'GET_USER_LIST_SUCCESS',
  GET_USER_LIST_FAILED = 'GET_USER_LIST_FAILED',
  GET_USER_LIST_REST = 'GET_USER_LIST_REST',
  GET_INDIVIDUAL_USER_LOADING = 'GET_INDIVIDUAL_USER_LOADING',
  GET_INDIVIDUAL_USER_SUCCESS = 'GET_INDIVIDUAL_USER_SUCCESS',
  GET_INDIVIDUAL_USER_FAILED = 'GET_INDIVIDUAL_USER_FAILED',
  GET_INDIVIDUAL_USER_REST = 'GET_INDIVIDUAL_USER_REST',
  POST_USER_LOADING = 'POST_USER_LOADING',
  POST_USER_SUCCESS = 'POST_USER_SUCCESS',
  POST_USER_FAILED = 'POST_USER_FAILED',
  POST_USER_REST = 'POST_USER_REST',
  UPDATE_USER_LOADING = 'UPDATE_USER_LOADING',
  UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILED = 'UPDATE_USER_FAILED',
  UPDATE_USER_REST = 'UPDATE_USER_REST',
  DELETE_USER_LOADING = 'DELETE_USER_LOADING',
  DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILED = 'DELETE_USER_FAILED',
  DELETE_USER_REST = 'DELETE_USER_REST',
}

export interface actionGetUsersISPending extends Action {
  type: UsersActionType.GET_USER_LIST_LOADING;
}

export interface actionGetUsersISSuccess extends Action {
  type: UsersActionType.GET_USER_LIST_SUCCESS;
  payload: UsersResponseType;
}

export interface actionGetUsersISError extends Action {
  type: UsersActionType.GET_USER_LIST_FAILED;
  payload: UsersResponseType;
}

export interface actionGetUsersISRest extends Action {
  type: UsersActionType.GET_USER_LIST_REST;
}

export interface actionGetIndividualUserISPending extends Action {
  type: UsersActionType.GET_INDIVIDUAL_USER_LOADING;
}

export interface actionGetIndividualUserISSuccess extends Action {
  type: UsersActionType.GET_INDIVIDUAL_USER_SUCCESS;
  payload: UserResponseType;
}

export interface actionGetIndividualUserISError extends Action {
  type: UsersActionType.GET_INDIVIDUAL_USER_FAILED;
  payload: UserResponseType;
}

export interface actionGetIndividualUserISRest extends Action {
  type: UsersActionType.GET_INDIVIDUAL_USER_REST;
}

export interface actionPostUserISPending extends Action {
  type: UsersActionType.POST_USER_LOADING;
}

export interface actionPostUserISSuccess extends Action {
  type: UsersActionType.POST_USER_SUCCESS;
  payload: UserResponseType;
}

export interface actionPostUserISError extends Action {
  type: UsersActionType.POST_USER_FAILED;
  payload: UserResponseType;
}

export interface actionPostUserISRest extends Action {
  type: UsersActionType.POST_USER_REST;
}

export interface actionDeleteUserISPending extends Action {
  type: UsersActionType.DELETE_USER_LOADING;
}

export interface actionDeleteUserISSuccess extends Action {
  type: UsersActionType.DELETE_USER_SUCCESS;
  payload: UserResponseType;
}

export interface actionDeleteUserISError extends Action {
  type: UsersActionType.DELETE_USER_FAILED;
  payload: UserResponseType;
}

export interface actionDeleteUserISRest extends Action {
  type: UsersActionType.DELETE_USER_REST;
}

export interface actionUpdateUserISPending extends Action {
  type: UsersActionType.UPDATE_USER_LOADING;
}

export interface actionUpdateUserISSuccess extends Action {
  type: UsersActionType.UPDATE_USER_SUCCESS;
  payload: UserResponseType;
}

export interface actionUpdateUserISError extends Action {
  type: UsersActionType.UPDATE_USER_FAILED;
  payload: UserResponseType;
}

export interface actionUpdateUserISRest extends Action {
  type: UsersActionType.UPDATE_USER_REST;
}

export type UsersAction =
  | actionGetUsersISPending
  | actionGetUsersISSuccess
  | actionGetUsersISError
  | actionGetUsersISRest
  | actionGetIndividualUserISPending
  | actionGetIndividualUserISSuccess
  | actionGetIndividualUserISError
  | actionGetIndividualUserISRest
  | actionPostUserISPending
  | actionPostUserISSuccess
  | actionPostUserISError
  | actionPostUserISRest
  | actionDeleteUserISPending
  | actionDeleteUserISSuccess
  | actionDeleteUserISError
  | actionDeleteUserISRest
  | actionUpdateUserISPending
  | actionUpdateUserISSuccess
  | actionUpdateUserISError
  | actionUpdateUserISRest;
