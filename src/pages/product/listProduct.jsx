import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import { getProducts, searchProduct } from "@/api/productAPI/product";
import styles from "./ListProduct.module.css";
import ConfirmDeleteProduct from "@/components/confirmDeleteProduct/ConfirmDeleteProduct";
import { formatCurrency } from "@/utils/function/slipFuntion";
import Layout from "@/components/layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const ListProduct = () => {
  const [listProducts, setListProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [isDeleteProduct, setIsDeleteProduct] = useState(false);
  const [type, setType] = useState("deletedProduct");
  const [deletedId, setDeletedId] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getListProducts = async () => {
      const res = await getProducts(page, limit);
      setTotal(res.totalResult);
      setListProducts(res.products);
    };

    getListProducts();
  }, [page, isRefresh]);

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "productCode") {
      setProductCode(value);
    } else {
      setProductName(value);
    }
  };

  const handleSearch = async () => {
    try {
      setPage(1);
      const res = await searchProduct(productCode, productName, page, limit);
      setListProducts(res.products);
      setTotal(res.totalResult);
      setProductCode("");
      setProductName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickAdd = () => {
    router.push("/product/createdProduct");
  };

  const handleClickPen = (productId) => {
    router.push(`/product/inforProduct/${productId}`);
  };

  const handleClickBin = (productId) => {
    setDeletedId(productId);
    setIsDeleteProduct(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteProduct(false);
  };
  return (
    <>
      <Layout>
        <div className={styles["ListProductkien"]}>
          <div>
            <div>
              <div className={styles["daulist"]}>
                <div className={styles["left-sec"]}>
                  <div className={styles["itemleft"]}>
                    <label className={styles["mhhlistproduct"]} htmlFor="mhh">
                      Mã hàng hóa
                    </label>
                    <input
                      className={styles["listproductinput"]}
                      type="text"
                      id="mhh"
                      name="productCode"
                      value={productCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles["right-sec"]}>
                  <div className={styles["itemleft"]}>
                    <label className={styles["mhhlistproduct"]} htmlFor="thh">
                      Tên hàng hóa
                    </label>
                    <input
                      className={styles["listproductinput"]}
                      type="text"
                      id="thh"
                      name="productName"
                      value={productName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles["tklistproduct"]}
                  onClick={handleSearch}
                >
                  Tìm kiếm
                </button>
              </div>
              <button
                className={styles["addButtonthem"]}
                onClick={handleClickAdd}
              >
                Thêm hàng hoá
              </button>
              <div className={styles["listTable"]}>
                <table className={styles["Listkien"]}>
                  <tbody>
                    <tr className={styles["listtable1"]}>
                      <th className={styles["listtable2"]}>STT</th>
                      <th className={styles["listtable2"]}>Tên hàng</th>
                      <th className={styles["listtable2"]}>Mã hàng</th>
                      <th className={styles["listtable2"]}>Nhóm hàng</th>
                      <th className={styles["listtable2"]}>Đơn vị tính</th>
                      <th className={styles["listtable2"]}>Đơn giá</th>
                      <th className={styles["center"]}>Thao tác</th>
                    </tr>
                    {listProducts.length > 0 &&
                      listProducts.map((product, index) => {
                        return (
                          <tr key={product._id}>
                            <td className={styles["listtable3"]}>
                              {(page - 1) * limit + index + 1}
                            </td>
                            <td className={styles["listtable3"]}>
                              {product.productName}
                            </td>
                            <td className={styles["listtable3"]}>
                              {product.productCode}
                            </td>
                            <td className={styles["listtable3"]}>
                              {product.productGroup}
                            </td>
                            <td className={styles["listtable3"]}>
                              {product.productDVT}
                            </td>
                            <td className={styles["listtable3"]}>
                              {formatCurrency(product.productPrice)}
                            </td>
                            <td className={styles["purple"]}>
                              <button
                                className={styles["pen-product"]}
                                onClick={() => handleClickPen(product._id)}
                                title="Sửa"
                                type="button"
                                style={{ background: "none", border: "none", cursor: "pointer", marginRight: 8 }}
                              >
                                <FontAwesomeIcon icon={faPen} style={{ color: "#007bff", fontSize: 20 }} />
                              </button>
                              <button
                                className={styles["bin-product"]}
                                onClick={() => handleClickBin(product._id)}
                                title="Xóa"
                                type="button"
                                style={{ background: "none", border: "none", cursor: "pointer" }}
                              >
                                <FontAwesomeIcon icon={faTrash} style={{ color: "#dc3545", fontSize: 20 }} />
                              </button>
                            </td>

                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <Pagination
                  total={total}
                  pageSize={limit}
                  current={page}
                  onChange={handleChangePage}
                  style={{
                    position: "absolute",
                    bottom: "7px",
                    right: "100px",
                    position: "fixed",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {isDeleteProduct && (
          <div className={styles["overlay"]} onClick={handleCancelDelete}>
            <motion.div
              className={styles["itemDelete"]}
              onClick={(e) => e.stopPropagation()}
              animate={{ opacity: 1, scal: 1 }}
              initial={{ opacity: 0, scal: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <ConfirmDeleteProduct
                type={type}
                onCancel={handleCancelDelete}
                id={deletedId}
                isRefresh={isRefresh}
                setIsRefresh={setIsRefresh}
              />
            </motion.div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default ListProduct;
