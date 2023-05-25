import React from 'react'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

import classNames from 'classnames/bind'
import styles from './ProductDetail.module.scss'
const cx = classNames.bind(styles)

const CommentItem = () => {
  return (
    <div className={cx('userComment-item', 'row')} style={{ margin: 0 }}>
      <div className={cx('userComment-logo', 'l-1')}>
        <div className={cx('logo')}></div>
      </div>
      <div className={cx('userComment-body', 'l-11')}>
        <span className={cx('userComment-name')}>theduong2010</span>
        <span className={cx('userComment-rate')}>
          <BsStarFill className={cx('prevRate-icon')} />
          <BsStarFill className={cx('prevRate-icon')} />
          <BsStarFill className={cx('prevRate-icon')} />
          <BsStarHalf className={cx('prevRate-icon')} />
          <BsStar className={cx('prevRate-icon')} />
        </span>
        <span className={cx('userComment-time')}>2023-02-14 09:10</span>
        <span className={cx('userComment-text')}>Không có nội dung.</span>
      </div>
    </div>
  )
}

export default CommentItem
