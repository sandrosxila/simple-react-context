import './App.css'
import {  Link, Route, Routes } from 'react-router'
import { ShopProvider } from './providers/shop-provider'
import { HomePage } from './pages/home-page'
import { CartPage } from './pages/cart-page'
import {useQuery} from '@tanstack/react-query';
import {getProducts} from './api/products';

function App() {
  useQuery({
    queryKey:['products'], 
    queryFn: getProducts
  });

  return (
    <ShopProvider>
      <nav className="navbar">
        <Link to="/" className="nav-link">Products</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </ShopProvider>
  )
}

export default App
