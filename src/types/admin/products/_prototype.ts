import { UserType } from '../../auth';

export interface ReviewsT {
  user: string;
  name: string;
  rating?: number;
  comment: string;
}
export interface ProductType {
  id?: string;
  _id?: string;
  name: string;
  price: string;
  brand?: string;
  description: string;
  productImage: any;
  category: string;
  rating?: string;
  count?: string;
  stock?: string;
  user?: UserType;
  numberOfReviews?: number;
  reviews?: ReviewsT[];
  ratings?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItemsTpe {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    productImage: string;
    category: string;
    rating?: string;
    count?: string;
    stock?: string;
    user?: UserType;
  };
  _id: string;
  quantity: number;
}

export interface OrderResTpe {
  user: UserType;
  _id: string;
  products: CartItemsTpe[];
}

export interface _productPrototypeReducerState {
  product: object;
  addProductIsLoading: boolean;
  addProductIsSuccess: boolean;
  addProductIsError: boolean;
  addProductMessage: string;

  list: object;
  listIsLoading: boolean;
  listIsSuccess: boolean;
  listIsError: boolean;
  listMessage: string;
  totalDocs: number;
  lastPage: number;
  products: ProductType[];

  productSearchTerm: string;
  selectedCategory: string;
  limit: number;
  page: number;
  sort: string;
  sortBy: string;

  deleteProductIsPending: boolean;
  deleteProductIsSuccess: boolean;
  deleteProductIsError: boolean;
  deleteProductMessage: string;

  individualProduct: ProductType | null;
  getIndividualProductIsPending: boolean;
  getIndividualProductIsSuccess: boolean;
  getIndividualProductIsError: boolean;
  getIndividualProductIsMessage: string;

  updatedProduct: ProductType | null;
  updateProductIsPending: boolean;
  updateProductIsSuccess: boolean;
  updateProductIsError: boolean;
  updateProductMessage: string;

  cart: CartItemsTpe[];
  getCartIsPending: boolean;
  getCartIsSuccess: boolean;
  getCartIsError: boolean;
  getCartMessage: string;

  AddToCartIsLoading: boolean;
  AddToCartIsSuccess: boolean;
  AddToCartIsError: boolean;
  AddToCartMessage: string;

  deleteItemFromCartIsLoading: boolean;
  deleteItemFromCartIsSuccess: boolean;
  deleteItemFromCartIsError: boolean;
  deleteItemFromCartMessage: string;

  clearCartIsLoading: boolean;
  clearCartIsSuccess: boolean;
  clearCartIsError: boolean;
  clearCartMessage: string;

  orders: OrderResTpe[];
  getOrderIsPending: boolean;
  getOrderIsSuccess: boolean;
  getOrderIsError: boolean;
  getOrderMessage: string;

  addOrderIsLoading: boolean;
  addOrderIsSuccess: boolean;
  addOrderIsError: boolean;
  addOrderMessage: string;

  clearOrderIsLoading: boolean;
  clearOrderIsSuccess: boolean;
  clearOrderIsError: boolean;
  clearOrderMessage: string;

  clearSingleOrderIsLoading: boolean;
  clearSingleIsSuccess: boolean;
  clearSingleIsError: boolean;
  clearSingleMessage: string;

  deleteReviewIsLoading: boolean;
  deleteReviewIsSuccess: boolean;
  deleteReviewIsError: boolean;
  deleteReviewMessage: string;
}

export interface ProductsResponseType {
  data: {
    totalDocs: number;
    totalPages: number;
    lastPage: number;
    count: number;
    currentPage: number;
    products: ProductType[];
  };
  success: string;
  error: string;
  message: string;
  status: boolean;
}

export interface ProductResponseType {
  data: {
    product: ProductType;
  };
  success: string;
  error: string;
  message: string;
  status: boolean;
}

export interface CartIResponseType {
  data: {
    products: CartItemsTpe[];
    userId: string;
  };
  success: string;
  error: string;
  message: string;
  status: boolean;
}

export interface OrderResponseType {
  data: {
    orders: OrderResTpe[];
    userId: string;
  };
  success: string;
  error: string;
  message: string;
  status: boolean;
}

export default _productPrototypeReducerState;
