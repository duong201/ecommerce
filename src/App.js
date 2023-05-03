import React, { useEffect } from 'react'
import './grid.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminLayout, FirstLayout, SecondLayout } from './components/layouts/layout/Layout'
import AdminPage from './components/pageAdmin/homeAdmin/HomeAdmin'
import About from './components/pageMain/about/About'
import Contract from './components/pageMain/contract/Contract'
import Home from './components/pageMain/home/Home'
import ErrorPages from './pages/ErrorPages'
import ProductDetail from './components/pageMain/productDetail/ProductDetail'
import Login from './components/layouts/login/Login'
import Products from './components/pageMain/products/Products'
import Cart from './components/pageMain/cart/Cart'
import UserInfo from './components/pageMain/userInfo/UserInfo'

function App() {
  useEffect(() => {
    document.title = 'Tipee'
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstLayout />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="products" element={<Products />} />
            <Route path="about" element={<About />} />
            <Route path="user-info" element={<UserInfo />} />
            <Route path="contract" element={<Contract />} />
            <Route path="*" element={<ErrorPages />} />
          </Route>
          <Route path="/home" element={<SecondLayout />}>
            <Route path="cart" element={<Cart />} />
            <Route path="user/:user" element={<Login />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
