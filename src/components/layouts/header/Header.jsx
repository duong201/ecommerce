import React from 'react'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { BsGrid, BsChevronDown, BsSearch, BsPerson, BsCart3 } from 'react-icons/bs'
import { IoIosGitCompare, IoIosHeartEmpty } from 'react-icons/io'

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
                <span>Tipee</span>
              </div>
              <div className={cx('header-search')}>
                <input type="text" placeholder="Search here..." />
                <div className={cx('search-icon')}>
                  <BsSearch />
                </div>
              </div>
              <div className={cx('header-option')}>
                <div className={cx('header-option-item')}>
                  <IoIosGitCompare className={cx('header-option-icon')} />
                  <span>compare</span>
                </div>
                <div className={cx('header-option-item')}>
                  <IoIosHeartEmpty className={cx('header-option-icon')} />
                  <span>favourite</span>
                </div>
                <div className={cx('header-option-item')}>
                  <BsPerson className={cx('header-option-icon')} />
                  <span>login</span>
                </div>
                <div className={cx('header-option-item')}>
                  <BsCart3 className={cx('cart-icon')} />
                  <p>+0</p>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('header-bottom')}>
            <div className={cx('header-bottom-content')}>
              <ul>
                <li>
                  <div className={cx('categories-title')} href="#">
                    <BsGrid className={cx('categories-icon')} />
                    <span>Danh mục</span>
                    <BsChevronDown className={cx('categories-icon')} />
                  </div>
                </li>
                <li>
                  <Link className={cx('categories-title')} to="/">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link className={cx('categories-title')} to="/products">
                    Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link className={cx('categories-title')} to="/contract">
                    Liện hệ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
