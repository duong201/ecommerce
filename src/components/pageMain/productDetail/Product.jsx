import React, { useState, useEffect } from 'react'
import { BsStarFill, BsStarHalf, BsStar, BsCartPlus } from 'react-icons/bs'
import { FaMinus, FaMoneyCheck, FaPlus } from 'react-icons/fa'

import classNames from 'classnames/bind'
import styles from './ProductDetail.module.scss'
import axios from 'axios'
const cx = classNames.bind(styles)

const Product = ({ product, addToCart, addToOrder }) => {
  const [idcate, setIdCate] = useState(product.idcategorize)
  const [size, setSize] = useState([])
  const [color, setColor] = useState([])
  const [dataColor, setDataColor] = useState('')
  const [dataSize, setDataSize] = useState('')
  const [amount, setAmount] = useState(1)
  const [disabledButton, setDisableButton] = useState(false)

  useEffect(() => {
    const fecthSize = async () => {
      const res = await axios.get(`http://localhost:8801/size/${idcate}`)
      setSize(res.data)
    }
    fecthSize()

    const fecthColor = async () => {
      const res = await axios.get(`http://localhost:8801/color/${idcate}`)
      setColor(res.data)
    }
    fecthColor()
  }, [idcate])

  const handleDataColor = (event) => {
    setDataColor(event.target.value)
  }

  const handleDataSize = (event) => {
    setDataSize(event.target.value)
  }

  useEffect(() => {
    if (amount < 2) setDisableButton(true)
  }, [amount])

  const minusAmount = () => {
    setAmount(amount - 1)
    setDisableButton(false)
  }
  const plusAmount = () => {
    setAmount(amount + 1)
    setDisableButton(false)
  }

  return (
    <div className="row" style={{ margin: '0' }}>
      <div className="l-5">
        <div
          className={cx('img-main')}
          style={{ backgroundImage: `url(${product.imgPrimary})` }}
        ></div>
        <div className={cx('img-list')}>
          <div
            className={cx('l-2', 'img-item')}
            style={{ backgroundImage: `url(${product.imgPrimary})` }}
          ></div>
          <div
            className={cx('l-2', 'img-item')}
            style={{ backgroundImage: `url(${product.imgPrimary})` }}
          ></div>
          <div
            className={cx('l-2', 'img-item')}
            style={{ backgroundImage: `url(${product.imgPrimary})` }}
          ></div>
          <div
            className={cx('l-2', 'img-item')}
            style={{ backgroundImage: `url(${product.imgPrimary})` }}
          ></div>
          <div
            className={cx('l-2', 'img-item')}
            style={{ backgroundImage: `url(${product.imgPrimary})` }}
          ></div>
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
          {color.map((color) => (
            <label key={color.id} htmlFor={`color${color.id}`} className={cx('radio-button')}>
              <input
                type="radio"
                className={cx('radio-input')}
                id={`color${color.id}`}
                name="color"
                value={color.color}
                checked={dataColor === color.color}
                onChange={handleDataColor}
              />
              <span className={cx('radio-label')}>{color.color}</span>
            </label>
          ))}
        </div>

        <div className={cx('clotherSize')}>
          <div className={cx('clotherSize-item')}>Size:</div>
          {size.map((size) => (
            <label key={size.id} htmlFor={`size${size.id}`} className={cx('radio-button')}>
              <input
                type="radio"
                className={cx('radio-input')}
                id={`size${size.id}`}
                name="size"
                value={size.size}
                checked={dataSize === size.size}
                onChange={handleDataSize}
              />
              <span className={cx('radio-label')}>{size.size}</span>
            </label>
          ))}
        </div>

        <div className={cx('product-amount')}>
          <button
            className={cx('btn-remove', `${disabledButton && 'disabled'}`)}
            onClick={() => setAmount(minusAmount)}
          >
            <FaMinus />
          </button>
          <span className={cx('amount')}>{amount}</span>
          <button className={cx('btn-remove')} onClick={() => setAmount(plusAmount)}>
            <FaPlus />
          </button>
        </div>

        <button
          className={cx('addcart-btn')}
          onClick={() => {
            dataColor && dataSize
              ? addToCart(product, dataColor, dataSize, amount)
              : console.log('error')
          }}
        >
          <BsCartPlus className={cx('addcart-icon')} />
          Thêm vào giỏ hàng
        </button>

        <button
          className={cx('addToBuy-btn')}
          onClick={() =>
            dataColor && dataSize
              ? addToOrder(product, dataColor, dataSize, amount)
              : console.log('error')
          }
        >
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
