import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'

import classNames from 'classnames/bind'
import styles from './Cart.module.scss'
const cx = classNames.bind(styles)

const CartItem = ({ item, iduser, handleCartsChange, handleChangeAmount }) => {
  const [amount, setAmount] = useState(item.amount)
  const [isChecked, setChecked] = useState(item.checked === 1 ? true : false)

  const minusAmount = async () => {
    await axios
      .post(`http://localhost:8801/remove-to-cart/${item.id}`, {
        amount: amount,
        iduser: iduser,
        idproduct: item.idproduct,
      })
      .then((res) => {
        if (res.data.status === 'update-success') {
          setAmount(amount - 1)
          handleChangeAmount(1)
        } else if (res.data.status === 'delete-success') {
          handleCartsChange(item)
        } else {
          console.log('Chỉnh sửa giỏ hàng không thành công!')
        }
      })
      .catch((err) => console.log(err))
  }

  const plusAmount = async () => {
    await axios
      .post('http://localhost:8801/update-to-cart', {
        amount: amount,
        idproduct: item.idproduct,
      })
      .then((res) => {
        if (res.data.status === 'success') {
          setAmount(amount + 1)
          handleChangeAmount(1)
        } else {
          console.log('Chỉnh sửa giỏ hàng không thành công!')
        }
      })
      .catch((err) => console.log(err))
  }

  const deleteCartItem = async () => {
    await axios.delete(`http://localhost:8801/delete-cartItem/${item.id}`).then((response) => {
      if (response.data.status === 'success') {
        handleCartsChange(item)
      }
    })
  }

  const handleChecked = async () => {
    setChecked(!isChecked)
    handleChangeAmount(1)
    isChecked
      ? await axios
          .post('http://localhost:8801/cart/checked', {
            idCart: item.id,
            checked: 0,
          })
          .then((res) => {
            if (res.data.status === 'success') {
              console.log(res.data.status)
              handleChangeAmount(1)
            }
          })
          .catch((err) => console.log(err))
      : await axios
          .post('http://localhost:8801/cart/checked', {
            idCart: item.id,
            checked: 1,
          })
          .then((res) => {
            if (res.data.status === 'success') {
              console.log(res.data.status)
              handleChangeAmount(1)
            }
          })
          .catch((err) => console.log(err))
  }

  const productPriceTotal = ((item.price * (100 - item.discount)) / 100) * amount

  return (
    <div className={cx('row', 'cart-item', 'ischecked')} style={{ margin: '1rem 0' }}>
      <div className={cx('l-2', 'img')}>
        <input type="checkbox" checked={isChecked} onChange={handleChecked} />
        <img src={item.imgPrimary} alt="" />
      </div>

      <div className={cx('l-5', 'name')}>
        <Link to={`/product/${item.idproduct}`}>{item.name}</Link>
        <div className={cx('original-price')}>
          <span className={cx('old-price')}>{Intl.NumberFormat().format(item.price)}</span>
          <span className={cx('new-price')}>
            {Intl.NumberFormat().format((item.price * (100 - item.discount)) / 100)}
          </span>
          <span className={cx('type')}>Loại: {item.color + ', ' + item.size}</span>
        </div>
      </div>

      <div className={cx('l-2', 'price', 't-a-ct', 'box-amount')}>
        <button className={cx('btn', 'btn-rem')} onClick={minusAmount}>
          <FaMinus />
        </button>
        <span className={cx('primary-text', 'amount')}>{amount}</span>
        <button className={cx('btn', 'btn-add')} onClick={plusAmount}>
          <FaPlus />
        </button>
      </div>

      <span className={cx('l-2', 't-a-ct', 'primary-text')}>
        {Intl.NumberFormat().format(productPriceTotal)}
      </span>

      <div className={cx('l-1', 'cart-items-function')}>
        <div className={cx('remove-cart')}>
          <button className={cx('btn')} onClick={() => deleteCartItem(item)}>
            Xóa
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
