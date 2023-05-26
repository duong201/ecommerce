import React from 'react'

import classNames from 'classnames/bind'
import styles from './ProductDetail.module.scss'
import { IsRated, RoundToNearestHalf } from './IsRated'
const cx = classNames.bind(styles)

const CommentItem = ({ comment }) => {
  return (
    <div className={cx('userComment-item', 'row')} style={{ margin: 0 }}>
      <div className={cx('userComment-logo', 'l-1')}>
        <div className={cx('logo')}></div>
      </div>
      <div className={cx('userComment-body', 'l-11')}>
        <span className={cx('userComment-name')}>{comment.username}</span>
        <span className={cx('userComment-rate')}>
          <IsRated rating={RoundToNearestHalf(comment.rate)} />
        </span>
        <span className={cx('userComment-time')}>2023-02-14 09:10</span>
        <span className={cx('userComment-text')}>{comment.comment ? comment.comment : 'Không có nội dung.'}</span>
      </div>
    </div>
  )
}

export default CommentItem
