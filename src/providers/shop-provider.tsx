import {useState} from 'react';
import {Product} from '../models/product';
import {ShopContext} from '../contexts/shop-context';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products';


export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const { data: products = [] } = useQuery({
    queryKey:['products'], 
    queryFn: getProducts
  });

  const addToCart = (product: Product) => {
    if(!cart.find(prod => prod.id === product.id)) {
      setCart(prods => [...prods, product]);
      alert(`${product.name} has been added to the cart!`);
    } else {
      alert(`${product.name} already exists in the cart!`);
    }
  }

  const removeFromCart = (id: number) => {
    setCart(prods => prods.filter(prod => prod.id !== id))
  }

  return (
    <ShopContext.Provider value={{ products, cart, addToCart, removeFromCart }}>
      {children}
    </ShopContext.Provider>
  );
};