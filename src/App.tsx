import './App.css'
import {  Link, Route, Routes } from 'react-router'
import { ShopProvider } from './providers/shop-provider'
import { HomePage } from './pages/home-page'
import { CartPage } from './pages/cart-page'
import { CreatePage } from './pages/create-page'

function App() {
  return (
    <ShopProvider>
      <nav className="navbar">
        <Link to="/" className="nav-link">Products</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
        <Link to="/create" className="nav-link">Add Product</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </ShopProvider>
  )
}

export default App
