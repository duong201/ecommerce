import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'

import classNames from 'classnames/bind'
import styles from './Cart.module.scss'
const cx = classNames.bind(styles)

const CartItem = ({ item, iduser, handleCartsChange }) => {
  const [amount, setAmount] = useState(item.amount)
  const [isChecked, setIsChecked] = useState(false)

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

  const handleChecked = () => {
    setIsChecked(!isChecked)
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