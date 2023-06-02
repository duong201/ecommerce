import React, { useState } from 'react'

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
  }

  return (
    <div className={cx('addProducts-wrapper')} style={{ margin: '0' }}>
      <div className={cx('row')} style={{ margin: '0', marginBottom: '12px' }}>
        <div className={cx('header-products')}>
          <h1>Thêm sản phẩm</h1>
        </div>
      </div>
      <div className={cx('row')} style={{ margin: '0' }}>
        <section className="l-5">
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
                type="text"
                name="addProductPrice"
                placeholder="Nhập giá sản phẩm"
                value={addProductsData.addProductPrice}
                onChange={handleAddProductData}
              />
            </div>
            <div className={cx('l-8', 'addProducts-category')}>
              <label>Loại hàng</label>
              <select
                id="country"
                name="addProductCategory"
                value={addProductsData.addProductCategory}
                onChange={handleAddProductData}
              >
                <option value="vn">Chọn Loại hàng</option>
                <option value="1">Thời trang nam</option>
                <option value="2">Thời trang nữ</option>
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
        <section className="l-7" style={{ paddingLeft: '32px' }}>
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
              <label>Giá</label>
              <div className={cx('size-container')}>
                <div className={cx('box-option')}>
                  {selectedCheckboxSize.map((checkboxId) => (
                    <p key={checkboxId}>{checkboxId}</p>
                  ))}
                </div>
                <div className={cx('ontions')}>
                  <input type="checkbox" id="checkboxSize1" onChange={handleCheckboxSize} />
                  <label htmlFor="checkboxSize1">Checkbox 1</label>
                  <input type="checkbox" id="checkboxSize2" onChange={handleCheckboxSize} />
                  <label htmlFor="checkboxSize2">Checkbox 2</label>
                  <input type="checkbox" id="checkboxSize3" onChange={handleCheckboxSize} />
                  <label htmlFor="checkboxSize3">Checkbox 3</label>
                  <input type="checkbox" id="checkboxSize4" onChange={handleCheckboxSize} />
                  <label htmlFor="checkboxSize4">Checkbox 4</label>
                  <input type="checkbox" id="checkboxSize5" onChange={handleCheckboxSize} />
                  <label htmlFor="checkboxSize5">Checkbox 5</label>
                  <input type="checkbox" id="checkboxSize6" onChange={handleCheckboxSize} />
                  <label htmlFor="checkboxSize6">Checkbox 6</label>
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
                  <input type="checkbox" id="checkboxColor1" onChange={handleCheckboxColor} />
                  <label htmlFor="checkboxColor1">Checkbox 1</label>
                  <input type="checkbox" id="checkboxColor2" onChange={handleCheckboxColor} />
                  <label htmlFor="checkboxColor2">Checkbox 2</label>
                  <input type="checkbox" id="checkboxColor3" onChange={handleCheckboxColor} />
                  <label htmlFor="checkboxColor3">Checkbox 3</label>
                  <input type="checkbox" id="checkboxColor4" onChange={handleCheckboxColor} />
                  <label htmlFor="checkboxColor4">Checkbox 4</label>
                  <input type="checkbox" id="checkboxColor5" onChange={handleCheckboxColor} />
                  <label htmlFor="checkboxColor5">Checkbox 5</label>
                  <input type="checkbox" id="checkboxColor6" onChange={handleCheckboxColor} />
                  <label htmlFor="checkboxColor6">Checkbox 6</label>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className={cx('row', 'box-button')} style={{ margin: '0' }}>
        <button className={cx('btn-add')}>Add Product</button>
        <button className={cx('btn-save')}>Save Product</button>
      </div>
    </div>
  )
}

export default AddProducts
