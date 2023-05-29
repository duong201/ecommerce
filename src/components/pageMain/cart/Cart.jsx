import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Suggest from '../../layouts/suggest/Suggest'

import classNames from 'classnames/bind'
import styles from './Cart.module.scss'
import CartItem from './CartItem'
const cx = classNames.bind(styles)

const Cart = () => {
  const DATA_USER_INFO = JSON.parse(localStorage.getItem('DATA_USER_INFO'))
  const [dataCart, setDataCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const fecthAllCart = async () => {
      try {
        const res = await axios.get(`http://localhost:8801/carts/user/${DATA_USER_INFO.id}`)
        setDataCart(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fecthAllCart()
  }, [])

  const handleCartsChange = (data) => {
    const newCart = dataCart.filter((key) => key.id !== data.id)
    return setDataCart(newCart)
  }

  useEffect(() => {
    const resultTotalPrice = dataCart.reduce(
      (price, item) => price + item.amount * ((item.price * (100 - item.discount)) / 100),
      0,
    )

    setTotalPrice(resultTotalPrice)
  }, [dataCart])

  return (
    <div className={cx('grid', 'wide')}>
      <div className={cx('row')} style={{ margin: '32px 0' }}>
        <div className={cx('l-8')}>
          <div className={cx('cart-details')}>
            <div className={cx('cart-list', 'product')}>
              {dataCart.length === 0 && (
                <h1 className={cx('no-items', 'product')}>Giỏ hàng trống</h1>
              )}

              {dataCart.map((item, index) => {
                return (
                  <CartItem
                    item={item}
                    key={index}
                    iduser={DATA_USER_INFO.id}
                    handleCartsChange={handleCartsChange}
                  />
                )
              })}
            </div>
          </div>
        </div>
        <div className={cx('l-4')}>
          <div className={cx('cart-total')}>
            <div className={cx('total-header')}>
              <span>Tổng thanh toán</span>
            </div>
            <div className={cx('total-price')}>
              <p>Tổng tiền:</p>
              <span>{Intl.NumberFormat().format(totalPrice)} đ</span>
            </div>
            <Link to="/home/order" className={cx('btn')}>
              Thanh toán
            </Link>
          </div>
        </div>
      </div>
      <div className={cx('row')} style={{ margin: '32px 0' }}>
        <Suggest />
      </div>
    </div>
  )
}

export default Cart
