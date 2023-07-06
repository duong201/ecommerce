import React, { useEffect, useState } from 'react'
import Widget from './Widget'

import classNames from 'classnames/bind'
import style from './HomeAdmin.module.scss'
import { BsBookmarkStarFill } from 'react-icons/bs'
import axios from 'axios'
import { Link } from 'react-router-dom'
const cx = classNames.bind(style)

const AdminPage = () => {
  return (
    <div className={cx('home-page')}>
      <div className={cx('row')} style={{ margin: '0' }}>
        <div className={cx('l-3', 'box-widget')}>
          <Widget type="user" />
        </div>
        <div className={cx('l-3', 'box-widget')}>
          <Widget type="product" />
        </div>
        <div className={cx('l-3', 'box-widget')}>
          <Widget type="order" />
        </div>
        <div className={cx('l-3', 'box-widget')}>
          <Widget type="balance" />
        </div>
      </div>

      <div className="row" style={{ margin: '0' }}>
        <div className="l-12 box-listContainer">
          <div className="listContainer">
            <span className="listContainer-header">Top 5 bán chạy</span>
            <ListProducts />
          </div>
        </div>
      </div>
    </div>
  )
}

const ListProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fecthAllProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8801/products')
        setProducts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fecthAllProducts()
  }, [])

  return (
    <div className={cx('row')} style={{ margin: '0' }}>
      <table>
        <thead>
          <tr>
            <th className={cx('id')}>Id</th>
            <th className={cx('product')}>Sản phẩm</th>
            <th className={cx('price')}>Giá</th>
            <th className={cx('discount')}>Giảm giá</th>
            <th className={cx('amount')}>Số lượng</th>
            <th className={cx('sold')}>Đã bán</th>
            <th className={cx('status')}>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products
              .sort((a, b) => b.sold - a.sold)
              .slice(0, 6)
              .map((product) => {
                return (
                  <tr key={product.id}>
                    <td className={cx('id')}>{product.id}</td>
                    <td className={cx('product')}>
                      <img src={product.imgPrimary} alt="" />
                      <span>
                        <Link to={`/admin/products/change/${product.id}`}>{product.name}</Link>
                      </span>
                    </td>
                    <td className={cx('price')}>{Intl.NumberFormat().format(product.price)}</td>
                    <td className={cx('discount')}>{product.discount} %</td>
                    <td className={cx('amount')}>{product.amount}</td>
                    <td className={cx('sold')}>{product.sold}</td>
                    <td className={cx('status')}>{product.status}</td>
                  </tr>
                )
              })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPage
