import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { BsCartCheck, BsCheckCircle } from 'react-icons/bs'
import { MdOutlinePayments } from 'react-icons/md'
import { ImCancelCircle } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './Order.module.scss'
const cx = classNames.bind(styles)

const Order = () => {
  const DATA_USER_INFO = JSON.parse(localStorage.getItem('DATA_USER_INFO'))
  const [dataCart, setDataCart] = useState([])
  const [dataPayment, setDataPayment] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isIsReorder, setIsReorder] = useState(false)
  const [reOrder, setReOrder] = useState([])
  const navigate = useNavigate()

  const handleDataPayment = (event) => {
    setDataPayment(event.target.value)
  }

  useEffect(() => {
    const fecthAllCart = async () => {
      try {
        const res = await axios.get(`http://localhost:8801/carts/user/${DATA_USER_INFO.id}`)
        setDataCart(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fecthAllCart()
  }, [])

  const myDate = new Date()
  const hours = myDate.getHours()
  const minutes = myDate.getMinutes()
  const seconds = myDate.getSeconds()
  const day = myDate.getDate()
  const month = myDate.getMonth() + 1
  const year = myDate.getFullYear()

  const dateOrder = `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`

  const handleAddOrder = () => {
    if (dataPayment.length > 0) {
      dataCart
        .filter((key) => key.checked === 1)
        .map((data) => {
          axios
            .post('http://localhost:8801/order/add', {
              idcart: data.id,
              iduser: DATA_USER_INFO.id,
              idproduct: data.idproduct,
              amount: data.amount,
              price: ((data.price * (100 - data.discount)) / 100) * data.amount,
              description: `${data.color}, ${data.size} `,
              idaddress: 1,
              status: 'Đang chuẩn bị hàng',
              payment: dataPayment,
              dateorder: dateOrder,
            })
            .then((res) => {
              if (res.data.status === 'success') {
                setIsVisible(true)
                setTimeout(() => {
                  setIsVisible(false)
                  navigate('/')
                }, 1000)
              } else {
                setIsReorder(true)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
    } else {
      setIsError(true)
      setTimeout(() => {
        setIsError(false)
      }, 1500)
    }
  }

  const handleReAdd = () => {
    setIsReorder(false)
    dataCart
      .filter((key) => key.checked === 1)
      .map((data) => {
        axios
          .post('http://localhost:8801/order/readd', {
            idcart: data.id,
            iduser: DATA_USER_INFO.id,
            idproduct: data.idproduct,
            amount: data.amount,
            price: ((data.price * (100 - data.discount)) / 100) * data.amount,
            description: `${data.color}, ${data.size} `,
            idaddress: 1,
            status: 'Đang chuẩn bị hàng',
            payment: dataPayment,
            dateorder: dateOrder,
          })
          .then((res) => {
            if (res.data.status === 'success') {
              setIsVisible(true)
              setTimeout(() => {
                setIsVisible(false)
                navigate('/')
              }, 1000)
            } else {
              console.log(data.status.result)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
  }

  const handleExitToCart = () => {
    setIsReorder(false)
    setReOrder([])
  }

  const resultTotalPrice = dataCart
    .filter((key) => key.checked === 1)
    .reduce((price, item) => price + item.amount * ((item.price * (100 - item.discount)) / 100), 0)

  return (
    <div className={cx('grid', 'wide')}>
      <div className={cx('row', 'order-address')} style={{ margin: '16px 0' }}>
        <h2 className={cx('address-title')}>
          <FaMapMarkerAlt className={cx('icon')} />
          Địa chỉ nhận hàng
        </h2>
        <div className={cx('row', 'address-content')} style={{ margin: 0 }}>
          <div className={cx('address-name', 'l-2')}>
            <span>Truong The Duong</span>
            <span>0385572171</span>
          </div>
          <div className={cx('address-address', 'l-8')}>
            <span>
              Trường Đại Học Công Nghệ Thông Tin Và Truyền Thông Việt Hàn, 470 Trần Đại Nghĩa,
              Phường Hòa Hải, Quận Ngũ Hành Sơn, Đà Nẵng
            </span>
          </div>
          <div className={cx('address-change', 'l-2')}>
            <button>Thay đổi</button>
          </div>
        </div>
      </div>
      <div className={cx('row', 'order-product')} style={{ margin: '0 0 16px 0' }}>
        <div className={cx('row', 'product-title')} style={{ margin: '0' }}>
          <h2 className={cx('title-main')} style={{ width: '60%' }}>
            <BsCartCheck className={cx('icon')} />
            Sản phẩm
          </h2>
          <span
            className={cx('title-totalMoney')}
            style={{ width: '10%', textAlign: 'center' }}
          ></span>
          <span className={cx('title-totalMoney')} style={{ width: '10%', textAlign: 'center' }}>
            Đơn giá
          </span>
          <span className={cx('title-totalMoney')} style={{ width: '10%', textAlign: 'center' }}>
            Số lượng
          </span>
          <span className={cx('title-totalMoney')} style={{ width: '10%', textAlign: 'center' }}>
            Thành tiền
          </span>
        </div>
        <div className={cx('row', 'product-content')} style={{ margin: 0 }}>
          {dataCart
            .filter((key) => key.checked === 1)
            .map((item) => {
              return (
                <Fragment key={item.id}>
                  <div className={cx('product-item')}>
                    <div className={cx('img-name')} style={{ width: '60%' }}>
                      <div
                        className={cx('product-img')}
                        style={{ backgroundImage: `url(${item.imgPrimary})` }}
                      ></div>
                      <span className={cx('product-name')}>{item.name}</span>
                    </div>
                    <span
                      className={cx('product-type')}
                      style={{ width: '10%', textAlign: 'center' }}
                    >
                      {item.color + ',' + item.size}
                    </span>
                    <span
                      className={cx('product-price')}
                      style={{ width: '10%', textAlign: 'center' }}
                    >
                      {Intl.NumberFormat().format((item.price * (100 - item.discount)) / 100)}
                    </span>
                    <span
                      className={cx('product-amount')}
                      style={{ width: '10%', textAlign: 'center' }}
                    >
                      {item.amount}
                    </span>
                    <span
                      className={cx('product-totalprice')}
                      style={{ width: '10%', textAlign: 'center' }}
                    >
                      {Intl.NumberFormat().format(
                        ((item.price * (100 - item.discount)) / 100) * item.amount,
                      )}
                    </span>
                  </div>
                </Fragment>
              )
            })}
        </div>
        <div className={cx('row', 'product-totalMoney')} style={{ margin: 0 }}>
          <span className={cx('totalMoney-titleMoney')}>Tổng số tiền :</span>
          <span className={cx('totalMoney-numberMoney')}>
            {Intl.NumberFormat().format(resultTotalPrice)}
            <p>đ</p>
          </span>
        </div>
      </div>

      <div className={cx('row', 'order-payment')} style={{ margin: '0 0 16px 0' }}>
        <div className={cx('payment-title')}>
          <h2 className={cx('payment-mainTitle')} style={{ width: '40%' }}>
            <MdOutlinePayments className={cx('icon')} />
            Phương thức thanh toán
          </h2>
          <label
            htmlFor="payment1"
            className={cx('radio-button')}
            style={{ width: 'calc(20% - 8px)' }}
          >
            <input
              type="radio"
              id="payment1"
              name="payment"
              className={cx('radio-input')}
              value="Thanh toán khi nhận hàng"
              checked={dataPayment === 'Thanh toán khi nhận hàng'}
              onChange={handleDataPayment}
            />
            <span className={cx('radio-label')}>Thanh toán khi nhận hàng</span>
          </label>

          <label
            htmlFor="payment2"
            className={cx('radio-button')}
            style={{ width: 'calc(20% - 8px)' }}
          >
            <input
              type="radio"
              id="payment2"
              name="payment"
              className={cx('radio-input')}
              value="Ví MOMO"
              checked={dataPayment === 'Ví MOMO'}
              onChange={handleDataPayment}
            />
            <span className={cx('radio-label')}>Ví MOMO</span>
          </label>

          <label
            htmlFor="payment3"
            className={cx('radio-button')}
            style={{ width: 'calc(20% - 8px)' }}
          >
            <input
              type="radio"
              id="payment3"
              name="payment"
              className={cx('radio-input')}
              value="Thẻ tín dụng/Ghi nợ"
              checked={dataPayment === 'Thẻ tín dụng/Ghi nợ'}
              onChange={handleDataPayment}
            />
            <span className={cx('radio-label')}>Thẻ tín dụng/Ghi nợ</span>
          </label>
        </div>
        <div className={cx('payment-center')}>
          <p>
            Tổng tiền hàng: <span>{Intl.NumberFormat().format(resultTotalPrice)}</span>
          </p>
          <p>
            Phí vận chuyển: <span>{Intl.NumberFormat().format(35000)}</span>
          </p>
          <p className={cx('total')}>
            Tổng thanh toán:
            <span>{Intl.NumberFormat().format(resultTotalPrice + 35000)}</span>
          </p>
        </div>
        <div className={cx('payment-bottom')}>
          <p>
            Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
            <span> Điều khoản của chúng tôi</span>
          </p>
          <button onClick={handleAddOrder}>Đặt hàng</button>
        </div>
      </div>

      {isVisible && (
        <div className={cx('box-notiOrder')}>
          <div className={cx('notiOrder', 'success')}>
            <BsCheckCircle className={cx('icon')} />
            <span>Đặt hàng thành công</span>
          </div>
        </div>
      )}

      {isError && (
        <div className={cx('box-notiOrder')}>
          <div className={cx('notiOrder', 'error')}>
            <ImCancelCircle className={cx('icon')} />
            <span>Chưa chọn phương thức thanh toán</span>
          </div>
        </div>
      )}

      {isIsReorder && (
        <div className={cx('box-notiOrder')}>
          <div className={cx('notiOrder', 'error')}>
            <ImCancelCircle className={cx('icon')} />
            <span>Bạn vừa đặt sản phẩm này rồi!!</span>
            <div className={cx('box-btn')}>
              <button onClick={handleReAdd}>Mua tiếp</button>
              <button onClick={handleExitToCart}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Order
