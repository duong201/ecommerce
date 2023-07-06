import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)

const Slideshow = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fecthAllProducts = async () => {
      const res = await axios.get('http://localhost:8801/products')
      setProducts(res.data)
    }
    fecthAllProducts()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  }
  return (
    <div className={cx('slideshow-wrapper')}>
      <div className={cx('slider-card')}>
        <Slider {...settings}>
          {products
            .sort((a, b) => b.discount - a.discount)
            .slice(0, 2)
            .map((product) => {
              return (
                <div className={cx('slider-box')} key={product.id}>
                  <div className={cx('slider-left')}>
                    <img src={product.imgPrimary} alt="" />
                  </div>
                  <div className={cx('slider-right')}>
                    <h1>{product.discount}% Giảm giá</h1>
                    <p>{product.name}</p>
                    <Link to={`/product/${product.id}`} className={cx('btn')}>
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              )
            })}
          {products
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 2)
            .map((product) => {
              return (
                <div className={cx('slider-box')} key={product.id}>
                  <div className={cx('slider-left')}>
                    <img src={product.imgPrimary} alt="" />
                  </div>
                  <div className={cx('slider-right')}>
                    <h1 style={{ color: 'var(--primary-color)' }}>{product.sold} Đã bán</h1>
                    <p>{product.name}</p>
                    <Link to={`/product/${product.id}`} className={cx('btn')}>
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              )
            })}
        </Slider>
      </div>
    </div>
  )
}

export default Slideshow
