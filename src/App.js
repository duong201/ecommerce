import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FirstLayout from './components/layouts/firstLayout/FirstLayout'
import AdminPage from './components/pageAdmin/AdminPage'
import About from './components/pageMain/about/About'
import MainPage from './components/pageMain/MainPage'
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
            <Route index element={<MainPage />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<ErrorPages />} />
          </Route>
          <Route path="/admin" element={<AdminPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
