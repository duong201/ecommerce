import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import axios from 'axios'

import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { Link, useNavigate } from 'react-router-dom'
const cx = classNames.bind(styles)

const Search = () => {
  const [inputSearch, setInputSearch] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [dataSearch, setDataSearch] = useState([])
  const navigate = useNavigate()

  const handleSearch = (event) => {
    setInputSearch(event.target.value)

    if (event.key === 'Enter') {
      navigate(`/search/${inputSearch}`)
    }
  }

  function handleFocus() {
    setIsFocused(true)
  }

  function handleBlur() {
    setIsFocused(false)
  }

  function handleMouseEnter() {
    setIsHover(true)
    setIsFocused(true)
  }

  function handleMouseLeave() {
    setIsHover(false)
    setIsFocused(false)
  }

  useEffect(() => {
    const fecthSendSearch = async () => {
      try {
        await axios
          .post(`http://localhost:8801/search`, {
            inputSearch: inputSearch,
          })
          .then((res) => setDataSearch(res.data))
          .catch((error) => console.error(error))
      } catch (err) {
        console.log(err)
      }
    }
    fecthSendSearch()
  }, [inputSearch])

  return (
    <div className={cx('header__search')}>
      <input
        type="text"
        className={cx('header__search-input')}
        placeholder="Nhập để tìm kiếm"
        value={inputSearch}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleSearch}
      />
      <button className={cx('header__search-btn')}>
        <BsSearch className={cx('header__search-btn-icon')} />
      </button>

      <ul
        className={cx(`${(isFocused && 'visible') || (isHover && 'visible')}`)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {dataSearch.slice(0, 10).map((data) => (
          <li key={data.id}>
            <Link to={`/product/${data.id}`} onClick={handleMouseLeave}>
              {data.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Search
