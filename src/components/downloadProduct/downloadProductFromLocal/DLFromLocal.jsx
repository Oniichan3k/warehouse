import React, { useEffect, useState } from 'react'

import styles from "./DLFromLocal.module.css";
import { getProducts, searchProduct } from '@/api/productAPI/product';
import { formatCurrency } from '@/utils/function/slipFuntion';
import { Pagination } from 'antd';
const DLFromLocal = ({ onCancel, selectedProducts, setSelectedProducts, isRefresh, setIsRefresh }) => {
  const [listProduct, setListPoroduct] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');

  useEffect(() => {
    const getListProduct = async () => {
      const res = await getProducts(page, limit);
      setTotal(res.totalResult);
      setListPoroduct(res.products);

      const all = await getProducts(1, res.totalResult);
      setAllProducts(all.products);
    };

    getListProduct();
  }, [page]);

  const handleChangeCheckBox = (product) => {
    setSelectedProducts((prev) => {
      if (prev.some((item) => item._id === product._id)) {
        return prev.filter((item) => item._id !== product._id);
      }
      else {
        return [...prev, product];
      }
    });
  };

  const handleClickAll = async () => {
    if (selectedProducts.length === total) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(allProducts);
    }
  };

  const handleClickAdd = () => {
    setIsRefresh(!isRefresh);
    onCancel();
  };

  const handleClickCancel = () => {
    setSelectedProducts([]);
    setIsRefresh(!isRefresh);
    onCancel();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productName') {
      setProductName(value);
    } else {
      setProductCode(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setProductCode('');
      setProductName('');
    }
  };

  const handleSearch = async () => {
    try {
      const res = await searchProduct(productCode, productName, page, limit);
      console.log('res', res);
      setListPoroduct(res.products);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className={styles["Localkien"]}>
      <div className={styles["ddhh"]}>DANH SÁCH HÀNG HÓA</div>
      <div className={styles["search-barkien"]}>
        <div className={styles["search-fieldkien1"]}>Tên hàng hóa:
          <input type="text" placeholder="Tên hàng hóa" name='productName' value={productName} onChange={handleChange} onKeyDown={handleKeyDown} />

        </div>
        <div className={styles["search-fieldkien2"]}>Mã hàng:
          <input type="text" placeholder="Mã hàng" name='productCode' value={productCode} onChange={handleChange} onKeyDown={handleKeyDown} />

        </div>
      </div>
      <div className={styles["selected-count-kien"]}>
        <div className={styles["selected-countkien"]}>{selectedProducts.length} mặt hàng được chọn</div>
        <input type="checkbox" id="select-all" onChange={handleClickAll} />
      </div>
      <table className={styles["bang"]}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên hàng hóa</th>
            <th>Mã hàng</th>
            <th>Đơn vị tính</th>
            <th>Số lượng trong kho</th>
            <th>Đơn giá</th>
            <th>Chọn</th>
          </tr>
        </thead>
        <tbody>
          {
            listProduct.length > 0 && listProduct.map((product, index) => (
              <tr key={product._id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.productCode}</td>
                <td>{product.productDVT}</td>
                <td>{product.productQuantityRemaining}</td>
                <td>{formatCurrency(product.productPrice)}</td>
                <td>
                  <input
                    type="checkbox"
                    className={styles["item-checkbox"]}
                    checked={selectedProducts.some((item) => item._id === product._id)}
                    onChange={() => handleChangeCheckBox(product)}
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className={styles["flex-end"]}>
        <Pagination
          pageSize={limit}
          total={total}
          current={page}
          onChange={(page) => setPage(page)}
        />
      </div>
      <div className={styles["buttonskien"]}>
        <button className={styles["btn"] + " " + styles["cancel"]} onClick={handleClickCancel}>Hủy</button>
        <button className={styles["btn"] + " " + styles["add"]} onClick={handleClickAdd}>Thêm</button>
      </div>
    </div>
  )
}

export default DLFromLocal;