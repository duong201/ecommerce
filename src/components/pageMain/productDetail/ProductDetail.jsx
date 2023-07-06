import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Suggest from '../../layouts/suggest/Suggest'
import Comment from './Comment'
import Product from './Product'
import InfoProduct from './InfoProduct'

import classNames from 'classnames/bind'
import styles from './ProductDetail.module.scss'
import { ImCancelCircle } from 'react-icons/im'
const cx = classNames.bind(styles)

const DATA_USER_INFO = JSON.parse(localStorage.getItem('DATA_USER_INFO'))

const ProductDetail = ({ handleChangeCartLength }) => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const [infoOrRate, setInfoOrRate] = useState(true)
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

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

  const addToCart = async (product, dataColor, dataSize, amount) => {
    if (DATA_USER_INFO) {
      await axios
        .post('http://localhost:8801/add-to-cart', {
          iduser: DATA_USER_INFO.id,
          idproduct: product.id,
          color: dataColor,
          size: dataSize,
          amount: amount,
          checked: 0,
        })
        .then((res) => {
          if (res.data.status === 'success') {
            setIsVisible(true)
            setTimeout(() => {
              setIsVisible(false)
            }, 4000)
            handleChangeCartLength(1)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setIsError(true)
    }
  }

  const addToOrder = async (product, dataColor, dataSize, amount) => {
    await axios
      .post('http://localhost:8801/add-to-cart', {
        iduser: DATA_USER_INFO.id,
        idproduct: product.id,
        color: dataColor,
        size: dataSize,
        amount: amount,
        checked: 1,
      })
      .then((res) => {
        if (res.data.status === 'success') {
          setIsVisible(true)
          setTimeout(() => {
            setIsVisible(false)
            navigate('/home/order')
          }, 2000)
          handleChangeCartLength(1)
        } else {
          console.log(res.data.message)
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
          <Product product={product} addToCart={addToCart} addToOrder={addToOrder} />
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
              {infoOrRate ? <InfoProduct /> : <Comment idproduct={id} />}
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

      {isError && (
        <div className={cx('box-notiOrder')}>
          <div className={cx('notiOrder', 'error')}>
            <ImCancelCircle className={cx('icon')} />
            <span>Bạn chưa đăng nhập</span>
            <div className={cx('box-btn')}>
              <button
                onClick={() => {
                  setIsError(false)
                  setTimeout(() => {
                    navigate('/home/user/login')
                  }, 1500)
                }}
              >
                Đăng nhập
              </button>
              <button onClick={() => setIsError(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default ProductDetail
