import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Suggest from '../../layouts/suggest/Suggest'
import { BsStarFill, BsStarHalf, BsStar, BsCartPlus, BsFillFileEarmarkArrowUpFill } from 'react-icons/bs'

import classNames from 'classnames/bind'
import styles from './ProductDetail.module.scss'
const cx = classNames.bind(styles)

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fecthProduct = async () => {
      const res = await axios.get(`http://localhost:8801/product/${id}`)
      setProduct(res.data)
    }
    fecthProduct()
  }, [id])

  return (
    <main>
      <div className="grid wide">
        <div className={cx('box-details')} key={product.id}>
          <div className="row" style={{ margin: '0' }}>
            <div className="l-5">
              <div className={cx('img-main')} style={{ backgroundImage: `url(${product.imgPrimary})` }}></div>
              <div className={cx('img-list')}>
                <div className={cx('l-2', 'img-item')} style={{ backgroundImage: `url(${product.imgPrimary})` }}></div>
                <div className={cx('l-2', 'img-item')} style={{ backgroundImage: `url(${product.imgPrimary})` }}></div>
                <div className={cx('l-2', 'img-item')} style={{ backgroundImage: `url(${product.imgPrimary})` }}></div>
                <div className={cx('l-2', 'img-item')} style={{ backgroundImage: `url(${product.imgPrimary})` }}></div>
                <div className={cx('l-2', 'img-item')} style={{ backgroundImage: `url(${product.imgPrimary})` }}></div>
              </div>
            </div>

            <div className={cx('l-7', 'describe')}>
              <span className={cx('name')}>{product.name}</span>

              <ul className={cx('list-reviews')}>
                <li className={cx('item-reviews', 'separate')}>
                  <span>3.5</span>
                  <div className={cx('rate')}>
                    <BsStarFill className={cx('rate-item')} />
                    <BsStarFill className={cx('rate-item')} />
                    <BsStarFill className={cx('rate-item')} />
                    <BsStarHalf className={cx('rate-item')} />
                    <BsStar className={cx('rate-item')} />
                  </div>
                </li>
                <li className={cx('item-reviews', 'separate')}>
                  <span>{product.discount}</span>
                  Đánh giá
                </li>
                <li className={cx('item-reviews')}>
                  <span>{product.sold}</span>
                  Đã bán
                </li>
              </ul>

              <div className={cx('price')}>
                <span>{Intl.NumberFormat().format(product.price)}</span>
                <span>
                  {Intl.NumberFormat().format((product.price * (100 - product.discount)) / 100)}
                  <i>đ</i>
                </span>
                <span className={cx('discountPrice')}>{product.discount}% Giảm</span>
              </div>

              <div className={cx('clotherColor')}>
                <div className={cx('clotherColor-item')}>Màu:</div>
                <div className={cx('clotherColor-item')}>Đen</div>
                <div className={cx('clotherColor-item')}>Trắng</div>
                <div className={cx('clotherColor-item')}>Xám</div>
              </div>

              <div className={cx('clotherSize')}>
                <div className={cx('clotherSize-item')}>Size:</div>
                <div className={cx('clotherSize-item')}>28</div>
                <div className={cx('clotherSize-item')}>29</div>
                <div className={cx('clotherSize-item')}>30</div>
              </div>

              <button className={cx('addcart-btn')}>
                <BsCartPlus className={cx('addcart-icon')} />
                Thêm vào giỏ hàng
              </button>

              {/* <span id="notiCart" className={cx('notiCart')}>
                Bạn cần đăng nhập để thêm vào giỏ hàng.
              </span> */}
            </div>
          </div>
        </div>
        <div className="row" style={{ margin: '0' }}>
          <div className={cx('cmt-wrapper')}>
            <Comment id={id} />
          </div>
        </div>
        <div className="row" style={{ margin: '0' }}>
          <Suggest />
        </div>
      </div>
    </main>
  )
}

