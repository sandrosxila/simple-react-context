import { Paginated } from '../models/api';
import { Product } from '../models/product';
import { getObjectWithDefinedProperties } from '../utils/objectHelpers';

export async function getProducts(params: Partial<{ 
  page: number; 
  perPage: number; 
  sort: string[];
}> = {}): Promise<Paginated<Product> | Product[]> {
  const queryParams = new URLSearchParams(getObjectWithDefinedProperties({
    _page: params.page?.toString(),
    _per_page: params.perPage?.toString(),
    _sort: params.sort?.join(',')
  }));

  const response = await fetch(`http://localhost:5000/products?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
