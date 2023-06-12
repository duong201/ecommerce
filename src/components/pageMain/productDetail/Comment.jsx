import React, { useEffect, useState } from 'react'
import { BsStarFill, BsFillFileEarmarkArrowUpFill } from 'react-icons/bs'
import axios from 'axios'
import CommentItem from './CommentItem'
import { IsRated, RoundToNearestHalf } from './IsRated'

import classNames from 'classnames/bind'
import styles from './ProductDetail.module.scss'
const cx = classNames.bind(styles)

const Comment = ({ iduser, idproduct }) => {
  const [commentRate, setCommentRate] = useState('')
  const [commentText, setCommentText] = useState('')
  const [commentFile, setCommentFile] = useState()
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`http://localhost:8801/comment/get/${idproduct}`)
      setComments(res.data)
    }
    fetchComment()
  }, [idproduct])

  const sendComment = async () => {
    await axios
      .post('http://localhost:8801/comment/add', {
        iduser: iduser,
        idproduct: idproduct,
        rate: commentRate,
        comment: commentText,
      })
      .then(
        (res) => {
          if (res.data.status === 'success') {
            console.log(res.data.message)
          }
        },
        (error) => {
          console.log(error)
        },
      )

    setCommentRate('')
    setCommentText('')
  }

  const handleSubmitStar = (event) => {
    setCommentRate(event.target.value)
  }

  const handleSubmitText = (event) => {
    setCommentText(event.target.value)
  }

  const handleSubmitFile = (event) => {
    setCommentFile(event.target.files[0])
  }

  const rateResult =
    Math.round(
      (comments.reduce((rate, comment) => rate + comment.rate, 0) / comments.length) * 10,
    ) / 10

  return (
    <div className={cx('comment-content')}>
      <div className={cx('comment-top')}>
        <div className={cx('prevRate', 'row')} style={{ margin: 0 }}>
          <div className={cx('prevRate-left', 'l-3')}>
            <span>
              <h3>{comments.length} Đánh Giá</h3>
            </span>
            <span>
              <p>{rateResult}/5</p>
              &nbsp;
              <IsRated rating={RoundToNearestHalf(rateResult)} />
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
        {comments.length === 0 && <h1>Không có bình luận nào</h1>}
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      <div className={cx('comment-bottom')}>
        <div className={cx('boxInput')}>
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
                value="4.5"
                checked={commentRate === '4.5'}
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
                value="3.5"
                checked={commentRate === '3.5'}
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
                value="2.5"
                checked={commentRate === '2.5'}
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
                value="1.5"
                checked={commentRate === '1.5'}
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
              value={commentText}
              onChange={handleSubmitText}
            />
            <label htmlFor="imgComment">
              <BsFillFileEarmarkArrowUpFill className={cx('comment-icon')} />
              <input type="file" name="imgComment" id="imgComment" onChange={handleSubmitFile} />
            </label>
            <button onClick={sendComment}>Gửi</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
