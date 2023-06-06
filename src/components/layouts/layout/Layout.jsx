import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import { Header, Header2, HeaderAdmin } from '../header/Header'
import { SidebarAdmin } from '../sidebar/Sidebar'

const FirstLayout = ({ changeCartLength }) => {
  return (
    <>
      <Header changeCartLength={changeCartLength} />
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

const AdminLayout = () => {
  return (
    <>
      <div className="grid">
        <div className="row" style={{ margin: '0' }}>
          <HeaderAdmin />
        </div>
        <div className="row" style={{ margin: '0', marginTop: '5.4rem', width: '100%' }}>
          <SidebarAdmin />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export { FirstLayout, SecondLayout, AdminLayout }
