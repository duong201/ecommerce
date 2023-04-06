import React, { useEffect, useState } from 'react'
import Category from './Category'
import Slideshow from './Slideshow'
import Suggest from '../../layouts/suggest/Suggest'
import PlashDeal from './PlashDeal'
import axios from 'axios'

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
            <div className="row" style={{ margin: '0', marginTop: '32px' }}>
              <div className="l-12">
                <div className={cx('plash-deal')}>
                  <PlashDeal />
                </div>
              </div>
            </div>
            <div className="row" style={{ margin: '0', marginTop: '32px' }}>
              <div className="l-12">
                <div className={cx('suggest')}>
                  <Suggest />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
