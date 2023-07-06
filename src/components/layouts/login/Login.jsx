import React, { useEffect, useState } from 'react'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import EcommerceLogo from './ecommerceLogo.png'

import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BsCheckCircle } from 'react-icons/bs'
import { ImCancelCircle } from 'react-icons/im'
const cx = classNames.bind(styles)

const Login = () => {
  const loginOrLogout = useParams()
  const [isVisible, setIsVisible] = useState(false)
  const [isError, setIsError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isActive, setIsActive] = useState('')
  const [phoneActive, setPhoneActive] = useState(false)
  const [dataRegister, setDataRegister] = useState({
    username: '',
    password: '',
  })
  const [phoneRegister, setPhoneRegister] = useState('')

  const handleRegisterSuccess = () => {
    setIsVisible(false)
    setPhoneActive(false)
    setPhoneRegister('')
    setIsActive('login')
  }

  const handleRegisterErrorNumber = () => {
    setIsError(false)
    setPhoneRegister('')
  }

  const handleInputPhone = (event) => {
    const { value } = event.target
    setPhoneRegister(value)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setDataRegister({ ...dataRegister, [name]: value })
  }

  useEffect(() => {
    setIsActive(loginOrLogout.user)
  }, [loginOrLogout.user])

  const handleSubmitUserName = (event) => {
    setUsername(event.target.value)
  }

  const handleSubmitPassword = (event) => {
    setPassword(event.target.value)
  }

  const login = () => {
    axios
      .post('http://localhost:8801/user/login', {
        username: username,
        password: password,
      })
      .then((response) => {
        response.data.result.forEach((data) => {
          if (data.level === 1) {
            if (response.data.status === 'error') {
              console.log(response.data.status)
            } else if (response.data.status === 'success') {
              localStorage.setItem('DATA_USER_INFO', JSON.stringify(data))

              window.location.href = '/'
            }
          }
          if (data.level === 0) {
            if (response.data.status === 'error') {
              alert('tai khoan mat khau khong chinh xac')
            } else if (response.data.status === 'success') {
              localStorage.setItem('DATA_USER_INFO', JSON.stringify(data))

              window.location.href = '/admin'
            }
          }
        })
      })
  }

  const handleRegisterCheckphone = () => {
    axios
      .post('http://localhost:8801/user/register/checkphone', {
        phone: phoneRegister,
      })
      .then((response) => {
        if (response.data.status === 'error') {
          setIsError(true)
          setPhoneActive(false)
        } else if (response.data.status === 'success') {
          setPhoneActive(true)
        }
      })
  }

  const handleRegister = () => {
    axios
      .post('http://localhost:8801/user/register', {
        phone: phoneRegister,
        username: dataRegister.username,
        password: dataRegister.password,
        level: 1,
      })
      .then((response) => {
        if (response.data.status === 'error') {
        } else if (response.data.status === 'success') {
          setDataRegister({
            username: '',
            password: '',
          })
          setIsVisible(true)
        }
      })
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className="grid wide">
          <div className={cx('login-wrapper', 'row')} style={{ margin: '0' }}>
            <div className={cx('l-6', 'login-right', 'login-box')}>
              <div style={{ backgroundImage: `url(${EcommerceLogo})` }}></div>
              <h1>Tipee</h1>
              <p>Nền tảng thương mại điện tử đang thử nghiệm tại Việt Nam</p>
            </div>
            <div className={cx('l-6', 'login-left', 'login-box')}>
              {isActive === 'login' ? (
                <div className={cx('form')}>
                  <h1>Đăng nhập</h1>
                  <div className={cx('social-container')}>
                    <a href="#" className={cx('social')}>
                      <FaFacebookF className={cx('facebook-icon')} />
                    </a>
                    <a href="#" className={cx('social')}>
                      <FaGoogle className={cx('gmail-icon')} />
                    </a>
                  </div>
                  <span>Hoặc sử dụng tài khoản của bạn</span>
                  <input
                    type="username"
                    placeholder="Tên đăng nhập"
                    onChange={handleSubmitUserName}
                  />
                  <input type="password" placeholder="Mật khẩu" onChange={handleSubmitPassword} />
                  <a href="#">Quên mật khẩu?</a>
                  <button onClick={login}>Đăng nhập</button>
                  <span>
                    Bạn mới biết đến Tipee?{' '}
                    <p
                      onClick={() => {
                        setIsActive('logout')
                      }}
                    >
                      Đăng ký
                    </p>
                  </span>
                </div>
              ) : (
                <div>
                  <div className={cx('form')}>
                    <h1>Đăng ký</h1>
                    {phoneActive ? (
                      <>
                        <input
                          type="text"
                          name="username"
                          value={dataRegister.username}
                          onChange={handleInputChange}
                          placeholder="Tên người dùng"
                        />
                        <input
                          type="password"
                          name="password"
                          value={dataRegister.password}
                          onChange={handleInputChange}
                          placeholder="Mật khẩu"
                        />
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="Xác nhận mật khẩu"
                        />
                      </>
                    ) : (
                      <>
                        <div className={cx('social-container')}>
                          <a href="#" className={cx('social')}>
                            <FaFacebookF className={cx('facebook-icon')} />
                          </a>
                          <a href="#" className={cx('social')}>
                            <FaGoogle className={cx('gmail-icon')} />
                          </a>
                        </div>
                        <input
                          type="text"
                          name="phone"
                          value={phoneRegister}
                          onChange={handleInputPhone}
                          placeholder="Số điện thoại"
                        />
                      </>
                    )}
                    <span style={{ margin: '12px auto' }}>
                      Bằng việc đăng ký, bạn đã đồng ý về Điều khoản dịch vụ và Chính sách bảo mật
                    </span>
                    <button onClick={phoneActive ? handleRegister : handleRegisterCheckphone}>
                      Đăng ký
                    </button>
                    <span>
                      Bạn đã biết đến Tipee?
                      <p
                        onClick={() => {
                          setIsActive('login')
                        }}
                      >
                        Đăng nhập
                      </p>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isVisible && (
        <div className={cx('box-notiOrder')}>
          <div className={cx('notiOrder', 'success')}>
            <BsCheckCircle className={cx('icon')} />
            <span>Đăng ký thành công</span>
            <button onClick={handleRegisterSuccess}>Về trang đăng nhập</button>
          </div>
        </div>
      )}
      {isError && (
        <div className={cx('box-notiOrder')}>
          <div className={cx('notiOrder', 'error')}>
            <ImCancelCircle className={cx('icon')} />
            <span>Số điện thoại trùng</span>
            <button onClick={handleRegisterErrorNumber}>Nhập lại số điện thoại</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
