import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import classNames from 'classnames/bind'
import styles from './Home.module.scss'
const cx = classNames.bind(styles)

const Category = () => {
  const [categorize, setCategorize] = useState([])

  useEffect(() => {
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

  return (
    <div className={cx('category-wrapper')}>
      <div className={cx('category')}>
        {categorize.map((cate) => {
          return (
            <Link className={cx('category-link')} to="/products" key={cate.id}>
              <span>{cate.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Category
