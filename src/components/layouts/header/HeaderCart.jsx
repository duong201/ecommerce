import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsCart3 } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './Header.module.scss'
const cx = classNames.bind(styles)

const HeaderCart = ({ iduser }) => {
  const [dataCart, setDataCart] = useState([])

  useEffect(() => {
    const fecthAllCart = async () => {
      try {
        const res = await axios.get(`http://localhost:8801/carts/user/${iduser}`)
        setDataCart(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fecthAllCart()
  }, [])

  return (
    <div className={cx('header-cart')}>
      <Link to="/home/cart">
        <BsCart3 className={cx('cart-icon')} />
      </Link>
      <p>{dataCart.length}</p>
    </div>
  )
}

export default HeaderCart
