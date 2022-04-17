export type ProductType = {
  id?: number | string;
  _id: number | string;
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

  list: [];
  listIsLoading: boolean;
  listIsSuccess: boolean;
  listIsError: boolean;
  listMessage: string;
  totalDocs: number;
  products: any[];

  productSearchTerm?: string;
  selectedCategory?: string;
}
