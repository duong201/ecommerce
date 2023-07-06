import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import classNames from 'classnames/bind'
import style from './HomeAdmin.module.scss'
const cx = classNames.bind(style)

const Widget = ({ type }) => {
  let data

  const [user, setUser] = useState([])
  const [products, setProducts] = useState([])
  const [order, setOrder] = useState([])

  useEffect(() => {
    const fecthAllUser = async () => {
      try {
        const res = await axios.get('http://localhost:8801/user')
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fecthAllUser()
    const fecthAllProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8801/products')
        setProducts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fecthAllProducts()
    const fecthAllOrder = async () => {
      try {
        const res = await axios.get('http://localhost:8801/order/list')
        setOrder(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fecthAllOrder()
  }, [])

  const totalPrice = order.reduce((price, item) => price + item.price, 0)

  switch (type) {
    case 'user':
      data = {
        title: 'Users',
        isMoney: false,
        link: '/admin/users',
        amount: user.length - 1,
        link_title: '',
        // icon: <PermIdentityIcon className="widget-icon" />,
      }
      break

    case 'product':
      data = {
        title: 'Products',
        isMoney: false,
        link: '/admin/products',
        amount: products.length,
        link_title: 'See all products',
        // icon: <ShoppingCartOutlinedIcon className="widget-icon" />,
      }
      break

    case 'order':
      data = {
        title: 'Orders',
        isMoney: false,
        amount: order.length,
        link: '/admin/list-order',
        link_title: 'See all orders',
        // icon: <MonetizationOnOutlinedIcon className="widget-icon" />,
      }
      break

    case 'balance':
      data = {
        title: 'My balance',
        isMoney: true,
        amount: Intl.NumberFormat().format(totalPrice),
        link: false,
        link_title: false,
        // icon: <AccountBalanceWalletOutlinedIcon className="widget-icon" />,
      }
      break

    default:
      break
  }

  return (
    <>
      <div className={cx('content')}>
        <div className={cx('row widget-header')} style={{ margin: '0' }}>
          <span>{data.title}</span>
          {/* <span className={cx("positive")}>
            <ExpandLessIcon className={cx("widget-icon")} />
            {diff} %
          </span> */}
        </div>
        <div className={cx('row', 'widget-count')} style={{ margin: '0' }}>
          <span>
            {data.isMoney && '$'} {data.amount}
          </span>
        </div>
        <div className={cx('row', 'widget-footer')} style={{ margin: '0' }}>
          <Link to={data.link}>{data.link_title}</Link>
          <span>{data.icon}</span>
        </div>
      </div>
    </>
  )
}

export default Widget
