import React, { useEffect, useState } from 'react'
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
import Order from './components/pageMain/order/Order'
import UsersAdmin from './components/pageAdmin/usersAdmin/UsersAdmin'
import ProductsAdmin from './components/pageAdmin/productsAdmin/ProductsAdmin'
import AddProducts from './components/pageAdmin/productsAdmin/AddProducts'
import PageSearch from './components/pageMain/pageSearch/PageSearch'

const DATA_USER_INFO = JSON.parse(localStorage.getItem('DATA_USER_INFO'))

function App() {
  useEffect(() => {
    document.title = 'Tipee'
  }, [])

  const [changeCartLength, setChangeCartLength] = useState(0)

  const handleChangeCartLength = (data) => {
    setChangeCartLength(changeCartLength + data)
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstLayout changeCartLength={changeCartLength} />}>
            <Route index element={<Home />} />
            <Route
              path="product/:id"
              element={<ProductDetail handleChangeCartLength={handleChangeCartLength} />}
            />
            <Route path="products" element={<Products />} />
            <Route path="about" element={<About />} />
            <Route path="user-info" element={<UserInfo />} />
            <Route path="contract" element={<Contract />} />
            <Route path="search/:inputSearch" element={<PageSearch />} />
            <Route path="*" element={<ErrorPages />} />
          </Route>
          <Route path="/home" element={<SecondLayout />}>
            <Route path="cart" element={<Cart />} />
            <Route path="order" element={<Order />} />
            <Route path="user/:user" element={<Login />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="users" element={<UsersAdmin />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="products/add" element={<AddProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
