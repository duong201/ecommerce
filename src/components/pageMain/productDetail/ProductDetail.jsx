import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Suggest from '../../layouts/suggest/Suggest'
import { BsStarFill, BsStarHalf, BsStar, BsCartPlus } from 'react-icons/bs'

import classNames from 'classnames/bind'
import styles from './ProductDetail.module.scss'
const cx = classNames.bind(styles)

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fecthProduct = async () => {
      const res = await axios.get(`http://localhost:8801/product/${id}`)
      setProduct(res.data)
    }
    fecthProduct()
  }, [id])

  return (
    <main>
      <div className="grid wide">
        <div className={cx('box-details')} key={product.id}>
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

              <button className={cx('addcart-btn')}>
                <BsCartPlus className={cx('addcart-icon')} />
                Thêm vào giỏ hàng
              </button>

              {/* <span id="notiCart" className={cx('notiCart')}>
                Bạn cần đăng nhập để thêm vào giỏ hàng.
              </span> */}
            </div>
          </div>
        </div>
        <div className="row" style={{ margin: '0' }}>
          <Suggest />
        </div>
      </div>
    </main>
  )
}

export default ProductDetail
