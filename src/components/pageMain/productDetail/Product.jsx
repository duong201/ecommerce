import React from 'react'
import { BsStarFill, BsStarHalf, BsStar, BsCartPlus } from 'react-icons/bs'
import { FaMoneyCheck } from 'react-icons/fa'

import classNames from 'classnames/bind'
import styles from './ProductDetail.module.scss'
const cx = classNames.bind(styles)

const Product = ({ product, addToCart }) => {
  return (
    <div className="row" style={{ margin: '0' }}>
      <div className="l-5">
        <div className={cx('img-main')} style={{ backgroundImage: `url(${product.imgPrimary})` }}></div>
        <div className={cx('img-list')}>
          <div className={cx('l-2', 'img-item')} style={{ backgroundImage: `url(${product.imgPrimary})` }}></div>
          <div className={cx('l-2', 'img-item')} style={{ backgroundImage: `url(${product.imgPrimary})` }}></div>
          <div className={cx('l-2', 'img-item')} style={{ backgroundImage: `url(${product.imgPrimary})` }}></div>
          <div className={cx('l-2', 'img-item')} style={{ backgroundImage: `url(${product.imgPrimary})` }}></div>
          <div className={cx('l-2', 'img-item')} style={{ backgroundImage: `url(${product.imgPrimary})` }}></div>
        </div>
      </div>

      <div className={cx('l-7', 'describe')}>
        <span className={cx('name')}>{product.name}</span>

        <ul className={cx('list-reviews')}>
          <li className={cx('item-reviews', 'separate')}>
            <span>3.5</span>
            <div className={cx('rate')}>
              <BsStarFill className={cx('rate-item')} />
              <BsStarFill className={cx('rate-item')} />
              <BsStarFill className={cx('rate-item')} />
              <BsStarHalf className={cx('rate-item')} />
              <BsStar className={cx('rate-item')} />
            </div>
          </li>
          <li className={cx('item-reviews', 'separate')}>
            <span>{product.discount}</span>
            Đánh giá
          </li>
          <li className={cx('item-reviews')}>
            <span>{product.sold}</span>
            Đã bán
          </li>
        </ul>

        <div className={cx('price')}>
          <span>{Intl.NumberFormat().format(product.price)}</span>
          <span>
            {Intl.NumberFormat().format((product.price * (100 - product.discount)) / 100)}
            <i>đ</i>
          </span>
          <span className={cx('discountPrice')}>{product.discount}% Giảm</span>
        </div>

        <div className={cx('clotherColor')}>
          <div className={cx('clotherColor-item')}>Màu:</div>
          <div className={cx('clotherColor-item')}>Đen</div>
          <div className={cx('clotherColor-item')}>Trắng</div>
          <div className={cx('clotherColor-item')}>Xám</div>
        </div>

        <div className={cx('clotherSize')}>
          <div className={cx('clotherSize-item')}>Size:</div>
          <div className={cx('clotherSize-item')}>28</div>
          <div className={cx('clotherSize-item')}>29</div>
          <div className={cx('clotherSize-item')}>30</div>
        </div>

        <button className={cx('addcart-btn')} onClick={() => addToCart(product)}>
          <BsCartPlus className={cx('addcart-icon')} />
          Thêm vào giỏ hàng
        </button>

        <button className={cx('addToBuy-btn')}>
          <FaMoneyCheck className={cx('addcart-icon')} />
          Mua ngay
        </button>

        {/* <span id="notiCart" className={cx('notiCart')}>
                Bạn cần đăng nhập để thêm vào giỏ hàng.
              </span> */}
      </div>
    </div>
  )
}

export default Product
