import React from 'react'
import classNames from 'classnames/bind'
import styles from './Footer.module.scss'

const cx = classNames.bind(styles)

const Footer = () => {
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
        <div className={cx('container')}>
          <div className={cx('footer-main')}>
            <div className={cx('footer-box')}>
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
            <div className={cx('footer-box')}>
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
            <div className={cx('footer-box')}>
              <h3 className={cx('footer__heading')}>Thanh toán</h3>
            </div>
            <div className={cx('footer-box')}>
              <h3 className={cx('footer__heading')}>Theo dõi chúng tôi trên</h3>
              <ul className={cx('footer__list')}>
                <li className={cx('footer__item')}>
                  <a href="#" className={cx('footer__link')}>
                    <i className="fa-brands fa-square-facebook"></i>
                    Facebook
                  </a>
                </li>
                <li className={cx('footer__item')}>
                  <a href="#" className={cx('footer__link')}>
                    <i className="fa-brands fa-square-instagram"></i>
                    Instagram
                  </a>
                </li>
                <li className={cx('footer__item')}>
                  <a href="#" className={cx('footer__link')}>
                    <i className="fa-brands fa-linkedin"></i>
                    Linkedin
                  </a>
                </li>
              </ul>
            </div>
            <div className={cx('footer-box')}>
              <h3 className={cx('footer__heading')}>Tải ứng dụng Tipee ngay thôi</h3>
            </div>
          </div>
          <div className={cx('footer-extra')}>
            <p className={cx('extra-text')}>@2022 - Bản quyền thuộc về Công ty Tipee</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
