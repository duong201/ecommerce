import React from 'react'
import {
  BsSearch,
  BsPersonLinesFill,
  BsGlobe,
  BsMoon,
  BsChatLeft,
  BsListUl,
  BsGear,
} from 'react-icons/bs'
import { IoLogOutOutline } from 'react-icons/io5'
import { FaCompress, FaRegBell, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import HeaderCart from './HeaderCart'

import classNames from 'classnames/bind'
import styles from './Header.module.scss'
const cx = classNames.bind(styles)

const DATA_USER_INFO = JSON.parse(localStorage.getItem('DATA_USER_INFO'))

const Navbar = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('DATA_USER_INFO')

    window.location.href = '/home/user/login'
  }

  return (
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
          {DATA_USER_INFO ? (
            <>
              <ul>
                <li>
                  <div className={cx('title', 'popupUser')} style={{ textTransform: 'none' }}>
                    <div className={cx('avtUser')}></div>
                    <p>{DATA_USER_INFO.username}</p>
                    <div className={cx('userOption')}>
                      <span
                        onClick={() => {
                          navigate('/user-info')
                        }}
                        className={cx('myInfo')}
                      >
                        <BsPersonLinesFill />
                        &nbsp;Hồ sơ
                      </span>
                      <span className={cx('logout')} onClick={logout}>
                        <IoLogOutOutline />
                        &nbsp;Đăng xuất
                      </span>
                    </div>
                  </div>
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
  )
}

const Header = () => {
  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('container')}>
          <Navbar />
          <div className={cx('header-center')}>
            <div className={cx('header-center-content')}>
              <div className={cx('header-logo')}>
                <Link to="/">Tipee</Link>
              </div>
              <div className={cx('header__search')}>
                <input
                  type="text"
                  className={cx('header__search-input')}
                  placeholder="Nhập để tìm kiếm"
                />
                <button className={cx('header__search-btn')}>
                  <BsSearch className={cx('header__search-btn-icon')} />
                </button>
              </div>
              {DATA_USER_INFO ? <HeaderCart iduser={DATA_USER_INFO.id} /> : <HeaderCart />}
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
      <Navbar />
      <div className="grid wide">
        <div className={cx('header2-container')}>
          <Link to="/" className={cx('header2-logo')}>
            Tipee
          </Link>
          <Link to="/">Bạn cần giúp đỡ?</Link>
        </div>
      </div>
    </div>
  )
}

const HeaderAdmin = () => {
  return (
    <div className={cx('header-admin')}>
      <Link to="/admin" className={cx('header-admin-logo')}>
        <span>Tipee</span>
      </Link>
      <div className={cx('navbar-admin')}>
        <div className={cx('navbar-admin-wrapper')}>
          <div className={cx('navbar-admin-search')}>
            <input type="text" placeholder="Tìm kiếm..." name="" id="" />
            <BsSearch />
          </div>
          <ul className={cx('navbar-admin-list')}>
            <li className={cx('navbar-admin-item')}>
              <Link to="/admin" className={cx('navbar-admin-link')}>
                <BsGlobe />
                <span className={cx('navbar-admin-language')}>VIE</span>
              </Link>
            </li>
            <li className={cx('navbar-admin-item')}>
              <Link to="/admin" className={cx('navbar-admin-link')}>
                <BsMoon />
              </Link>
            </li>
            <li className={cx('navbar-admin-item')}>
              <Link to="/admin" className={cx('navbar-admin-link')}>
                <FaCompress />
              </Link>
            </li>
            <li className={cx('navbar-admin-item')}>
              <Link to="/admin" className={cx('navbar-admin-link')}>
                <FaRegBell />
                <div className={cx('navbar-admin-counter')}>9+</div>
              </Link>
            </li>
            <li className={cx('navbar-admin-item')}>
              <Link to="/admin" className={cx('navbar-admin-link')}>
                <BsChatLeft />
                <div className={cx('navbar-admin-counter')}>9+</div>
              </Link>
            </li>
            <li className={cx('navbar-admin-item')}>
              <Link to="/admin" className={cx('navbar-admin-link')}>
                <BsListUl />
              </Link>
            </li>
            <li className={cx('navbar-admin-item')}>
              <Link to="/admin" className={cx('navbar-admin-link')}>
                <FaUser />
              </Link>
            </li>
            <li className={cx('navbar-admin-item')}>
              <Link to="/admin" className={cx('navbar-admin-link')}>
                <BsGear />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { Header, Header2, HeaderAdmin }
