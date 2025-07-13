import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./EditProduct.module.css";
import { getProductById, updatedProduct } from "@/api/productAPI/product";
import { toast } from "react-toastify";
import Layout from "@/components/layout/Layout";

const EditProduct = () => {
  const [product, setProduct] = useState({
    productCode: "",
    productName: "",
    productGroup: "",
    productMedia: [],
    productDVT: "",
    productDescription: "",
    productPrice: 0,
  });
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    if (!productId) return;
    const getProduct = async () => {
      const res = await getProductById(productId);
      setProduct({
        productCode: res.product.productCode,
        productName: res.product.productName,
        productGroup: res.product.productGroup,
        productMedia: res.product.productMedia,
        productDVT: res.product.productDVT,
        productDescription: res.product.productDescription,
        productPrice: res.product.productPrice,
      });
    };
    getProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleDeleteMedia = (index) => {
    const newMedia = product.productMedia.filter((item, idx) => idx !== index);
    setProduct({ ...product, productMedia: newMedia });
  };

  const handleSubmit = async () => {
    try {
      await updatedProduct(product, productId);
      toast.success("Cập nhật thông tin hàng hóa thành công");
      router.push("/product/listProduct");
    } catch (error) {
      toast.error("Cập nhật thất bại");
    }
  };

  const handleCancel = () => {
    router.push("/product/listProduct");
  };

  return (
    <>
      <Layout>
        <div className={styles["container_editPro"]}>
          <div className={styles["h1_editPro"]}>
            <p className={styles["text_1"]}>
              <span onClick={() => router.push("/product/listProduct")}>
                Quản lí danh mục hàng hóa
              </span>
              <span>
                <i
                  className={styles["fa-solid fa-chevron-right"]}
                  style={{ color: "black" }}
                ></i>
              </span>
              <span>Cập nhật thông tin hàng hóa</span>
            </p>
          </div>
          <div className={styles["h2_editPro"]}>
            <div className={styles["sub1_editPro"]}>
              <p className={styles["text_sub1_editPro"]}>
                Cập nhật thông tin hàng hóa
              </p>
            </div>
            <div className={styles["sub2_editPro"]}>
              <div className={styles["idpro"]}>
                <label htmlFor="mh">Mã hàng</label>
                <input
                  className={styles["input_editPro"]}
                  type="text"
                  name="productCode"
                  id="mh"
                  value={product.productCode}
                  readOnly
                />
              </div>
              <div className={styles["namepro"]}>
                <label htmlFor="th">Tên hàng</label>
                <input
                  className={styles["input_editPro"]}
                  type="text"
                  name="productName"
                  id="th"
                  value={product.productName}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["grouppro"]}>
                <label htmlFor="nh">Nhóm hàng</label>
                <input
                  className={styles["input_editPro"]}
                  type="text"
                  name="productGroup"
                  id="nh"
                  value={product.productGroup}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["grouppro"]}>
                <label htmlFor="nh">Giá</label>
                <input
                  className={styles["input_editPro"]}
                  type="number"
                  name="productPrice"
                  id="nh"
                  value={product.productPrice}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["image_prod"]}>
                <label htmlFor="">Hình ảnh</label> <br />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {product.productMedia &&
                    product.productMedia.map((item, index) => (
                      <div
                        style={{
                          width: "200px",
                          height: "200px",
                          position: "relative",
                        }}
                        key={index}
                      >
                        <img
                          src={item}
                          alt="anh"
                          style={{ width: "100%", height: "100%" }}
                        />
                        <i
                          className={styles["fa-sharp fa-solid fa-xmark"]}
                          onClick={() => handleDeleteMedia(index)}
                          style={{ position: "absolute" }}
                        />
                      </div>
                    ))}
                </div>
              </div>

              <div className={styles["unit"]}>
                <label htmlFor="dv">Đơn vị</label>
                <br />
                <br />
                <input
                  className={styles["input_editPro"]}
                  type="text"
                  name="productDVT"
                  id="dv"
                  value={product.productDVT}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["describe_editPro"]}>
                <label htmlFor="mt">Mô tả hàng hóa</label>
                <br />
                <br />
                <textarea
                  className={styles["mota_editpro"]}
                  name="productDescription"
                  value={product.productDescription}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["button_h3"]}>
                <button
                  className={styles["b1_inf"]}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Lưu
                </button>
                <button
                  className={styles["b2_inf"]}
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

export default EditProduct;
