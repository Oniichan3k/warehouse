import React, { useEffect, useState } from "react";

import styles from "./CreatedProduct.module.css";
import { useRouter } from "next/router";
import { createdProduct } from "@/api/productAPI/product";
import { toast } from "react-toastify";
import { readFileAsync } from "@/utils/readFile";
import Layout from "@/components/layout/Layout";

const CreatedProduct = () => {
  const router = useRouter();
  const [product, setProduct] = useState({
    productCode: "",
    productName: "",
    productGroup: "",
    productMedia: [],
    productDVT: "",
    productDescription: "",
    productPrice: 0,
  });

  const [files, setFiles] = useState([]);
  const [rawFiles, setRawFiles] = useState([]);

  useEffect(() => {
    const setP = () => {
      let code = Math.floor(Math.random() * 1000000);
      setProduct({ ...product, productCode: `hang${code}` });
    };
    setP();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = async (e) => {
    const selectedFile = Array.from(e.target.files);
    const newFiles = [];
    const newRawFiles = [];

    try {
      for (const file of selectedFile) {
        const fileData = await readFileAsync(file);
        newFiles.push(fileData);
        newRawFiles.push(file);
      }

      setFiles([...files, ...newFiles]);
      setProduct({ ...product, productMedia: [...rawFiles, ...newRawFiles] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newRawFiles = [...rawFiles];
    newRawFiles.splice(index, 1);
    setProduct({ ...product, productMedia: newRawFiles });
  };

  const handleSubmit = async () => {
    try {
      const newProduct = await createdProduct(product);
      setProduct({
        productCode: "",
        productName: "",
        productGroup: "",
        productMedia: [],
        productDVT: "",
        productDescription: "",
        productPrice: 0,
      });

      setFiles([]);
      setRawFiles([]);

      toast.success("Thêm hàng hóa thành công");
      router.push("/product/listProduct");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    router.push("/product/listProduct");
  };

  return (
    <>
      <Layout>
        <div className={styles["createProduct"]}>
          <div className={styles["createProduct-nav"]}>
            <p
              className={styles["create-link"]}
              onClick={() => router.push("/product/listProduct")}
            >
              Quản lý danh mục hàng hóa
            </p>
            <i
              className={styles["fa-solid fa-chevron-right"]}
              style={{ color: "black", alignItems: "center", fontSize: "15px" }}
            ></i>
            <p className={styles["create-link"]}>Thêm hàng hóa </p>
          </div>

          <div className={styles["createProduct-form"]}>
            <div className={styles["createProductForm-title"]}>
              Thêm hàng hóa
            </div>
            <div className={styles["main-form"]}>
              <div className={styles["productInfor-row"]}>
                <label
                  htmlFor="productID"
                  className={styles["createProduct-lbl"]}
                >
                  Mã hàng
                </label>
                <input
                  type="text"
                  name="productCode"
                  className={styles["createProduc-textbox"]}
                  value={product.productCode}
                  readOnly
                />
              </div>

              <div className={styles["productInfor-row"]}>
                <label
                  htmlFor="productName"
                  className={styles["createProduct-lbl"]}
                >
                  Tên hàng
                </label>
                <input
                  type="text"
                  name="productName"
                  className={styles["createProduc-textbox"]}
                  value={product.productName}
                  onChange={handleChange}
                />
              </div>

              <div className={styles["productInfor-row"]}>
                <label
                  htmlFor="productGroup"
                  className={styles["createProduct-lbl"]}
                >
                  Nhóm hàng
                </label>
                <input
                  type="text"
                  name="productGroup"
                  className={styles["createProduc-textbox"]}
                  value={product.productGroup}
                  onChange={handleChange}
                />
              </div>

              <div className={styles["productInfor-column"]}>
                <label
                  htmlFor="productImg"
                  className={styles["createProduct-lbl"]}
                >
                  Hình ảnh
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {files.length > 0 &&
                    files.map((file, index) => (
                      <div
                        key={index}
                        style={{
                          width: "100px",
                          height: "100px",
                          position: "relative",
                        }}
                      >
                        <img
                          src={file}
                          alt="product"
                          style={{
                            width: "100%",
                            height: "100px",
                            marginTop: "20px",
                          }}
                        />
                        <i
                          className={styles["fa-sharp fa-solid fa-xmark"]}
                          onClick={() => handleDeleteFile(index)}
                          style={{
                            position: "absolute",
                            top: "11px",
                            right: "-7px",
                            zIndex: "10",
                            color: "darkgray",
                          }}
                        ></i>
                      </div>
                    ))}
                  <label>
                    <input
                      type="file"
                      className={styles["input"]}
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{ display: "none" }}
                      multiple
                    />
                    <p className={styles["createdProduct-s4"]}>
                      <i
                        className={styles["fa-solid fa-cloud-arrow-up fa-2xl"]}
                      ></i>
                    </p>
                  </label>
                </div>
              </div>

              <div className={styles["productInfor-column"]}>
                <label
                  htmlFor="productUnit"
                  className={styles["createProduct-lbl"]}
                >
                  Đơn vị tính
                </label>
                <input
                  type="text"
                  name="productDVT"
                  className={styles["createProduc-textbox"]}
                  value={product.productDVT}
                  onChange={handleChange}
                />
              </div>

              <div className={styles["productInfor-column"]}>
                <label
                  htmlFor="productUnit"
                  className={styles["createProduct-lbl"]}
                >
                  Giá
                </label>
                <input
                  type="text"
                  name="productPrice"
                  className={styles["createProduc-textbox"]}
                  value={product.productPrice}
                  onChange={handleChange}
                />
              </div>

              <div className={styles["productInfor-column"]}>
                <label
                  htmlFor="productDescribe"
                  className={styles["createProduct-lbl"]}
                >
                  Mô tả hàng hóa
                </label>
                <textarea
                  name="productDescription"
                  className={styles["createProduc-textbox bigTextbox"]}
                  rows="10"
                  cols="50"
                  placeholder="Viết mô tả ở đây..."
                  value={product.productDescription}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className={styles["productInfor-row-btn"]}>
                <button
                  className={styles["save-btn btn-createdProduct"]}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Lưu
                </button>
                <button
                  className={styles["cancel-btn btn-createdProduct"]}
                  type="submit"
                  onClick={handleCancel}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreatedProduct;
