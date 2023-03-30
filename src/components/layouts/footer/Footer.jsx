import React from 'react'
import qrCodeImg from './images/qr-code.png'
import appStoreImg from './images/app-store.png'
import googlePlayImg from './images/google-play.png'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'

import classNames from 'classnames/bind'
import styles from './Footer.module.scss'
const cx = classNames.bind(styles)

const footer = () => {
  const dataCustomerCare = [
    'Trung tâm trợ giúp',
    'Hướng dẫn mua hàng',
    'Hướng dẫn bán hàng',
    'Chăm sóc khách hàng',
    'Chính sách bảo hành',
  ]
  const dataAboutTipee = [
    'Giới thiệu về Tipee',
    'Điều khoản Tipee',
    'Chính sách bảo mật',
    'Kênh người bán',
    'Liên hệ với truyền thông',
  ]
  return (
    <>
      <div className={cx('wrapper')}>
        <footer className={cx('footer')}>
          <div className="grid wide">
            <div className="row" style={{ margin: '0px' }}>
              <div className="l-2-4">
                <h3 className={cx('footer__heading')}>Chăm sóc khách hàng</h3>
                <ul className={cx('footer__list')}>
                  {dataCustomerCare.map((value, index) => {
                    return (
                      <li className={cx('footer__item')} key={index}>
                        <a href="#" className={cx('footer__link')}>
                          {value}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="l-2-4">
                <h3 className={cx('footer__heading')}>Về Tipee</h3>
                <ul className={cx('footer__list')}>
                  {dataAboutTipee.map((value, index) => {
                    return (
                      <li className={cx('footer__item')} key={index}>
                        <a href="#" className={cx('footer__link')}>
                          {value}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="l-2-4">
                <h3 className={cx('footer__heading')}>Thanh toán</h3>
              </div>
              <div className="l-2-4">
                <h3 className={cx('footer__heading')}>Theo dõi chúng tôi trên</h3>
                <ul className={cx('footer__list')}>
                  <li className={cx('footer__item')}>
                    <a href="#" className={cx('footer__link')}>
                      <FaFacebookSquare className={cx('footer__icon')} />
                      Facebook
                    </a>
                  </li>
                  <li className={cx('footer__item')}>
                    <a href="#" className={cx('footer__link')}>
                      <FaInstagramSquare className={cx('footer__icon')} />
                      Instagram
                    </a>
                  </li>
                  <li className={cx('footer__item')}>
                    <a href="#" className={cx('footer__link')}>
                      <FaLinkedin className={cx('footer__icon')} />
                      Linkedin
                    </a>
                  </li>
                </ul>
              </div>
              <div className="l-2-4">
                <h3 className={cx('footer__heading')}>Tải ứng dụng Tipee ngay thôi</h3>
                <div className={cx('footer__download')}>
                  <img src={qrCodeImg} alt="" className={cx('footer__download-qr')} />
                  <div className={cx('footer__download-apps')}>
                    <img src={appStoreImg} alt="" className={cx('footer__download-app-img')} />
                    <img src={googlePlayImg} alt="" className={cx('footer__download-app-img')} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <p className={cx('footer__text')}>@2022 - Bản quyền thuộc về Công ty Tipee</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default footer
