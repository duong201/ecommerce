import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '../footer/Footer'
import Header from '../header/Header'

import classNames from 'classnames/bind'
import styles from './FirstLayout.module.scss'
const cx = classNames.bind(styles)

const FirstLayout = () => {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default FirstLayout
