import React from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './Home.module.scss'
const cx = classNames.bind(styles)

const Category = () => {
  const data = [
    'Thời trang nữ',
    'Thời trang nam',
    'Giày dép nữ',
    'Giày dép nam',
    'Phụ kiện nữ',
    'Phụ kiện nam',
    'Đồng hồ',
    'Thiết bị điện tử',
    'Phụ kiện & điện thoại',
    'Thiết bị gia dụng',
    'Mẹ & Bé',
    'Nhà cửa & đời sống',
    'Thể thao & du lịch',
    'Sắc đẹp & sức khỏe',
    'Nhà sách online',
  ]

  return (
    <div className={cx('category-wrapper')}>
      <div className={cx('category')}>
        {data.map((value, index) => {
          return (
            <Link className={cx('category-link')} to="/products" key={index}>
              <span>{value}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Category
