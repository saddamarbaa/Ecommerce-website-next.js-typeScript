import {
  _productPrototypeReducerState as ProductReducerState,
  ProductsAction,
  ProductsActionType,
} from 'types';

const initialState: ProductReducerState = {
  product: {},
  addProductIsLoading: false,
  addProductIsSuccess: false,
  addProductIsError: false,
  addProductMessage: '',

  list: {},
  products: [],
  listIsLoading: false,
  listIsSuccess: false,
  listIsError: false,
  listMessage: '',
  totalDocs: 0,
  lastPage: 0,

  productSearchTerm: '',
  selectedCategory: 'All Products',
  limit: 10,
  page: 1,
  sortBy: 'createdAt',
  sort: 'desc',

  deleteProductIsPending: false,
  deleteProductIsSuccess: false,
  deleteProductIsError: false,
  deleteProductMessage: '',

  individualProduct: null,
  getIndividualProductIsPending: false,
  getIndividualProductIsSuccess: false,
  getIndividualProductIsError: false,
  getIndividualProductIsMessage: '',

  updatedProduct: null,
  updateProductIsPending: false,
  updateProductIsSuccess: false,
  updateProductIsError: false,
  updateProductMessage: '',

  cart: [],
  getCartIsPending: false,
  getCartIsSuccess: false,
  getCartIsError: false,
  getCartMessage: '',

  AddToCartIsLoading: false,
  AddToCartIsSuccess: false,
  AddToCartIsError: false,
  AddToCartMessage: '',

  deleteItemFromCartIsLoading: false,
  deleteItemFromCartIsSuccess: false,
  deleteItemFromCartIsError: false,
  deleteItemFromCartMessage: '',

  clearCartIsLoading: false,
  clearCartIsSuccess: false,
  clearCartIsError: false,
  clearCartMessage: '',

  orders: [],
  getOrderIsPending: false,
  getOrderIsSuccess: false,
  getOrderIsError: false,
  getOrderMessage: '',

  addOrderIsLoading: false,
  addOrderIsSuccess: false,
  addOrderIsError: false,
  addOrderMessage: '',

  clearOrderIsLoading: false,
  clearOrderIsSuccess: false,
  clearOrderIsError: false,
  clearOrderMessage: '',

  clearSingleOrderIsLoading: false,
  clearSingleIsSuccess: false,
  clearSingleIsError: false,
  clearSingleMessage: '',

  deleteReviewIsLoading: false,
  deleteReviewIsSuccess: false,
  deleteReviewIsError: false,
  deleteReviewMessage: '',
};

