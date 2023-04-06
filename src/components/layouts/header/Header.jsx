import React from 'react'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { BsSearch, BsCart3 } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const Header = () => {
  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('container')}>
          <div className={cx('header-top')}>
            <div className={cx('header-top-content')}>
              <div className={cx('header-top-left')}>
                <ul>
                  <li>
                    <a className={cx('title')}>kênh người bán</a>
                  </li>
                  <li>
                    <a className={cx('title')}>trở thành người bán</a>
                  </li>
                  <li>
                    <a className={cx('title')}>tải ứng dụng</a>
                  </li>
                </ul>
              </div>
              <div className={cx('header-top-right')}>
                <ul>
                  <li>
                    <a className={cx('title')}>đăng nhập</a>
                  </li>
                  <li>
                    <a className={cx('title')}>đăng ký</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={cx('header-center')}>
            <div className={cx('header-center-content')}>
              <div className={cx('header-logo')}>
                <Link to="/">Tipee</Link>
              </div>
              <div className={cx('header__search')}>
                <input type="text" className={cx('header__search-input')} placeholder="Nhập để tìm kiếm" />
                <button className={cx('header__search-btn')}>
                  <BsSearch className={cx('header__search-btn-icon')} />
                </button>
              </div>
              <div className={cx('header-cart')}>
                <BsCart3 className={cx('cart-icon')} />
                <p>0</p>
              </div>
            </div>
          </div>
          <div className={cx('header-bottom')}>
            <div className={cx('header-bottom-content')}>
              <div className={cx('header-bottom-left')}></div>
              <div className={cx('header-bottom-center')}>
                <ul>
                  <li>
                    <span>áo polo</span>
                  </li>
                  <li>
                    <span>áo thun nam</span>
                  </li>
                  <li>
                    <span>giày dép nữ</span>
                  </li>
                  <li>
                    <span>phụ kiện nam</span>
                  </li>
                </ul>
              </div>
              <div className={cx('header-bottom-right')}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
