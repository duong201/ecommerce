import React, { useRef, useState } from 'react'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import EcommerceLogo from './ecommerceLogo.png'

import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const cx = classNames.bind(styles)

const Login = () => {
  const loginOrLogout = useParams()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isActive, setIsActive] = useState(loginOrLogout.user)
  const [action, setAction] = useState('')

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
              alert('tai khoan mat khau khong chinh xac')
            } else if (response.data.status === 'success') {
              sessionStorage.setItem('id', data.id)
              sessionStorage.setItem('name', data.username)
              setAction('/')
            }
          }
          if (data.level === 0) {
            if (response.data.status === 'error') {
              alert('tai khoan mat khau khong chinh xac')
            } else if (response.data.status === 'success') {
              sessionStorage.setItem('idAdmin', data.id)
              sessionStorage.setItem('adminName', data.username)
              setAction('/admin')
            }
          }
        })
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
                <form action="/">
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
                  <input type="username" placeholder="Tên đăng nhập" onChange={handleSubmitUserName} />
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
                </form>
              ) : (
                <div>
                  <form action="/">
                    <h1>Đăng ký</h1>
                    <div className={cx('social-container')}>
                      <a href="#" className={cx('social')}>
                        <FaFacebookF className={cx('facebook-icon')} />
                      </a>
                      <a href="#" className={cx('social')}>
                        <FaGoogle className={cx('gmail-icon')} />
                      </a>
                    </div>
                    <input type="text" placeholder="Số điện thoại" />
                    <span style={{ margin: '12px auto' }}>
                      Bằng việc đăng ký, bạn đã đồng ý về Điều khoản dịch vụ và Chính sách bảo mật
                    </span>
                    <button>Đăng ký</button>
                    <span>
                      Bạn đã biết đến Tipee?{' '}
                      <p
                        onClick={() => {
                          setIsActive('login')
                        }}
                      >
                        Đăng nhập
                      </p>
                    </span>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
