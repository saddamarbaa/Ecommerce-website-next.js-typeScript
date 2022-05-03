export type ProductType = {
  id?: string;
  _id?: string;
  name: string;
  price: string;
  description: string;
  productImage: any;
  category?: string;
  rating?: string;
  count?: string;
  stock?: string;
};

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
  products: ProductType[];

  productSearchTerm: string;
  selectedCategory: string;
  limit: number;
  page: number;
  sort: string;
  sortBy: string;
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

export default _productPrototypeReducerState;
