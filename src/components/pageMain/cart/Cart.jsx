import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaMinus, FaPlus } from 'react-icons/fa'

import classNames from 'classnames/bind'
import styles from './Cart.module.scss'
import Suggest from '../../layouts/suggest/Suggest'
const cx = classNames.bind(styles)

const Cart = () => {
  const DATA_USER_INFO = JSON.parse(localStorage.getItem('DATA_USER_INFO'))
  const [dataCart, setDataCart] = useState([])

  useEffect(() => {
    // const fecthCart = async () => {
    //   const res = await axios.get(`http://localhost:8801/cart/${DATA_USER_INFO.id}`)
    //   setDataCart(res.data)
    // }
    // fecthCart()
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

  const totalPrice = dataCart.reduce(
    (price, item) => price + item.amount * ((item.price * (100 - item.discount)) / 100),
    0,
  )

  return (
    <div className={cx('grid', 'wide')}>
      <div className={cx('row')} style={{ margin: '32px 0' }}>
        <div className={cx('l-8')}>
          <div className={cx('cart-details')}>
            {dataCart.length === 0 && <h1 className={cx('no-items', 'product')}>Giỏ hàng trống</h1>}

            {dataCart.map((item, index) => {
              const productAmount = ((item.price * (100 - item.discount)) / 100) * item.amount
              return (
                <div className={cx('cart-list', 'product')} key={index}>
                  <div className={cx('row', 'cart-item')} style={{ margin: '1rem 0' }}>
                    <div className={cx('l-2', 'img')}>
                      <img src={item.imgPrimary} alt="" />
                    </div>

                    <div className={cx('l-5', 'name')}>
                      <Link to={`/product-detail/${item.idproduct}`}>{item.name}</Link>
                      <div className={cx('original-price')}>
                        <span className={cx('old-price')}>{Intl.NumberFormat().format(item.price)}</span>
                        <span className={cx('new-price')}>
                          {Intl.NumberFormat().format((item.price * (100 - item.discount)) / 100)}
                        </span>
                      </div>
                    </div>

                    <div className={cx('l-2', 'price', 't-a-ct', 'box-amount')}>
                      <button className={cx('btn', 'btn-rem')}>
                        <FaMinus />
                      </button>
                      <span className={cx('primary-text', 'amount')}>{item.amount}</span>
                      <button className={cx('btn', 'btn-add')}>
                        <FaPlus />
                      </button>
                    </div>

                    <span className={cx('l-2', 't-a-ct', 'primary-text')}>
                      {Intl.NumberFormat().format(productAmount)}
                    </span>

                    <div className={cx('l-1', 'cart-items-function')}>
                      <div className={cx('remove-cart')}>
                        <button className={cx('btn')}>Xóa</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
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
