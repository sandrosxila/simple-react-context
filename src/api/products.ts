import { Product } from '../models/product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('http://localhost:5000/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};