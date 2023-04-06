import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

import classNames from 'classnames/bind'
import styles from './Suggest.module.scss'
const cx = classNames.bind(styles)

const Suggest = () => {
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
    <div className={cx('suggest-wrapper')}>
      <div className="row" style={{ margin: '0' }}>
        <div className={cx('title-suggest')}>
          <h1>gợi ý hôm nay</h1>
        </div>
      </div>
      <div className="row" style={{ margin: '0' }}>
        {products.map((product) => {
          return (
            <div className="l-2 " key={product.id}>
              <div className={cx('card-product')}>
                <Link className={cx('product')} to={`/product/${product.id}`}>
                  <div className={cx('img')} style={{ backgroundImage: `url(${product.imgPrimary})` }}>
                    {/* <span className={cx("discount">{productItems.discount}% Off</span> */}
                  </div>
                  <div className={cx('product-details')}>
                    <div className={cx('name')}>{product.name}</div>
                    <div className={cx('price')}>
                      <span>{Intl.NumberFormat().format((product.price * (100 - product.discount)) / 100)}</span>
                      <p>Đã bán {product.sold}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Suggest
