import { Paginated } from '../models/api';
import { Product } from '../models/product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('http://localhost:5000/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getProductsByPage = async (page = 1): Promise<Paginated<Product>> => {
  const response = await fetch(`http://localhost:5000/products?_page=${page}&_per_page=3`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};