import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import axios from 'axios'
import { IoMdFlash } from 'react-icons/io'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

import classNames from 'classnames/bind'
import styles from './Home.module.scss'
const cx = classNames.bind(styles)

const NextArrow = (props) => {
  const { onClick } = props
  return (
    <div className={cx('control-btn')} onClick={onClick}>
      <button className={cx('plash-deal-next')}>
        <BiChevronRight />
      </button>
    </div>
  )
}

const PrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className={cx('control-btn')} onClick={onClick}>
      <button className={cx('plash-deal-prev')}>
        <BiChevronLeft />
      </button>
    </div>
  )
}

const PlashDeal = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fecthAllProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8801/products')
        setProducts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fecthAllProducts()
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  return (
    <div className={cx('plashdeal-wrapper')}>
      <div className="container">
        <div className="row" style={{ margin: '0' }}>
          <div className="l-8">
            <div className={cx('flasdeal-title')}>
              <h2>
                <IoMdFlash />
                flash sale
              </h2>
            </div>
            <div className="l-4"></div>
          </div>
        </div>
        <div className={cx('flasdeal-bottom')}>
          <Slider {...settings}>
            {products.map((products) => {
              return (
                <div className={cx('flasdeal-box')} key={products.id}>
                  <div className={cx('product')}>
                    <span className={cx('discount')}>- {products.discount} %</span>
                    <div className={cx('img')} style={{ backgroundImage: `url(${products.imgPrimary})` }}></div>
                    <div className={cx('product-details')}>
                      <span className={cx('name')}>{products.name}</span>
                      <div className={cx('price')}>
                        <span className={cx('new-price')}>
                          {Intl.NumberFormat().format((products.price * (100 - products.discount)) / 100)}
                        </span>
                        <span className={cx('old-price')}>{Intl.NumberFormat().format(products.price)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default PlashDeal
