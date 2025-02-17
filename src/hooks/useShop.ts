import {useContext} from 'react';
import { ShopContext } from '../contexts/shop-context';

export const useShop = () => useContext(ShopContext);