const Comment = ({ id }) => {
  const [commentRate, setCommentRate] = useState('')
  const [commentText, setCommentText] = useState('')
  const [commentFile, setCommentFile] = useState()

  const handleSubmitStar = (event) => {
    setCommentRate(event.target.value)
  }

  const handleSubmitText = (event) => {
    setCommentText(event.target.value)
  }

  const handleSubmitFile = (event) => {
    setCommentFile(event.target.files[0])
  }

  console.log({ idProduct: id, commentRate, commentText, commentFile })

  return (
    <div className={cx('comment-wrapper')}>
      <div className={cx('cmt-title')}>
        <div className={cx('cmt-title-item')}>
          <button>
            <span>Thông tin</span>
          </button>
        </div>
        <div className={cx('cmt-title-item', `active`)}>
          <button>
            <span>Đánh giá</span>
          </button>
        </div>
      </div>
      <div className={cx('comment-content')}>
        <div className={cx('comment-top')}>
          <div className={cx('prevRate', 'row')} style={{ margin: 0 }}>
            <div className={cx('prevRate-left', 'l-3')}>
              <span>
                <h3>1 Đánh Giá</h3>

                <h3>3.5/5</h3>
              </span>
              <span>
                <BsStarFill className={cx('prevRate-icon')} />
                <BsStarFill className={cx('prevRate-icon')} />
                <BsStarFill className={cx('prevRate-icon')} />
                <BsStarHalf className={cx('prevRate-icon')} />
                <BsStar className={cx('prevRate-icon')} />
              </span>
            </div>
            <div className={cx('prevRate-right', 'l-9')}>
              <div className={cx('row', 'prevRate-content')} style={{ margin: 0 }}>
                <div className={cx('prevRateStar')}>
                  <span>
                    <BsStarFill className={cx('prevRate-icon')} />
                    <BsStarFill className={cx('prevRate-icon')} />
                    <BsStarFill className={cx('prevRate-icon')} />
                    <BsStarFill className={cx('prevRate-icon')} />
                    <BsStarFill className={cx('prevRate-icon')} />
                    (120.5k)
                  </span>
                </div>
                <div className={cx('prevRateStar')}>
                  <span>
                    <BsStarFill className={cx('prevRate-icon')} />
                    <BsStarFill className={cx('prevRate-icon')} />
                    <BsStarFill className={cx('prevRate-icon')} />
                    <BsStarFill className={cx('prevRate-icon')} />
                    (503)
                  </span>
                </div>
                <div className={cx('prevRateStar')}>
                  <span>
                    <BsStarFill className={cx('prevRate-icon')} />
                    <BsStarFill className={cx('prevRate-icon')} />
                    <BsStarFill className={cx('prevRate-icon')} />
                    (50)
                  </span>
                </div>
                <div className={cx('prevRateStar')}>
                  <span>
                    <BsStarFill className={cx('prevRate-icon')} />
                    <BsStarFill className={cx('prevRate-icon')} />
                    (5)
                  </span>
                </div>
                <div className={cx('prevRateStar')}>
                  <span>
                    <BsStarFill className={cx('prevRate-icon')} />
                    (0)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('comment-center')}>
          {/* {commentItem.length === '0' && <h1>Không có bình luận nào</h1>} */}
          <div className={cx('userComment-item', 'row')} style={{ margin: 0 }}>
            <div className={cx('userComment-logo', 'l-1')}>
              <div className={cx('logo')}></div>
            </div>
            <div className={cx('userComment-body', 'l-11')}>
              <span className={cx('userComment-name')}>theduong2010</span>
              <span className={cx('userComment-rate')}>
                <BsStarFill className={cx('prevRate-icon')} />
                <BsStarFill className={cx('prevRate-icon')} />
                <BsStarFill className={cx('prevRate-icon')} />
                <BsStarHalf className={cx('prevRate-icon')} />
                <BsStar className={cx('prevRate-icon')} />
              </span>
              <span className={cx('userComment-time')}>2023-02-14 09:10</span>
              <span className={cx('userComment-text')}>Không có nội dung.</span>
            </div>
          </div>
        </div>
        <div className={cx('comment-bottom')}>
          <form>
            <div className={cx('newRate')}>
              <label htmlFor="5star">
                <input
                  type="radio"
                  name="star"
                  id="5star"
                  value="5"
                  checked={commentRate === '5'}
                  onChange={handleSubmitStar}
                />
                &nbsp; 5 <BsStarFill className={cx('prevRate-icon')} />
              </label>
              <label htmlFor="45star">
                <input
                  type="radio"
                  name="star"
                  id="45star"
                  value="4,5"
                  checked={commentRate === '4,5'}
                  onChange={handleSubmitStar}
                />
                &nbsp; 4,5 <BsStarFill className={cx('prevRate-icon')} />
              </label>
              <label htmlFor="4star">
                <input
                  type="radio"
                  name="star"
                  id="4star"
                  value="4"
                  checked={commentRate === '4'}
                  onChange={handleSubmitStar}
                />
                &nbsp; 4 <BsStarFill className={cx('prevRate-icon')} />
              </label>
              <label htmlFor="35star">
                <input
                  type="radio"
                  name="star"
                  id="35star"
                  value="3,5"
                  checked={commentRate === '3,5'}
                  onChange={handleSubmitStar}
                />
                &nbsp; 3,5 <BsStarFill className={cx('prevRate-icon')} />
              </label>
              <label htmlFor="3star">
                <input
                  type="radio"
                  name="star"
                  id="3star"
                  value="3"
                  checked={commentRate === '3'}
                  onChange={handleSubmitStar}
                />
                &nbsp; 3 <BsStarFill className={cx('prevRate-icon')} />
              </label>
              <label htmlFor="25star">
                <input
                  type="radio"
                  name="star"
                  id="25star"
                  value="2,5"
                  checked={commentRate === '2,5'}
                  onChange={handleSubmitStar}
                />
                &nbsp; 2,5 <BsStarFill className={cx('prevRate-icon')} />
              </label>
              <label htmlFor="2star">
                <input
                  type="radio"
                  name="star"
                  id="2star"
                  value="2"
                  checked={commentRate === '2'}
                  onChange={handleSubmitStar}
                />
                &nbsp; 2 <BsStarFill className={cx('prevRate-icon')} />
              </label>
              <label htmlFor="15star">
                <input
                  type="radio"
                  name="star"
                  id="15star"
                  value="1,5"
                  checked={commentRate === '1,5'}
                  onChange={handleSubmitStar}
                />
                &nbsp; 1,5 <BsStarFill className={cx('prevRate-icon')} />
              </label>
              <label htmlFor="1star">
                <input
                  type="radio"
                  name="star"
                  id="1star"
                  value="1"
                  checked={commentRate === '1'}
                  onChange={handleSubmitStar}
                />
                &nbsp; 1 <BsStarFill className={cx('prevRate-icon')} />
              </label>
            </div>
            <div className={cx('formRate', 'row')} style={{ margin: 0 }}>
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="Nhập nội dung..."
                onChange={handleSubmitText}
              />
              <label htmlFor="imgComment">
                <BsFillFileEarmarkArrowUpFill className={cx('comment-icon')} />
                <input type="file" name="imgComment" id="imgComment" onChange={handleSubmitFile} />
              </label>
              <button>Gửi</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const Info = () => {
  return (
    <div className={cx('info-wrapper')}>
      <div className={cx('cmt-title')}>
        <div className={cx('cmt-title-item')}>
          <button>Thông tin</button>
        </div>
        <div className={cx('cmt-title-item', `active`)}>
          <button>Đánh giá</button>
        </div>
      </div>
      <div className={cx('info-content')}>
        <h1>info</h1>
      </div>
    </div>
  )
}

export default ProductDetail
