import React, { useEffect, useState } from 'react'
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsBookmarkStarFill,
  BsPlusSquare,
} from 'react-icons/bs'
import axios from 'axios'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import style from './ProductsAdmin.module.scss'
const cx = classNames.bind(style)

const ProductsAdmin = () => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

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
    <div className={cx('admin-page')}>
      <div className={cx('row')} style={{ margin: '0' }}>
        <div className={cx('header-products')}>
          <h1>
            <BsBookmarkStarFill className={cx('icon')} />
            Danh sách sản phẩm
          </h1>
          <Link to="/admin/products/add">
            <BsPlusSquare className={cx('icon')} />
            Thêm
          </Link>
        </div>
      </div>
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
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((product) => {
                  return (
                    <tr key={product.id}>
                      <td className={cx('id')}>{product.id}</td>
                      <td className={cx('product')}>
                        <img src={product.imgPrimary} alt="" />
                        <span>{product.name}</span>
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
      <div className={cx('row')} style={{ margin: '0' }}>
        <div className={cx('products-btn')}>
          <button
            className={cx('btn-prev')}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <BsArrowLeftShort />
          </button>
          <div className={cx('products-page')}>
            <span>{currentPage}</span>
          </div>
          <button
            className={cx('btn-next')}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
          >
            <BsArrowRightShort />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductsAdmin
