import { createContext } from "react";
import { Product } from "../models/product";

export type ShopContextType = {
  cart: Product[];
  addToCart: (product: Product) => void,
  removeFromCart: (idx: number) => void
}

const noop = () => undefined

export const ShopContext = createContext<ShopContextType>({
  cart: [],
  addToCart: noop,
  removeFromCart: noop
});