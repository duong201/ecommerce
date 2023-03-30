import React from 'react'
import Sdata from './Sdata'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import classNames from 'classnames/bind'
import styles from './Home.module.scss'
const cx = classNames.bind(styles)

const Slideshow = () => {
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
          {Sdata.map((value, index) => {
            return (
              <div className={cx('slider-box')} key={index}>
                <div className={cx('slider-left')}>
                  <img src={value.coverImg} alt="" />
                </div>
                <div className={cx('slider-right')}>
                  <h1>{value.title}</h1>
                  <p>{value.description}</p>
                  <button className={cx('btn')}>Visit Collections</button>
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
