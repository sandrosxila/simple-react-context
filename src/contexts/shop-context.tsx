import { createContext } from "react";
import { Product } from "../models/product";

export type ShopContextType = {
  products: Product[];
  cart: Product[];
  addToCart: (product: Product) => void,
  removeFromCart: (idx: number) => void
}

const noop = () => undefined

export const ShopContext = createContext<ShopContextType>({
  products: [],
  cart: [],
  addToCart: noop,
  removeFromCart: noop
});