import { Paginated } from '../models/api';
import { Product } from '../models/product';
import { getObjectWithDefinedProperties } from '../utils/objectHelpers';

type GetProductsParams = Partial<{ 
  page: number; 
  perPage: number; 
  sort: string[];
}>;

type GetProductsReturnType<T extends GetProductsParams> = T extends { page: number } ? Paginated<Product> : Product[];

export async function getProducts<T extends GetProductsParams>(params: T = {} as T): Promise<GetProductsReturnType<T>> {
  const queryParams = new URLSearchParams(getObjectWithDefinedProperties({
    _page: params.page?.toString(),
    _per_page: params.perPage?.toString(),
    _sort: params.sort?.join(',')
  }));

  const response = await fetch(`http://localhost:5000/products?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};


export async function addProduct(product: Omit<Product, "id">): Promise<Product> {
  const response = await fetch('http://localhost:5000/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });

  if (!response.ok) {
    throw new Error('Failed to add product');
  }
  return response.json();
}