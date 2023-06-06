import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'

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
  })
  const [image, setImage] = useState(null)
  const [selectedCheckboxSize, setSelectedCheckboxSize] = useState([])
  const [selectedCheckboxColor, setSelectedCheckboxColor] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedIdCategory, setSelectedIdCategory] = useState(1)
  const [sizeDetail, setSizeDetail] = useState([])
  const [colorDetail, setColorDetail] = useState([])

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

  function handleCheckboxSize(e) {
    const checkboxId = e.target.id
    if (e.target.checked) {
      setSelectedCheckboxSize((prevSelectedCheckboxSize) =>
        prevSelectedCheckboxSize.concat(checkboxId),
      )
    } else {
      setSelectedCheckboxSize((prevSelectedCheckboxSize) =>
        prevSelectedCheckboxSize.filter((id) => id !== checkboxId),
      )
    }
  }

  function handleCheckboxColor(e) {
    const checkboxId = e.target.id
    if (e.target.checked) {
      setSelectedCheckboxColor((prevSelectedCheckboxColor) =>
        prevSelectedCheckboxColor.concat(checkboxId),
      )
    } else {
      setSelectedCheckboxColor((prevSelectedCheckboxColor) =>
        prevSelectedCheckboxColor.filter((id) => id !== checkboxId),
      )
    }
  }

  const handleAddProductData = (event) => {
    const { name, value } = event.target
    setAddProductsData({ ...addProductsData, [name]: value })

    name === 'addProductCategory' && setSelectedIdCategory(event.target.value)
  }

  useEffect(() => {
    const fecthAllSize = async () => {
      try {
        const res = await axios.get(`http://localhost:8801/sizedetail/${selectedIdCategory}`)
        setSizeDetail(Object.values(res.data[0]).filter((val) => val !== null && val !== undefined))
      } catch (err) {
        console.log(err)
      }
    }
    fecthAllSize()
  }, [selectedIdCategory])

  useEffect(() => {
    const fecthAllcolor = async () => {
      try {
        const res = await axios.get(`http://localhost:8801/colordetail/${selectedIdCategory}`)
        setColorDetail(
          Object.values(res.data[0]).filter((val) => val !== null && val !== undefined),
        )
      } catch (err) {
        console.log(err)
      }
    }
    fecthAllcolor()
  }, [selectedIdCategory])

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
              onChange={handleAddProductData}
            ></textarea>
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
          <div className="row" style={{ margin: '0', marginTop: '24px' }}>
            <div className={cx('l-6', 'addProducts-size')}>
              <label>Size</label>
              <div className={cx('size-container')}>
                <div className={cx('box-option')}>
                  {selectedCheckboxSize.map((checkboxId) => (
                    <p key={checkboxId}>{checkboxId}</p>
                  ))}
                </div>
                <div className={cx('ontions')}>
                  {sizeDetail.length === 0 && <p>Chọn loại hàng!!</p>}
                  {sizeDetail &&
                    sizeDetail.map((size, index) => {
                      return (
                        <Fragment key={index}>
                          <input type="checkbox" id={size} onChange={handleCheckboxSize} />
                          <label htmlFor={size}>{size}</label>
                        </Fragment>
                      )
                    })}
                </div>
              </div>
            </div>
            <div className={cx('l-6', 'addProducts-color')}>
              <label>Màu sắc</label>
              <div className={cx('color-container')}>
                <div className={cx('box-option')}>
                  {selectedCheckboxColor.map((checkboxId) => (
                    <p key={checkboxId}>{checkboxId}</p>
                  ))}
                </div>
                <div className={cx('ontions')}>
                  {colorDetail.length === 0 && <p>Chọn loại hàng!!</p>}
                  {colorDetail &&
                    colorDetail.map((size, index) => {
                      return (
                        <Fragment key={index}>
                          <input type="checkbox" id={size} onChange={handleCheckboxSize} />
                          <label htmlFor={size}>{size}</label>
                        </Fragment>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className={cx('row', 'box-button')} style={{ margin: '0' }}>
        <button className={cx('btn-add', 'active')}>Add Product</button>
        <button className={cx('btn-save')}>Save Product</button>
      </div>
    </div>
  )
}

export default AddProducts
