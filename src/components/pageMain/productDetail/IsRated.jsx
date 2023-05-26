import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'

import classNames from 'classnames/bind'
import styles from './ProductDetail.module.scss'
const cx = classNames.bind(styles)

const IsRated = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const halfStars = Math.round(rating - fullStars)
  const stars = []

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<BsStarFill key={i} className={cx('prevRate-icon')} />)
    } else if (i === fullStars + 1 && halfStars === 1) {
      stars.push(<BsStarHalf key={i} className={cx('prevRate-icon')} />)
    } else {
      stars.push(<BsStar key={i} className={cx('prevRate-icon')} />)
    }
  }

  return <span>{stars}</span>
}

function RoundToNearestHalf(num) {
  return (Math.ceil(num * 2) / 2).toFixed(1)
}

export { IsRated, RoundToNearestHalf }
