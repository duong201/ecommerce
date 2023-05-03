import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BsPencil } from 'react-icons/bs'

import classNames from 'classnames/bind'
import styles from './UserInfo.module.scss'
const cx = classNames.bind(styles)

const DATA_USER_INFO = JSON.parse(localStorage.getItem('DATA_USER_INFO'))

const UserInfo = () => {
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
                <span>Đơn mua</span>
              </li>
              <li>
                <span>Thông báo</span>
              </li>
            </ul>
          </div>
          <div className={cx('l-10', 'body')}>
            <div className={cx('body-container')}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