export function productReducer(
  state: ProductReducerState = initialState,
  action: ProductsAction
): ProductReducerState {
  switch (action?.type) {
    case ProductsActionType.GET_PRODUCTS_LOADING:
      return {
        ...state,
        listIsLoading: true,
        listIsSuccess: false,
        listIsError: false,
        listMessage: 'loading',
      };
    case ProductsActionType.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        ...state,
        products: action.payload.data.products || [],
        totalDocs: action.payload.data.totalDocs || 0,
        lastPage: action.payload.data.lastPage || 0,
        list: action.payload || {},
        listIsLoading: false,
        listIsSuccess: true,
        listIsError: false,
        listMessage: action.payload.message || 'Success',
      };
    case ProductsActionType.GET_PRODUCTS_FAILED:
      return {
        ...state,
        products: [],
        list: {},
        listIsLoading: false,
        listIsSuccess: false,
        listIsError: true,
        totalDocs: 0,
        listMessage: action.payload.message || action.payload.error || 'Error',
      };
    case ProductsActionType.GET_PRODUCTS_REST:
      return {
        ...state,
        list: {},
        products: [],
        listIsLoading: false,
        listIsSuccess: false,
        listIsError: false,
        listMessage: '',
        totalDocs: 0,
      };
    case ProductsActionType.ADD_PRODUCT_LOADING:
      return {
        ...state,
        product: {},
        addProductIsLoading: true,
        addProductIsSuccess: false,
        addProductIsError: false,
        addProductMessage: 'loading',
      };
    case ProductsActionType.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload.data || {},
        addProductIsLoading: false,
        addProductIsSuccess: true,
        addProductIsError: false,
        addProductMessage: action.payload.message || 'Success',
      };
    case ProductsActionType.ADD_PRODUCT_FAILED:
      return {
        ...state,
        product: {},
        addProductIsLoading: false,
        addProductIsSuccess: false,
        addProductIsError: true,
        addProductMessage: action.payload.message || action.payload.error || 'Error',
      };
    case ProductsActionType.ADD_PRODUCT_REST:
      return {
        ...state,
        product: {},
        addProductIsLoading: false,
        addProductIsSuccess: false,
        addProductIsError: false,
        addProductMessage: '',
      };
    case ProductsActionType.PRODUCT_CATEGORY:
      return {
        ...state,
        productSearchTerm: '',
        selectedCategory: action.payload,
      };
    case ProductsActionType.PRODUCT_SEARCH_TERM:
      return {
        ...state,
        productSearchTerm: action.payload,
      };
    case ProductsActionType.UPDATE_PAGE_NUMBER:
      return {
        ...state,
        productSearchTerm: '',
        selectedCategory: 'All Products',
        page: action.payload || 1,
      };
    case ProductsActionType.UPDATE_PRODUCT_SORTBY:
      return {
        ...state,
        sort: action.payload || 'desc',
      };
    case ProductsActionType.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleteProductIsPending: false,
        deleteProductIsSuccess: true,
        deleteProductIsError: false,
        deleteProductMessage: action.payload.message || 'Success',
      };
    case ProductsActionType.DELETE_PRODUCT_FAILED:
      return {
        ...state,
        deleteProductIsPending: false,
        deleteProductIsSuccess: false,
        deleteProductIsError: true,
        deleteProductMessage: action.payload.message || action.payload.error || 'Error',
      };
    case ProductsActionType.DELETE_PRODUCT_REST:
      return {
        ...state,
        deleteProductIsPending: false,
        deleteProductIsSuccess: false,
        deleteProductIsError: false,
        deleteProductMessage: '',
      };
    case ProductsActionType.GET_INDIVIDUAL_PRODUCT_LOADING:
      return {
        ...state,
        getIndividualProductIsPending: true,
        getIndividualProductIsSuccess: false,
        getIndividualProductIsError: false,
        getIndividualProductIsMessage: 'loading',
      };
    case ProductsActionType.GET_INDIVIDUAL_PRODUCT_SUCCESS:
      return {
        ...state,
        individualProduct: action.payload.data.product || null,
        getIndividualProductIsPending: false,
        getIndividualProductIsSuccess: true,
        getIndividualProductIsError: false,
        getIndividualProductIsMessage: action.payload.message || 'Success',
      };
    case ProductsActionType.GET_INDIVIDUAL_PRODUCT_FAILED:
      return {
        ...state,
        individualProduct: null,
        getIndividualProductIsPending: false,
        getIndividualProductIsSuccess: false,
        getIndividualProductIsError: true,
        getIndividualProductIsMessage: action.payload.message || action.payload.error || 'Error',
      };
    case ProductsActionType.GET_INDIVIDUAL_PRODUCT_REST:
      return {
        ...state,
        getIndividualProductIsPending: false,
        getIndividualProductIsSuccess: false,
        getIndividualProductIsError: false,
        getIndividualProductIsMessage: '',
      };
    case ProductsActionType.UPDATE_PRODUCT_LOADING:
      return {
        ...state,
        updateProductIsPending: true,
        updateProductIsSuccess: false,
        updateProductIsError: false,
        updateProductMessage: 'loading',
      };
    case ProductsActionType.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        updatedProduct: action.payload.data.product || null,
        updateProductIsPending: false,
        updateProductIsSuccess: true,
        updateProductIsError: false,
        updateProductMessage: action.payload.message || 'Success',
      };
    case ProductsActionType.UPDATE_PRODUCT_FAILED:
      return {
        ...state,
        updatedProduct: null,
        updateProductIsPending: false,
        updateProductIsSuccess: false,
        updateProductIsError: true,
        updateProductMessage: action.payload.message || action.payload.error || 'Error',
      };
    case ProductsActionType.UPDATE_PRODUCT_REST:
      return {
        ...state,
        updatedProduct: null,
        updateProductIsPending: false,
        updateProductIsSuccess: false,
        updateProductIsError: false,
        updateProductMessage: '',
      };
    case ProductsActionType.GET_CART_LOADING:
      return {
        ...state,
        getCartIsPending: true,
        getCartIsSuccess: false,
        getCartIsError: false,
        getCartMessage: '',
      };
    case ProductsActionType.GET_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload.data.products || [],
        getCartIsPending: false,
        getCartIsSuccess: true,
        getCartIsError: false,
        getCartMessage: action.payload.message || 'Success',
      };
    case ProductsActionType.GET_CART_FAILED:
      return {
        ...state,
        getCartIsPending: false,
        getCartIsSuccess: false,
        getCartIsError: true,
        getCartMessage: action.payload.message || action.payload.error || 'Error',
      };
    case ProductsActionType.GET_CART_REST:
      return {
        ...state,
        getCartIsPending: false,
        getCartIsSuccess: false,
        getCartIsError: false,
        getCartMessage: '',
      };
    case ProductsActionType.ADD_PRODUCT_TO_CART_LOADING:
      return {
        ...state,
        AddToCartIsLoading: true,
        AddToCartIsSuccess: false,
        AddToCartIsError: false,
        AddToCartMessage: '',
      };
    case ProductsActionType.ADD_PRODUCT_TO_CART_SUCCESS:
      return {
        ...state,
        AddToCartIsLoading: false,
        AddToCartIsSuccess: true,
        AddToCartIsError: false,
        AddToCartMessage: action.payload.message || 'Success',
      };
    case ProductsActionType.ADD_PRODUCT_TO_CART_FAILED:
      return {
        ...state,
        AddToCartIsLoading: false,
        AddToCartIsSuccess: false,
        AddToCartIsError: true,
        AddToCartMessage: action.payload.message || action.payload.error || 'Error',
      };
    case ProductsActionType.ADD_PRODUCT_TO_CART_REST:
      return {
        ...state,
        AddToCartIsLoading: false,
        AddToCartIsSuccess: false,
        AddToCartIsError: false,
        AddToCartMessage: '',
      };
    case ProductsActionType.DELETE_ITEM_FROM_CART_LOADING:
      return {
        ...state,
        deleteItemFromCartIsLoading: true,
        deleteItemFromCartIsSuccess: false,
        deleteItemFromCartIsError: false,
        deleteItemFromCartMessage: '',
      };
    case ProductsActionType.DELETE_ITEM_FROM_CART_SUCCESS:
      return {
        ...state,
        deleteItemFromCartIsLoading: false,
        deleteItemFromCartIsSuccess: true,
        deleteItemFromCartIsError: false,
        deleteItemFromCartMessage: action.payload.message || 'Success',
      };
    case ProductsActionType.DELETE_ITEM_FROM_CART_FAILED:
      return {
        ...state,
        deleteItemFromCartIsLoading: false,
        deleteItemFromCartIsSuccess: false,
        deleteItemFromCartIsError: true,
        deleteItemFromCartMessage: action.payload.message || action.payload.error || 'Error',
      };
    case ProductsActionType.DELETE_ITEM_FROM_CART_REST:
      return {
        ...state,
        deleteItemFromCartIsLoading: false,
        deleteItemFromCartIsSuccess: false,
        deleteItemFromCartIsError: false,
        deleteItemFromCartMessage: '',
      };
    case ProductsActionType.CLEAR_CART_LOADING:
      return {
        ...state,
        clearCartIsLoading: true,
        clearCartIsSuccess: false,
        clearCartIsError: false,
        clearCartMessage: '',
      };
    case ProductsActionType.CLEAR_CART_SUCCESS:
      return {
        ...state,
        clearCartIsLoading: false,
        clearCartIsSuccess: true,
        clearCartIsError: false,
        clearCartMessage: action.payload.message || 'Success',
      };
    case ProductsActionType.CLEAR_CART_FAILED:
      return {
        ...state,
        clearCartIsLoading: false,
        clearCartIsSuccess: false,
        clearCartIsError: true,
        clearCartMessage: action.payload.message || action.payload.error || 'Error',
      };
    case ProductsActionType.CLEAR_CART_REST:
      return {
        ...state,
        clearCartIsLoading: false,
        clearCartIsSuccess: false,
        clearCartIsError: false,
        clearCartMessage: '',
      };
    case ProductsActionType.ADD_ORDER_LOADING:
      return {
        ...state,
        addOrderIsLoading: true,
        addOrderIsSuccess: false,
        addOrderIsError: false,
        addOrderMessage: '',
      };
    case ProductsActionType.ADD_ORDER_SUCCESS:
      return {
        ...state,
        addOrderIsLoading: false,
        addOrderIsSuccess: true,
        addOrderIsError: false,
        addOrderMessage: action.payload.message || 'Success',
      };
    case ProductsActionType.ADD_ORDER_FAILED:
      return {
        ...state,
        addOrderIsLoading: false,
        addOrderIsSuccess: false,
        addOrderIsError: true,
        addOrderMessage: action.payload.message || action.payload.error || 'Error',
      };
    case ProductsActionType.ADD_ORDER_REST:
      return {
        ...state,
        addOrderIsLoading: false,
        addOrderIsSuccess: false,
        addOrderIsError: false,
        addOrderMessage: '',
      };
    case ProductsActionType.GET_ORDER_LOADING:
      return {
        ...state,
        getOrderIsPending: true,
        getOrderIsSuccess: false,
        getOrderIsError: false,
        getOrderMessage: '',
      };
    case ProductsActionType.GET_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload.data?.orders || [],
        getOrderIsPending: false,
        getOrderIsSuccess: true,
        getOrderIsError: false,
        getOrderMessage: action.payload.message || 'Success',
      };
    case ProductsActionType.GET_ORDER_FAILED:
      return {
        ...state,
        getOrderIsPending: false,
        getOrderIsSuccess: false,
        getOrderIsError: true,
        getOrderMessage: action.payload.message || action.payload.error || 'Error',
      };
    case ProductsActionType.GET_ORDER_REST:
      return {
        ...state,
        clearOrderIsLoading: false,
        clearOrderIsSuccess: false,
        clearOrderIsError: false,
        clearOrderMessage: '',
      };
    case ProductsActionType.CLEAR_ORDER_LOADING:
      return {
        ...state,
        clearOrderIsLoading: true,
        clearOrderIsSuccess: false,
        clearOrderIsError: false,
        clearOrderMessage: '',
      };
    case ProductsActionType.CLEAR_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload.data?.orders || [],
        clearOrderIsLoading: false,
        clearOrderIsSuccess: true,
        clearOrderIsError: false,
        clearOrderMessage: action.payload.message || 'Success',
      };
    case ProductsActionType.CLEAR_ORDER_FAILED:
      return {
        ...state,
        clearOrderIsLoading: false,
        clearOrderIsSuccess: false,
        clearOrderIsError: true,
        clearOrderMessage: action.payload.message || action.payload.error || 'Error',
      };
    case ProductsActionType.CLEAR_ORDER_REST:
      return {
        ...state,
        clearOrderIsLoading: false,
        clearOrderIsSuccess: false,
        clearOrderIsError: false,
        clearOrderMessage: '',
      };
    case ProductsActionType.CLEAR_SINGLE_ORDER_LOADING:
      return {
        ...state,
        clearSingleOrderIsLoading: true,
        clearSingleIsSuccess: false,
        clearSingleIsError: false,
        clearSingleMessage: '',
      };
    case ProductsActionType.CLEAR_SINGLE_ORDER_SUCCESS:
      return {
        ...state,
        clearSingleOrderIsLoading: false,
        clearSingleIsSuccess: true,
        clearSingleIsError: false,
        clearSingleMessage: action.payload.message || 'Success',
      };
    case ProductsActionType.CLEAR_SINGLE_ORDER_FAILED:
      return {
        ...state,
        clearSingleOrderIsLoading: false,
        clearSingleIsSuccess: false,
        clearSingleIsError: true,
        clearSingleMessage: action.payload.message || action.payload.error || 'Error',
      };
    case ProductsActionType.CLEAR_SINGLE_ORDER_REST:
      return {
        ...state,
        clearSingleOrderIsLoading: false,
        clearSingleIsSuccess: false,
        clearSingleIsError: false,
        clearSingleMessage: '',
      };
    case ProductsActionType.DELETE_REVIEW_LOADING:
      return {
        ...state,
        deleteReviewIsLoading: true,
        deleteReviewIsSuccess: false,
        deleteReviewIsError: false,
        deleteReviewMessage: '',
      };
    case ProductsActionType.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        product: action?.payload?.data?.products || [],
        deleteReviewIsLoading: false,
        deleteReviewIsSuccess: true,
        deleteReviewIsError: false,
        deleteReviewMessage: action.payload.message || 'Success',
      };
    case ProductsActionType.DELETE_REVIEW_FAILED:
      return {
        ...state,
        deleteReviewIsLoading: false,
        deleteReviewIsSuccess: false,
        deleteReviewIsError: true,
        deleteReviewMessage: action.payload.message || action.payload.error || 'Error',
      };
    case ProductsActionType.DELETE_REVIEW_REST:
      return {
        ...state,
        deleteReviewIsLoading: false,
        deleteReviewIsSuccess: false,
        deleteReviewIsError: false,
        deleteReviewMessage: '',
      };

    default:
      return state;
  }
}

export default productReducer;
