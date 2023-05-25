import React from 'react'

import classNames from 'classnames/bind'
import styles from './ProductDetail.module.scss'
const cx = classNames.bind(styles)

const InfoProduct = () => {
  return (
    <div className={cx('info-wrapper')}>
      <div className={cx('info-content')}>
        <h1>info</h1>
      </div>
    </div>
  )
}

export default InfoProduct
