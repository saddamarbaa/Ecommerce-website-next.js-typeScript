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

  productSearchTerm: '',
  selectedCategory: 'All Products',
  limit: 100,
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
};

export function productReducer(state: ProductReducerState = initialState, action: ProductsAction) {
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
        getIndividualProductIsMessage: action.payload.message || action.payload.error || 'Error',
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

    default:
      return state;
  }
}

export default productReducer;
