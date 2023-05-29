import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { BsCartCheck } from 'react-icons/bs'

import classNames from 'classnames/bind'
import styles from './Order.module.scss'
const cx = classNames.bind(styles)

const Order = () => {
  const [product, setProduct] = useState({})

  const DATA_USER_INFO = JSON.parse(localStorage.getItem('DATA_USER_INFO'))
  const [dataCart, setDataCart] = useState([])

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

  useEffect(() => {
    const fecthProduct = async () => {
      const res = await axios.get(`http://localhost:8801/product/${2}`)
      setProduct(res.data)
    }
    fecthProduct()
  }, [])

  return (
    <div className={cx('grid', 'wide')}>
      <div className={cx('row', 'order-address')} style={{ margin: '16px 0' }}>
        <h2 className={cx('address-title')}>
          <FaMapMarkerAlt className={cx('icon')} />
          Địa chỉ nhận hàng
        </h2>
        <div className={cx('row', 'address-content')} style={{ margin: 0 }}>
          <div className={cx('address-name', 'l-2')}>
            <span>Truong The Duong</span>
            <span>0385572171</span>
          </div>
          <div className={cx('address-address', 'l-8')}>
            <span>
              Trường Đại Học Công Nghệ Thông Tin Và Truyền Thông Việt Hàn, 470 Trần Đại Nghĩa,
              Phường Hòa Hải, Quận Ngũ Hành Sơn, Đà Nẵng
            </span>
          </div>
          <div className={cx('address-change', 'l-2')}>
            <button>Thay đổi</button>
          </div>
        </div>
      </div>

      <div className={cx('row', 'order-product')} style={{ margin: '0 0 16px 0' }}>
        <div className={cx('row', 'product-title')}>
          <h2 className={cx('l-6', 'title-main')}>
            <BsCartCheck className={cx('icon')} />
            Sản phẩm
          </h2>
          <span className={cx('l-2', 'title-totalMoney')}>Thành tiền</span>
          <span className={cx('l-2', 'title-totalMoney')}>Thành tiền</span>
          <span className={cx('l-2', 'title-totalMoney')}>Thành tiền</span>
        </div>
        <div className={cx('row', 'product-content')} style={{ margin: 0 }}>
          <div className={cx('product-item')}>
            <div
              className={cx('product-img')}
              style={{ backgroundImage: `url(${product.imgPrimary})` }}
            ></div>
            <span className={cx('product-name')}>{product.name}</span>
            <span className={cx('product-type')}></span>
          </div>
        </div>
        <div className={cx('row', 'product-totalMoney')} style={{ margin: 0 }}>
          <span className={cx('totalMoney-titleMoney')}>Tổng số tiền :</span>
          <span className={cx('totalMoney-numberMoney')}>
            {product.price}
            <p>đ</p>
          </span>
        </div>
      </div>

      <div className={cx('row', 'order-payment')} style={{ margin: '0 0 16px 0' }}>
        <div className={cx('payment-title')}>
          <h2 className={cx('payment-mainTitle')}>
            <BsCartCheck className={cx('icon')} />
            Sản phẩm
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Order
