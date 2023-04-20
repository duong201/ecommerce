import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '../footer/Footer'
import { Header, Header2 } from '../header/Header'

const FirstLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const SecondLayout = () => {
  return (
    <>
      <Header2 />
      <Outlet />
      <Footer />
    </>
  )
}

export { FirstLayout, SecondLayout }
