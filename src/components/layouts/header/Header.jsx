import React from 'react'
import { BsSearch, BsCart3 } from 'react-icons/bs'
import { IoLogOutOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './Header.module.scss'
const cx = classNames.bind(styles)

const Header = () => {
  const idUser = sessionStorage.getItem('id')
  const username = sessionStorage.getItem('name')

  const logout = () => {
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('name')

    window.location.reload()
  }

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
                {username ? (
                  <>
                    <ul>
                      <li>
                        <Link to="/" className={cx('title', 'popupUser')} style={{ textTransform: 'none' }}>
                          <div className={cx('avtUser')}></div>
                          {username}
                          <div className={cx('userOption')}>
                            <span className={cx('logout')} onClick={logout}>
                              <IoLogOutOutline />
                              &nbsp;Đăng xuất
                            </span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul>
                      <li>
                        <Link to="/home/user/login" className={cx('title')}>
                          đăng nhập
                        </Link>
                      </li>
                      <li>
                        <Link to="/home/user/logout" className={cx('title')}>
                          đăng ký
                        </Link>
                      </li>
                    </ul>
                  </>
                )}
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
                <Link to="/home/cart">
                  <BsCart3 className={cx('cart-icon')} />
                </Link>
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

const Header2 = () => {
  return (
    <div className={cx('header2-wrapper')}>
      <div className="grid wide">
        <div className={cx('header2-container')}>
          <Link to="/" className={cx('header2-logo')}>
            Tipee
          </Link>
          <a to="/">Bạn cần giúp đỡ?</a>
        </div>
      </div>
    </div>
  )
}

export { Header, Header2 }
