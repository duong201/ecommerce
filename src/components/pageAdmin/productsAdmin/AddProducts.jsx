import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { BsCheckCircle } from 'react-icons/bs'

import classNames from 'classnames/bind'
import style from './ProductsAdmin.module.scss'
const cx = classNames.bind(style)

const AddProducts = () => {
  const [addProductsData, setAddProductsData] = useState({
    addProductName: '',
    addProductPrice: '',
    addProductCategory: '',
    addProductAmount: '',
    addProductDiscount: '',
    addProductGender: '',
    addProductDescription: '',
    addProductLinkImg: '',
  })
  const [image, setImage] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedIdCategory, setSelectedIdCategory] = useState(1)
  const [sizeDetail, setSizeDetail] = useState([])
  const [colorDetail, setColorDetail] = useState([])
  const [isVisible, setIsVisible] = useState(false)

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

  const handleAddProductData = (event) => {
    const { name, value } = event.target
    setAddProductsData({ ...addProductsData, [name]: value })

    name === 'addProductCategory' && setSelectedIdCategory(event.target.value)
  }

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

  const handleClickAddProduct = async () => {
    await axios
      .post('http://localhost:8801/products/add', {
        name: addProductsData.addProductName,
        gender: addProductsData.addProductGender,
        idcategorize: addProductsData.addProductCategory,
        imgPrimary: addProductsData.addProductLinkImg,
        sold: 0,
        price: addProductsData.addProductPrice,
        discount: addProductsData.addProductDiscount,
        amount: addProductsData.addProductAmount,
        status: 'onsale',
      })
      .then((res) => {
        if (res.data.status === 'success') {
          setIsVisible(true)
          setTimeout(() => {
            setIsVisible(false)
            setAddProductsData({
              addProductName: '',
              addProductPrice: '',
              addProductCategory: '',
              addProductAmount: '',
              addProductDiscount: '',
              addProductGender: '',
              addProductDescription: '',
              addProductLinkImg: '',
            })
          }, 1000)
        }
      })
  }

  return (
    <div className={cx('addProducts-wrapper')} style={{ margin: '0' }}>
      <div className={cx('row')} style={{ margin: '0', marginBottom: '12px' }}>
        <div className={cx('header-products')}>
          <h1>Thêm sản phẩm</h1>
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
              value={addProductsData.addProductName}
              onChange={handleAddProductData}
            />
          </div>
          <div className="row" style={{ margin: '0' }}>
            <div className={cx('l-4', 'addProducts-price')}>
              <label>Giá</label>
              <input
                type="number"
                name="addProductPrice"
                placeholder="Nhập giá sản phẩm"
                value={addProductsData.addProductPrice}
                onChange={handleAddProductData}
              />
            </div>
            <div className={cx('l-8', 'addProducts-category')}>
              <label>Loại hàng</label>
              <select
                id="category"
                name="addProductCategory"
                value={addProductsData.addProductCategory}
                onChange={handleAddProductData}
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
                value={addProductsData.addProductAmount}
                onChange={handleAddProductData}
              />
            </div>
            <div className={cx('l-4', 'addProducts-discount')}>
              <label>Giảm giá</label>
              <input
                type="number"
                name="addProductDiscount"
                placeholder="Nhập giảm giá"
                value={addProductsData.addProductDiscount}
                onChange={handleAddProductData}
              />
            </div>
            <div className={cx('l-4', 'addProducts-gender')}>
              <label>Dành cho</label>
              <select
                id="country"
                name="addProductGender"
                value={addProductsData.addProductGender}
                onChange={handleAddProductData}
              >
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
              value={addProductsData.addProductDescription}
              onChange={handleAddProductData}
            ></textarea>
          </div>
          <div className={cx('addProducts-linkImg')}>
            <label>Link ảnh sản phẩm</label>
            <input
              type="text"
              name="addProductLinkImg"
              placeholder="Nhập link ảnh sản phẩm"
              value={addProductsData.addProductLinkImg}
              onChange={handleAddProductData}
            />
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
        <button className={cx('btn-add', 'active')} onClick={handleClickAddProduct}>
          Add Product
        </button>
        <button className={cx('btn-save')}>Save Product</button>
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

export default AddProducts
