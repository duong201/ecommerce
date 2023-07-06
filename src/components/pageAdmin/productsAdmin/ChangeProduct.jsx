import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BsCheckCircle } from 'react-icons/bs'
import { useParams } from 'react-router-dom'

import classNames from 'classnames/bind'
import style from './ProductsAdmin.module.scss'
const cx = classNames.bind(style)

const ChangeProduct = () => {
  const { iduser } = useParams()
  const [product, setProduct] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [discount, setDiscount] = useState('')
  const [description, setDescription] = useState('')
  const [gender, setGender] = useState('')
  const [linkImg, setLinkImg] = useState('')
  const [status, setStatus] = useState('')
  const [image, setImage] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedIdCategory, setSelectedIdCategory] = useState(1)
  const [sizeDetail, setSizeDetail] = useState([])
  const [colorDetail, setColorDetail] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const fecthProduct = async () => {
      const res = await axios.get(`http://localhost:8801/product/${iduser}`)
      setProduct(res.data)
      setName(res.data.name)
      setPrice(res.data.price)
      setCategory(res.data.idcategorize)
      setAmount(res.data.amount)
      setDiscount(res.data.discount)
      setGender(res.data.gender)
      setDescription(res.data.description)
      setLinkImg(res.data.imgPrimary)
      setStatus(res.data.status)
    }
    fecthProduct()
  }, [iduser])

  useEffect(() => {
    const fecthAllCategories = async () => {
      try {
        const res = await axios.get('http://localhost:8801/categorize')
        setCategories(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fecthAllCategories()
  }, [])

  useEffect(() => {
    const fecthSize = async () => {
      const res = await axios.get(`http://localhost:8801/size/${selectedIdCategory}`)
      setSizeDetail(res.data)
    }
    fecthSize()

    const fecthColor = async () => {
      const res = await axios.get(`http://localhost:8801/color/${selectedIdCategory}`)
      setColorDetail(res.data)
    }
    fecthColor()
  }, [selectedIdCategory])

  const handleName = (event) => {
    setName(event.target.value)
  }
  const handlePrice = (event) => {
    setPrice(event.target.value)
  }
  const handleAmount = (event) => {
    setAmount(event.target.value)
  }
  const handleDiscount = (event) => {
    setDiscount(event.target.value)
  }
  const handleCate = (event) => {
    setCategory(event.target.value)
  }
  const handleGender = (event) => {
    setGender(event.target.value)
  }
  const handleDescription = (event) => {
    setDescription(event.target.value)
  }
  const handleLinkImg = (event) => {
    setLinkImg(event.target.value)
  }
  const handleStatus = (event) => {
    setStatus(event.target.value)
  }

  const handleClickAddProduct = async () => {
    axios
      .post('http://localhost:8801/products/change', {
        id: product.id,
        name: name,
        price: price,
        idcategorize: category,
        amount: amount,
        discount: discount,
        gender: gender,
        description: description,
        imgPrimary: linkImg,
        status: status,
      })
      .then((response) => {
        if (response.data.status === 'error') {
          console.log(response.data.message)
        } else if (response.data.status === 'success') {
          console.log(response.data.message)
        }
      })
  }

  return (
    <div className={cx('addProducts-wrapper')} style={{ margin: '0' }}>
      <div className={cx('row')} style={{ margin: '0', marginBottom: '12px' }}>
        <div className={cx('header-products')}>
          <h1>Chỉnh sửa sản phẩm</h1>
        </div>
      </div>
      <div className={cx('row')} style={{ margin: '0', padding: '0 32px', position: 'relative' }}>
        <section className="l-7">
          <div className={cx('addProducts-name')}>
            <label>Tên sản phẩm</label>
            <input
              type="text"
              name="addProductName"
              placeholder="Nhập tên sản phẩm"
              value={name}
              onChange={handleName}
            />
          </div>
          <div className="row" style={{ margin: '0' }}>
            <div className={cx('l-4', 'addProducts-price')}>
              <label>Giá</label>
              <input
                type="number"
                name="addProductPrice"
                placeholder="Nhập giá sản phẩm"
                value={price}
                onChange={handlePrice}
              />
            </div>
            <div className={cx('l-8', 'addProducts-category')}>
              <label>Loại hàng</label>
              <select
                id="category"
                name="addProductCategory"
                value={category}
                onChange={handleCate}
              >
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="row" style={{ margin: '0' }}>
            <div className={cx('l-4', 'addProducts-amount')}>
              <label>Số lượng</label>
              <input
                type="number"
                name="addProductAmount"
                placeholder="Nhập số lượng"
                value={amount}
                onChange={handleAmount}
              />
            </div>
            <div className={cx('l-4', 'addProducts-discount')}>
              <label>Giảm giá</label>
              <input
                type="number"
                name="addProductDiscount"
                placeholder="Nhập giảm giá"
                value={discount}
                onChange={handleDiscount}
              />
            </div>
            <div className={cx('l-4', 'addProducts-gender')}>
              <label>Dành cho</label>
              <select id="country" name="addProductGender" value={gender} onChange={handleGender}>
                <option value="vn">Chọn giới tính</option>
                <option value="female">Nữ</option>
                <option value="male">Nam</option>
                <option value="female-male">Cả Nam và Nữ</option>
              </select>
            </div>
          </div>
          <div className={cx('addProducts-description')}>
            <label>Mô tả sản phẩm</label>
            <textarea
              name="addProductDescription"
              id="description"
              cols="30"
              rows="15"
              placeholder="Nhập mô tả sản phẩm"
              value={description || ''}
              onChange={handleDescription}
            ></textarea>
          </div>

          <div className="row" style={{ margin: '0' }}>
            <div className={cx('l-8', 'addProducts-linkImg')}>
              <label>Link ảnh sản phẩm</label>
              <input
                type="text"
                name="addProductLinkImg"
                placeholder="Nhập link ảnh sản phẩm"
                value={linkImg}
                onChange={handleLinkImg}
              />
            </div>
            <div className={cx('l-4', 'addProducts-gender')}>
              <label>Trạng thái</label>
              <select id="country" name="addProductStatus" value={status} onChange={handleStatus}>
                <option value="onSale">onSale</option>
                <option value="offSale">offSale</option>
              </select>
            </div>
          </div>
        </section>
        <section className="l-5" style={{ paddingLeft: '16px' }}>
          <div className={cx('addProducts-img')}>
            <label>Hình ảnh</label>
            <div className={cx('image-upload')}>
              <div className={cx('image-1')}>
                <label htmlFor="file-input">
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : `${process.env.PUBLIC_URL}/imgDefault.jpg`
                    }
                    alt="Selected Image"
                  />
                </label>
                <input
                  id="file-input"
                  type="file"
                  onChange={(event) => setImage(event.target.files[0])}
                />
              </div>
              <div className={cx('box-subImage')}>
                <div className={cx('left')}>
                  <div className={cx('image-2')}>
                    <label htmlFor="file-input">
                      <img
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : `${process.env.PUBLIC_URL}/imgDefault.jpg`
                        }
                        alt="Selected Image"
                      />
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      onChange={(event) => setImage(event.target.files[0])}
                    />
                  </div>
                  <div className={cx('image-3')}>
                    <label htmlFor="file-input">
                      <img
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : `${process.env.PUBLIC_URL}/imgDefault.jpg`
                        }
                        alt="Selected Image"
                      />
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      onChange={(event) => setImage(event.target.files[0])}
                    />
                  </div>
                </div>
                <div className={cx('right')}>
                  <div className={cx('image-4')}>
                    <label htmlFor="file-input">
                      <img
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : `${process.env.PUBLIC_URL}/imgDefault.jpg`
                        }
                        alt="Selected Image"
                      />
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      onChange={(event) => setImage(event.target.files[0])}
                    />
                  </div>
                  <div className={cx('image-5')}>
                    <label htmlFor="file-input">
                      <img
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : `${process.env.PUBLIC_URL}/imgDefault.jpg`
                        }
                        alt="Selected Image"
                      />
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      onChange={(event) => setImage(event.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('addProducts-color')} style={{ marginTop: '24px' }}>
            <label>Màu sắc</label>
            <div className={cx('ontions')}>
              {colorDetail.length === 0 && <p>Chọn loại hàng!!</p>}
              {colorDetail &&
                colorDetail.map((color) => {
                  return (
                    <div className="box-option" key={color.id}>
                      {sizeDetail &&
                        sizeDetail.map((size) => {
                          return (
                            <label className={cx('option-item')} key={size.id}>
                              <input type="checkbox" id={`${color.color}${size.size}`} />
                              {color.color} + {size.size}
                              <input type="number" placeholder="Số lượng" min={1} />
                            </label>
                          )
                        })}
                    </div>
                  )
                })}
            </div>
          </div>
        </section>
      </div>
      <div className={cx('row', 'box-button')} style={{ margin: '0' }}>
        <button className={cx('btn-add')} onClick={handleClickAddProduct}>
          Add Product
        </button>
        <button className={cx('btn-save', 'active')} onClick={handleClickAddProduct}>
          Save Product
        </button>
      </div>
      {isVisible && (
        <div className={cx('box-notiOrder')}>
          <div className={cx('notiOrder', 'success')}>
            <BsCheckCircle className={cx('icon')} />
            <span>Đặt hàng thành công</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChangeProduct
