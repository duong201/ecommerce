import React from 'react'
import Category from './Category'
import Slideshow from './Slideshow'

import classNames from 'classnames/bind'
import styles from './Home.module.scss'
const cx = classNames.bind(styles)

const Home = () => {
  return (
    <>
      <main className={cx('wrapper')}>
        <div className={cx('container')}>
          <div className="grid wide">
            <div className="row" style={{ margin: '0' }}>
              <div className="l-2">
                <Category />
              </div>
              <div className="l-10">
                <Slideshow />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
