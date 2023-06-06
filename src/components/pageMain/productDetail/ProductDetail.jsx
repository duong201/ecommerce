import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Suggest from '../../layouts/suggest/Suggest'
import Comment from './Comment'
import Product from './Product'

import classNames from 'classnames/bind'
import styles from './ProductDetail.module.scss'
import InfoProduct from './InfoProduct'
const cx = classNames.bind(styles)

const DATA_USER_INFO = JSON.parse(localStorage.getItem('DATA_USER_INFO'))

const ProductDetail = ({ handleChangeCartLength }) => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const [infoOrRate, setInfoOrRate] = useState(true)

  const toggleInfoToRate = infoOrRate ? 'active' : null
  const toggleRateToInfo = infoOrRate ? null : 'active'

  useEffect(() => {
    const fecthProduct = async () => {
      const res = await axios.get(`http://localhost:8801/product/${id}`)
      setProduct(res.data)
    }
    fecthProduct()

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    setInfoOrRate(true)
  }, [id])

  const addToCart = async (product) => {
    const amount = 1
    await axios
      .post('http://localhost:8801/add-to-cart', {
        iduser: DATA_USER_INFO.id,
        idproduct: product.id,
        amount: amount,
      })
      .then((res) => {
        if (res.data.status === 'success') {
          setIsVisible(true)
          setTimeout(() => {
            setIsVisible(false)
          }, 3000)
          handleChangeCartLength(1)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <main>
      <div className="grid wide">
        <div className={cx('box-details')} key={product.id}>
          <Product product={product} addToCart={addToCart} />
        </div>
        <div className="row" style={{ margin: '0' }}>
          <div className={cx('cmt-wrapper')}>
            <div className={cx('comment-wrapper')}>
              <div className={cx('cmt-title')}>
                <div className={cx('cmt-title-item', `${toggleInfoToRate}`)}>
                  <button
                    onClick={() => {
                      setInfoOrRate(!infoOrRate)
                    }}
                  >
                    <span>Thông tin</span>
                  </button>
                </div>
                <div className={cx('cmt-title-item', `${toggleRateToInfo}`)}>
                  <button
                    onClick={() => {
                      setInfoOrRate(!infoOrRate)
                    }}
                  >
                    <span>Đánh giá</span>
                  </button>
                </div>
              </div>
              {infoOrRate ? <InfoProduct /> : <Comment iduser={DATA_USER_INFO.id} idproduct={id} />}
            </div>
          </div>
        </div>
        <div className="row" style={{ margin: '0' }}>
          <Suggest />
        </div>
      </div>

      {isVisible && (
        <div className={cx('notification')}>
          <span>Thêm vào giỏ hàng thành công</span>
        </div>
      )}
    </main>
  )
}

export default ProductDetail
