import React from 'react'
import Widget from './Widget'

import classNames from 'classnames/bind'
import style from './HomeAdmin.module.scss'
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

      {/*<div className="row" style={{ margin: '0' }}>
        <div className="l-12 box-listContainer">
          <div className="listContainer">
            <span className="listContainer-header">Top 10 bán chạy</span>
            <ListTable products={products} />
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default AdminPage
