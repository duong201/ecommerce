import React from 'react'
import { Outlet } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from './FirstLayout.module.scss'
import Footer from '../Footer'
import Header from '../Header'

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
