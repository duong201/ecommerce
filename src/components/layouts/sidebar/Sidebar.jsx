import React from 'react'
import { Link } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'
import { FaStoreAlt } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
const cx = classNames.bind(styles)

const Sidebar = () => {
  return <div>Sidebar</div>
}

const SidebarAdmin = () => {
  return (
    <div>
      <div className={cx('sidebar-admin')}>
        <ul className={cx('sidebar-admin-list')}>
          <li className={cx('sidebar-admin-item')}>Main</li>
          <li className={cx('sidebar-admin-item')}>
            <Link to="/admin" className={cx('sidebar-admin-link')}>
              <RxDashboard className={cx('sidebar-admin-icon')} />
              Trang chủ
            </Link>
          </li>
          <li className={cx('sidebar-admin-item')}>Danh sách</li>
          <li className={cx('sidebar-admin-item')}>
            <Link to="/admin/list-user" className={cx('sidebar-admin-link')}>
              {/* <PersonOutlineOutlinedIcon className={cx("sidebar-admin-icon" /> */}
              Người dùng
            </Link>
          </li>
          <li className={cx('sidebar-admin-item')}>
            <Link to="/admin/list-product" className={cx('sidebar-admin-link')}>
              <FaStoreAlt className={cx('sidebar-admin-icon')} />
              Sản phẩm
            </Link>
          </li>
          {/* <li className={cx("sidebar-admin-item")}>
            <Link to="/admin/list-order" className={cx("sidebar-admin-link")}>
              <CreditCardOutlinedIcon className={cx("sidebar-admin-icon" />
              Đặt hàng
            </Link>
          </li>
          <li className={cx("sidebar-admin-item")}>
            <Link to="/admin" className={cx("sidebar-admin-link")}>
              <LocalShippingOutlinedIcon className={cx("sidebar-admin-icon" />
              Vận chuyển
            </Link>
          </li>
          <li className={cx("sidebar-admin-item")}>Tiện ích</li>
          <li className={cx("sidebar-admin-item")}>
            <Link to="/admin" className={cx("sidebar-admin-link")}>
              <ChatBubbleOutlineOutlinedIcon className={cx("sidebar-admin-icon" />
              Trò chuyện
            </Link>
          </li>
          <li className={cx("sidebar-admin-item")}>
            <Link to="/admin" className={cx("sidebar-admin-link")}>
              <NotificationsNoneOutlinedIcon className={cx("sidebar-admin-icon" />
              Thông báo
            </Link>
          </li> */}
          <li className={cx('sidebar-admin-item')}>Admin</li>

          <li className={cx('sidebar-admin-item')}>
            <div className={cx('sidebar-admin-link')}>
              <BiLogOut className={cx('sidebar-admin-icon')} />
              Đăng xuất
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export { Sidebar, SidebarAdmin }
