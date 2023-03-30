import React, { useEffect } from 'react'
import './grid.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FirstLayout from './components/layouts/firstLayout/FirstLayout'
import AdminPage from './components/pageAdmin/AdminPage'
import About from './components/pageMain/about/About'
import Contract from './components/pageMain/contract/Contract'
import Home from './components/pageMain/home/Home'
import Product from './components/pageMain/product/Product'
import ErrorPages from './pages/ErrorPages'

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
            <Route path="products" element={<Product />} />
            <Route path="about" element={<About />} />
            <Route path="contract" element={<Contract />} />
            <Route path="*" element={<ErrorPages />} />
          </Route>
          <Route path="/admin" element={<AdminPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
