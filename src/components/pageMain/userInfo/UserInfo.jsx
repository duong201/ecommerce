import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { BsPencil } from 'react-icons/bs'

import classNames from 'classnames/bind'
import styles from './UserInfo.module.scss'
const cx = classNames.bind(styles)

const DATA_USER_INFO = JSON.parse(localStorage.getItem('DATA_USER_INFO'))

const UserInfo = () => {
  const [dataCart, setDataCart] = useState([])
  useEffect(() => {
    const fecthAllCart = async () => {
      try {
        const res = await axios.get(`http://localhost:8801/order/user/${DATA_USER_INFO.id}`)
        setDataCart(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fecthAllCart()
  }, [])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('grid', 'wide', 'container')}>
        <div className={cx('row')} style={{ margin: 0, height: '100%' }}>
          <div className={cx('l-2', 'sidebar')}>
            <div className={cx('info')}>
              <div className={cx('avt')}></div>
              <div className={cx('name')}>
                <span>{DATA_USER_INFO.username}</span>
                <span>
                  <BsPencil />
                  Sửa hồ sơ
                </span>
              </div>
            </div>
            <ul>
              <li>
                <span>Tài khoản của tôi</span>
              </li>
              <li>
                <span className={cx('active')}>Đơn mua</span>
              </li>
              <li>
                <span>Thông báo</span>
              </li>
            </ul>
          </div>
          <div className={cx('l-10', 'body')}>
            <div className={cx('body-container')}>
              <div className={cx('userInfo-header')}>
                <span className={cx('active')} style={{ width: '15%' }}>
                  Tất cả
                </span>
                <span style={{ width: '15%' }}>Đang chuẩn bị </span>
                <span style={{ width: '15%' }}>Đang giao </span>
                <span style={{ width: '15%' }}>Đã nhận hàng</span>
              </div>
              <div className={cx('userInfo-body')}>
                <div className={cx('product-header')}>
                  <div className={cx('img-name')} style={{ width: '40%' }}>
                    <span>Sản phẩm</span>
                  </div>
                  <span
                    className={cx('product-type')}
                    style={{ width: '10%', textAlign: 'center' }}
                  ></span>

                  <span
                    className={cx('product-amount')}
                    style={{ width: '10%', textAlign: 'center' }}
                  >
                    Số lượng
                  </span>
                  <span
                    className={cx('product-totalprice')}
                    style={{ width: '14%', textAlign: 'left' }}
                  >
                    Tổng tiền
                  </span>
                  <span style={{ width: '20%', textAlign: 'left' }}>Trạng thái</span>
                  <span style={{ width: '6%', textAlign: 'center' }}></span>
                </div>
                {dataCart.map((item) => {
                  return (
                    <Fragment key={item.id}>
                      <div className={cx('product-item')}>
                        <div className={cx('img-name')} style={{ width: '40%' }}>
                          <div
                            className={cx('product-img')}
                            style={{ backgroundImage: `url(${item.imgPrimary})` }}
                          ></div>
                          <p className={cx('product-name')}>
                            <span>{item.name}</span>
                          </p>
                        </div>
                        <span
                          className={cx('product-type')}
                          style={{ width: '10%', textAlign: 'center' }}
                        >
                          {item.description}
                        </span>

                        <span
                          className={cx('product-amount')}
                          style={{ width: '10%', textAlign: 'center' }}
                        >
                          {item.amount}
                        </span>
                        <span
                          className={cx('product-totalprice')}
                          style={{ width: '14%', textAlign: 'left' }}
                        >
                          {Intl.NumberFormat().format(item.price)}
                        </span>
                        <span
                          style={{ width: '20%', textAlign: 'left', color: 'var(--red-color)' }}
                        >
                          {item.status}
                        </span>
                        <span
                          className={cx('cancel')}
                          style={{
                            width: '6%',
                            textAlign: 'center',
                          }}
                        >
                          Hủy
                        </span>
                      </div>
                    </Fragment>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
