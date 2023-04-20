import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaListUl, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import classNames from 'classnames/bind'
import styles from './Products.module.scss'
const cx = classNames.bind(styles)

const Products = () => {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState(products)
  let componentMounted = true

  const [categorize, setCategorize] = useState([])

  useEffect(() => {
    const fecthAllProducts = async () => {
      const res = await axios.get('http://localhost:8801/products')
      if (componentMounted) {
        setProducts(res.data)
        setFilter(res.data)
      }
      return () => {
        componentMounted = false
      }
    }
    fecthAllProducts()

    const fecthAllCategorize = async () => {
      try {
        const res = await axios.get('http://localhost:8801/categorize')
        setCategorize(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fecthAllCategorize()
  }, [])

  const filterProducts = (cate) => {
    const updateList = products.filter((x) => x.idcategorize === cate)
    setFilter(updateList)
  }

  return (
    <div className={cx('grid', 'wide')}>
      <div className={cx('row', 'box-products')} style={{ margin: '32px 0' }}>
        <div className={cx('l-2')}>
          <div className={cx('category-products')}>
            <span>
              <FaListUl /> Tất cả danh mục
            </span>
            <ul className={cx('category-list')}>
              <li className={cx('category-item')}>
                <a href="#" onClick={() => setFilter(products)}>
                  Tất cả sản phẩm
                </a>
              </li>
              {categorize.map((value) => {
                return (
                  <li className={cx('category-item')} key={value.id}>
                    <a href="#" onClick={() => filterProducts(value.id)}>
                      {value.categorize}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className={cx('l-10')}>
          <div className={cx('row', 'products-control')}>
            <div className={cx('filter')}>
              <span className={cx('filter-label')}>Sắp xếp theo</span>
              <button className={cx('btn', 'active')}>Phổ biến</button>
              <button className={cx('btn')}>Mới nhất</button>
              <button className={cx('btn')}>Bán chạy</button>
              <span className={cx('filter-label', 'price')}>Giá</span>
              <button className={cx('btn')}>Thấp đến Cao</button>
              <button className={cx('btn')}>Cao đến Thấp</button>
            </div>

            <div className={cx('paginate')}>
              <span className={cx('paginate-num')}>
                <span className={cx('paginate-total')}>1</span>/14
              </span>
              <div className={cx('prev', 'btn')}>
                <FaChevronLeft className={cx('icon')} />
              </div>
              <div className={cx('next', 'btn')}>
                <FaChevronRight className={cx('icon')} />
              </div>
            </div>
          </div>

          <div className={cx('row', 'products-list')}>
            <div className={cx('col ')}>
              <ListProducts filter={filter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ListProducts = ({ filter }) => {
  return (
    <>
      <div className={cx('row', 'list-products')}>
        {filter.map((products) => {
          return (
            <div className={cx('l-2-4', 'box-list-products')} key={products.id}>
              <Link className={cx('product')} to={`/product-detail/${products.id}`}>
                <div className={cx('img')} style={{ backgroundImage: `url(${products.imgPrimary})` }}>
                  {/* <span className={cx("discount">{productItems.discount}% Off</span> */}
                </div>
                <div className={cx('product-details')}>
                  <div className={cx('name')}>{products.name}</div>
                  <div className={cx('price')}>
                    <span>{Intl.NumberFormat().format((products.price * (100 - products.discount)) / 100)}</span>
                    <p>Đã bán {products.sold}</p>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Products
